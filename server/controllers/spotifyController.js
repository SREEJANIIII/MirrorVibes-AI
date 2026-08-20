const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
    getAccessToken,
    refreshAccessToken,
    createSpotifyPlaylist,
    addTracksToSpotifyPlaylist,
    searchTrack,
} = require("../services/spotifyService");

const spotifyLogin = async (req, res) => {
    try {
        const token = req.query.token;

        if (!token) {
            return res.status(401).send("Unauthorized");
        }

        // Verify MirrorVibes JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const scopes = [
            "streaming",
            "user-read-email",
            "user-read-private",
            "user-modify-playback-state",
            "user-read-playback-state",
            "playlist-modify-private",
            "playlist-modify-public",
        ];

        const params = new URLSearchParams({
            response_type: "code",
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scopes.join(" "),
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            state: decoded.id,
        });

        const authorizationUrl =
            `https://accounts.spotify.com/authorize?${params.toString()}`;

        return res.redirect(authorizationUrl);

    } catch (err) {
        console.error("Spotify Login Error:", err);

        return res.status(401).send(
            "Invalid or expired login token."
        );
    }
};

const spotifyCallback = async (req, res) => {
    try {
        const { code, state, error } = req.query;

        if (error) {
            console.error("Spotify OAuth Error:", error);

            return res.status(400).send(
                `Spotify authorization failed: ${error}`
            );
        }

        if (!code || !state) {
            return res.status(400).send(
                "Spotify authorization code or user information missing."
            );
        }

        // Exchange Spotify authorization code for tokens
        const tokens = await getAccessToken(code);

        console.log("✅ Spotify authentication successful!");

        // Find the MirrorVibes user
        const user = await User.findById(state);

        if (!user) {
            return res.status(404).send(
                "MirrorVibes user not found."
            );
        }

        // Save Spotify tokens
        user.spotify = {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiryDate: Date.now() + (tokens.expires_in * 1000),
        };

        await user.save();

        console.log(
            "✅ Spotify connected for:",
            user.username
        );

        return res.send(`
            <h1>🎧 Spotify Connected!</h1>
            <p>Spotify is now connected to your MirrorVibes account.</p>
            <p>You can close this tab and return to MirrorVibes.</p>
        `);

    } catch (err) {
        console.error(
            "Spotify Callback Error:",
            err.response?.data || err.message
        );

        return res.status(500).send(
            "Spotify connection failed."
        );
    }
};

        
const getSpotifyToken = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        if (!user.spotify?.accessToken) {
            return res.status(401).json({
                message: "Please connect Spotify first.",
            });
        }

        let accessToken = user.spotify.accessToken;

        // Refresh the token if it is expired or about to expire
        if (
            !user.spotify.expiryDate ||
            Date.now() >= user.spotify.expiryDate - 60000
        ) {
            const tokens = await refreshAccessToken(
                user.spotify.refreshToken
            );

            accessToken = tokens.access_token;

            user.spotify.accessToken = accessToken;

            if (tokens.refresh_token) {
                user.spotify.refreshToken =
                    tokens.refresh_token;
            }

            user.spotify.expiryDate =
                Date.now() + tokens.expires_in * 1000;

            await user.save();
        }

        return res.status(200).json({
            accessToken,
        });

    } catch (err) {
        console.error(
            "Spotify Token Error:",
            err.response?.data || err.message
        );

        return res.status(500).json({
            message: "Could not get Spotify token.",
        });
    }
};
const saveSpotifyPlaylist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        if (!user.spotify?.accessToken) {
            return res.status(401).json({
                message: "Please connect Spotify first.",
            });
        }

        const {
            playlistTitle,
            playlistDescription,
            songs,
        } = req.body;

        if (!playlistTitle) {
            return res.status(400).json({
                message: "Playlist title is required.",
            });
        }

        if (!Array.isArray(songs) || songs.length === 0) {
            return res.status(400).json({
                message: "Playlist must contain songs.",
            });
        }

        let accessToken = user.spotify.accessToken;

        // Refresh Spotify token if needed
        if (
            !user.spotify.expiryDate ||
            Date.now() >= user.spotify.expiryDate - 60000
        ) {
            const tokens = await refreshAccessToken(
                user.spotify.refreshToken
            );

            accessToken = tokens.access_token;

            user.spotify.accessToken = accessToken;

            if (tokens.refresh_token) {
                user.spotify.refreshToken =
                    tokens.refresh_token;
            }

            user.spotify.expiryDate =
                Date.now() + tokens.expires_in * 1000;

            await user.save();
        }

        console.log(
            "🎵 Saving playlist:",
            playlistTitle
        );

        const spotifyUris = [];
        const matchedSongs = [];
        const unmatchedSongs = [];

        // Find each Gemini song on Spotify
        for (const song of songs) {
            try {
                const track = await searchTrack(
                    accessToken,
                    song.title,
                    song.artist
                );

                if (track) {
                    spotifyUris.push(track.uri);

                    matchedSongs.push({
                        title: song.title,
                        artist: song.artist,
                        spotifyTitle: track.name,
                        spotifyArtist:
                            track.artists[0]?.name,
                        uri: track.uri,
                    });

                    console.log(
                        `✅ Matched: ${song.title} → ${track.name}`
                    );
                } else {
                    unmatchedSongs.push({
                        title: song.title,
                        artist: song.artist,
                    });

                    console.log(
                        `❌ Not found: ${song.title} - ${song.artist}`
                    );
                }

            } catch (songError) {
                console.error(
                    `Failed to find ${song.title}:`,
                    songError.message
                );

                unmatchedSongs.push({
                    title: song.title,
                    artist: song.artist,
                });
            }
        }

        if (!spotifyUris.length) {
            return res.status(404).json({
                message:
                    "None of the Gemini songs could be found on Spotify.",
            });
        }

        // Create Spotify playlist
        const spotifyPlaylist =
            await createSpotifyPlaylist(
                accessToken,
                playlistTitle,
                playlistDescription ||
                    "Created by MirrorVibes 🎧"
            );

        // Add tracks in Gemini's original order
        await addTracksToSpotifyPlaylist(
            accessToken,
            spotifyPlaylist.id,
            spotifyUris
        );

        console.log(
            "✅ Spotify playlist created:",
            spotifyPlaylist.id
        );

        return res.status(201).json({
            message:
                "MirrorVibes playlist saved to Spotify!",
            playlistId: spotifyPlaylist.id,
            playlistUrl:
                spotifyPlaylist.external_urls?.spotify,
            matchedSongs,
            unmatchedSongs,
        });

    } catch (err) {
        console.error(
            "Spotify Save Playlist Error:",
            err.response?.data || err.message
        );

        return res.status(500).json({
            message:
                err.response?.data?.error?.message ||
                "Could not save playlist to Spotify.",
        });
    }
};

module.exports = {
    spotifyLogin,
    spotifyCallback,
    getSpotifyToken,
    saveSpotifyPlaylist,
};