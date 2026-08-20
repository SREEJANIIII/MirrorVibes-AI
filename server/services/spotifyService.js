const axios = require("axios");

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

const getAccessToken = async (code) => {
    const credentials = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const response = await axios.post(
        SPOTIFY_TOKEN_URL,
        new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        }).toString(),
        {
            headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
};

const refreshAccessToken = async (refreshToken) => {
    const credentials = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const response = await axios.post(
        SPOTIFY_TOKEN_URL,
        new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }).toString(),
        {
            headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
};

const searchTrack = async (accessToken, title, artist) => {
    const query = `track:${title} artist:${artist}`;

    const response = await axios.get(
        `${SPOTIFY_API_URL}/search`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query,
                type: "track",
                limit: 5,
            },
        }
    );

    const tracks = response.data.tracks.items;

    if (!tracks.length) {
        return null;
    }

    return tracks[0];
};
const createSpotifyPlaylist = async (
    accessToken,
    name,
    description
) => {
    const response = await axios.post(
        `${SPOTIFY_API_URL}/me/playlists`,
        {
            name,
            description,
            public: false,
            collaborative: false,
        },
        {
            headers: {
                Authorization:
                    `Bearer ${accessToken}`,
                "Content-Type":
                    "application/json",
            },
        }
    );

    return response.data;
};


const addTracksToSpotifyPlaylist = async (
    accessToken,
    playlistId,
    trackUris
) => {
    const response = await axios.post(
        `${SPOTIFY_API_URL}/playlists/${playlistId}/items`,
        {
            uris: trackUris,
        },
        {
            headers: {
                Authorization:
                    `Bearer ${accessToken}`,
                "Content-Type":
                    "application/json",
            },
        }
    );

    return response.data;
};

module.exports = {
    getAccessToken,
    refreshAccessToken,
    searchTrack,
    createSpotifyPlaylist,
    addTracksToSpotifyPlaylist,
};
