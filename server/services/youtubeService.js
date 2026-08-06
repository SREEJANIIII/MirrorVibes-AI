const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

const createPlaylist = async (tokens, title, description) => {

    oauth2Client.setCredentials(tokens);

    const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client,
    });

    const response = await youtube.playlists.insert({
        part: ["snippet", "status"],
        requestBody: {
            snippet: {
                title,
                description,
            },
            status: {
                privacyStatus: "private",
            },
        },
    });

    return {
        playlistId: response.data.id,
        youtube,
    };
};

const searchVideo = async (youtube, title, artist) => {

    const response = await youtube.search.list({
        part: ["snippet"],
        q: `${title} ${artist}`,
        type: ["video"],
        maxResults: 1,
    });

    if (!response.data.items.length) {
        return null;
    }

    return response.data.items[0].id.videoId;
};

const addVideoToPlaylist = async (
    youtube,
    playlistId,
    videoId
) => {

    try {

        await youtube.playlistItems.insert({
            part: ["snippet"],
            requestBody: {
                snippet: {
                    playlistId,
                    resourceId: {
                        kind: "youtube#video",
                        videoId,
                    },
                },
            },
        });

    } catch (err) {

        console.log("❌ YouTube Error:");
        console.log(JSON.stringify(err.response?.data, null, 2));

        throw err;

    }

};

module.exports = {
    createPlaylist,
    searchVideo,
    addVideoToPlaylist,
};