##Features

### Mood Journal

Users can freely write about their thoughts and feelings instead of selecting a predefined mood.

### AI Emotion Analysis

Gemini analyzes the journal and identifies:

- Emotion
- Sub-emotion
- Energy
- Listener intent

It also generates a reflection and a comforting reminder.

### Personalized Playlists

The detected emotional context is used to generate a playlist with:

- Playlist title
- Description
- Playlist journey
- Songs
- Artist names
- Reason for each song selection

### Artist Reflection

MirrorVibes contains a curated collection of artist quotes.

Each quote is associated with relevant moods, allowing the application to display reflections that match the user's emotional state.

The system also handles more natural emotions such as `Longing`, `Happiness`, and `Overwhelmed` by mapping them to related emotional categories.

### Spotify Integration

Users can authenticate with Spotify and save their generated playlist directly to their Spotify account.

The application also reports how many songs were successfully matched.


## Development Journey

MirrorVibes was built step by step rather than as one completed project.

### 1. Frontend

I started by building the React interface and experimenting with how the journal, emotional results, and playlist should be presented.

### 2. Backend

I introduced Node.js and Express to handle API requests and keep application logic away from the frontend.

### 3. Gemini Integration

Gemini was added to analyze journal entries and return structured emotional information.

### 4. Playlist Generation

The emotional analysis was connected to the playlist generation system. I then added playlist descriptions, song-selection reasons, and an emotional playlist flow.

### 5. Artist Reflections

I initially used a small random collection of artist quotes. I later changed this to a mood-based system so that reflections would actually relate to the user's journal.

During testing, I found that Gemini could return emotions such as `Longing` instead of simply `Sad`. This led to adding related mood groups instead of relying on exact string matches.

### 6. Spotify

Spotify authentication and playlist creation were added so users could take the generated playlist outside the application.

### 7. Deployment

The frontend and backend were deployed separately using Vercel and Render.

This also introduced production-specific problems such as CORS configuration, environment variables, Linux file-path case sensitivity, missing backend dependencies, and Spotify redirect URLs.


## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Axios
- React Router
- CSS

### Backend

- Node.js
- Express
- Axios
- JWT
- bcrypt
- Express Session
- CORS

### AI

- Google Gemini API

### Database

- MongoDB
- Mongoose

### Music

- Spotify Web API

### Deployment

- Vercel
- Render
- MongoDB Atlas


## Project Structure

```text
MirrorVibes-AI/
│
├── client/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```


## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/SREEJANIIII/MirrorVibes-AI.git
cd MirrorVibes-AI
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```


## Environment Variables

MirrorVibes requires separate environment variables for the frontend and backend.

### Client

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

### Server

Create:

```text
server/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:5000/api/spotify/callback
```

Never commit `.env` files or API credentials to GitHub.


## Getting Your Own Gemini API Key

To run the project with your own Gemini account:

1. Create an API key through Google AI Studio.
2. Copy the key.
3. Add it to the backend `.env`:

```env
GEMINI_API_KEY=your_key_here
```

The Gemini key should remain on the backend.


## Getting Your Own Spotify Credentials

To use Spotify integration with your own account:

1. Create an application in the Spotify Developer Dashboard.
2. Copy the Client ID.
3. Copy the Client Secret.
4. Add both to `server/.env`.

```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

For local development, register:

```text
http://127.0.0.1:5000/api/spotify/callback
```

as the Spotify redirect URI.

For your own deployed backend, replace it with your Render backend URL and register that exact URI in Spotify.


## MongoDB

Create a MongoDB Atlas cluster and database user, then add the connection string to:

```env
MONGO_URI=your_mongodb_connection_string
```

The MongoDB credentials must never be committed to the repository.


## Running the Project

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Vite will provide the local frontend URL, usually:

```text
http://localhost:5173
```


## Deployment

The current deployment uses:

```text
React + Vite
      ↓
    Vercel
      ↓
Node + Express
      ↓
    Render
      ↓
MongoDB Atlas
```

The frontend uses:

```env
VITE_API_URL=https://your-render-backend-url
```

The backend API credentials are stored as environment variables in Render.


## Current Status

MirrorVibes is currently deployed and functional.

The current version includes:

- AI-based mood analysis
- Personalized reflections
- Personalized playlist generation
- Mood-based artist reflections
- Spotify authentication
- Spotify playlist creation
- Production deployment


## Planned

The next major feature I am working on is persistent user data.

This will allow users to:

- Save journals
- View previous journals
- Save generated playlists
- View playlist history
- Manage their saved content

These features will use MongoDB and Mongoose and will be connected to the authenticated user's account.


## What I Am Learning Through This Project

Building MirrorVibes has been my way of learning full-stack development through an actual project.

Some of the concepts I have worked with include:

- React
- REST APIs
- Express
- Authentication
- MongoDB
- Mongoose
- Third-party APIs
- Gemini API
- Spotify OAuth
- Environment variables
- CORS
- Deployment
- Debugging production issues

The project is still evolving as I learn and add new features.


## Author

**Sreejani Bhattacharya**

MirrorVibes is a personal project built to explore the combination of full-stack development, AI, APIs, databases, and music.
