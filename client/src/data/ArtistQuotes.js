const ArtistQuotes = [
  {
    artist: "Taylor Swift",
    quote: "Never be ashamed of trying.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["motivated", "anxious", "overwhelmed", "hopeful"],
    source: "NYU Commencement Speech, 2022"
  },
  {
    artist: "Taylor Swift",
    quote: "Decide what is yours to hold, and let the rest go.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["overwhelmed", "anxious", "sad", "hopeful"],
    source: "NYU Commencement Speech, 2022"
  },
  {
    artist: "Bob Marley",
    quote: "One good thing about music, when it hits you, you feel no pain.",
    genre: "Reggae",
    country: "🇯🇲 Jamaica",
    moods: ["sad", "heartbroken", "lonely", "comfort"],
    source: "Interview with The Wailers, 1975"
  },
  {
    artist: "Bono",
    quote: "Music can change the world because it can change people.",
    genre: "Rock",
    country: "🇮🇪 Ireland",
    moods: ["hopeful", "motivated", "lonely"],
    source: "1983 US Music Festival interview"
  },
  {
    artist: "Billie Eilish",
    quote: "Just letting myself be, and trying not to be anxious and terrified the entire time.",
    genre: "Alternative Pop",
    country: "🇺🇸 USA",
    moods: ["anxious", "overwhelmed", "hopeful"],
    source: "ABC News interview, 2024"
  },
  {
    artist: "Alicia Keys",
    quote: "You always have to work. You have to want it.",
    genre: "R&B / Soul",
    country: "🇺🇸 USA",
    moods: ["motivated", "overwhelmed", "confident"],
    source: "The FADER interview, 2021"
  },
  {
    artist: "Alicia Keys",
    quote: "I just want to be who I actually am.",
    genre: "R&B / Soul",
    country: "🇺🇸 USA",
    moods: ["anxious", "confident", "lonely"],
    source: "The FADER interview, 2021"
  },
  {
    artist: "Lady Gaga",
    quote: "I like to not fit in.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["confident", "motivated", "anxious"],
    source: "Los Angeles Times interview, 2024"
  },
  {
    artist: "Lady Gaga",
    quote: "There are no rules when it comes to making music.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["confident", "creative", "motivated"],
    source: "Vogue 73 Questions interview"
  },
  {
    artist: "Dolly Parton",
    quote: "I can't retire if I wanted to. And I don't want to.",
    genre: "Country",
    country: "🇺🇸 USA",
    moods: ["motivated", "happy", "hopeful"],
    source: "The Guardian interview, 2024"
  },
  {
    artist: "Dolly Parton",
    quote: "I've dreamed myself into a corner. I've got to keep all those dreams alive.",
    genre: "Country",
    country: "🇺🇸 USA",
    moods: ["motivated", "hopeful", "overwhelmed"],
    source: "TED WorkLife interview"
  },
  {
    artist: "Dolly Parton",
    quote: "I'm still dreaming, still dreaming big, still got new dreams to dream.",
    genre: "Country",
    country: "🇺🇸 USA",
    moods: ["hopeful", "motivated", "happy"],
    source: "GRAMMY interview, 2014"
  },
  {
    artist: "Aretha Franklin",
    quote: "Music changes, and I'm gonna change right along with it.",
    genre: "Soul",
    country: "🇺🇸 USA",
    moods: ["hopeful", "confident", "motivated"],
    source: "Record Mirror interview, 1968"
  },
  {
    artist: "Aretha Franklin",
    quote: "As people, we deserve respect from one another.",
    genre: "Soul",
    country: "🇺🇸 USA",
    moods: ["angry", "sad", "confident", "hopeful"],
    source: "Vogue interview"
  },
  {
    artist: "Whitney Houston",
    quote: "I am a person who has life, who wants to live. And I always have.",
    genre: "R&B / Pop",
    country: "🇺🇸 USA",
    moods: ["sad", "hopeful", "overwhelmed"],
    source: "Diane Sawyer interview, 2002"
  },
  {
    artist: "Shreya Ghoshal",
    quote: "I go with the flow. If I like something, I do it.",
    genre: "Indian Playback",
    country: "🇮🇳 India",
    moods: ["happy", "confident", "hopeful"],
    source: "Scroll interview"
  },
  {
    artist: "Shreya Ghoshal",
    quote: "Respect music and the love for art.",
    genre: "Indian Playback",
    country: "🇮🇳 India",
    moods: ["motivated", "hopeful", "creative"],
    source: "Shreya Ghoshal interview"
  },
  {
    artist: "A. R. Rahman",
    quote: "Every time I sit for a song, I feel I am finished.",
    genre: "Film Music",
    country: "🇮🇳 India",
    moods: ["anxious", "overwhelmed", "creative"],
    source: "Bangalore Times interview"
  },
  {
    artist: "A. R. Rahman",
    quote: "It is a field you have to plant in your heart for it to really blossom.",
    genre: "Film Music",
    country: "🇮🇳 India",
    moods: ["motivated", "hopeful", "creative"],
    source: "Reddit AMA interview"
  },
  {
    artist: "Arijit Singh",
    quote: "I am generally not someone who talks much. I am an introvert.",
    genre: "Indian Playback",
    country: "🇮🇳 India",
    moods: ["lonely", "anxious", "reflective"],
    source: "India Today interview, 2023"
  },
  {
    artist: "Ilaiyaraaja",
    quote: "Composing is an emotional thing.",
    genre: "Indian Film Music",
    country: "🇮🇳 India",
    moods: ["sad", "creative", "reflective"],
    source: "The Hindu interview"
  },
  {
    artist: "Miley Cyrus",
    quote: "To me, the Hollywood sign represents making dreams a reality.",
    genre: "Pop / Rock",
    country: "🇺🇸 USA",
    moods: ["hopeful", "motivated", "happy"],
    source: "British Vogue interview, 2024"
  },
  {
    artist: "Miley Cyrus",
    quote: "A rose protects itself; it's vulnerable but powerful.",
    genre: "Pop / Rock",
    country: "🇺🇸 USA",
    moods: ["anxious", "confident", "heartbroken"],
    source: "British Vogue interview, 2024"
  },
  {
    artist: "Shakira",
    quote: "You have to laugh at life before life laughs at you.",
    genre: "Latin Pop",
    country: "🇨🇴 Colombia",
    moods: ["sad", "overwhelmed", "happy", "hopeful"],
    source: "Al cielo con ella interview"
  },
  {
    artist: "Selena Gomez",
    quote: "I'm trying to exude confidence.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["anxious", "confident", "motivated"],
    source: "Ryan Seacrest interview"
  },
  {
    artist: "SZA",
    quote: "To be expected to do anything at a high level while life is life-ing is fucking crazy.",
    genre: "R&B",
    country: "🇺🇸 USA",
    moods: ["overwhelmed", "anxious", "burnout"],
    source: "Billboard interview"
  },
  {
    artist: "Sabrina Carpenter",
    quote: "You can make it to the other end of things and just accept things as they are and let it be.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["heartbroken", "sad", "hopeful"],
    source: "Glamour interview, 2023"
  },
  {
    artist: "Sabrina Carpenter",
    quote: "My focus is on music.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["motivated", "creative", "confident"],
    source: "Seventeen interview"
  },
  {
    artist: "Katy Perry",
    quote: "If you run around pleasing everyone, you're done.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["confident", "anxious", "motivated"],
    source: "The Guardian interview, 2017"
  },
  {
    artist: "Christina Aguilera",
    quote: "I'm an artist.",
    genre: "Pop / R&B",
    country: "🇺🇸 USA",
    moods: ["confident", "motivated", "creative"],
    source: "Los Angeles Times interview, 2018"
  },
    {
    artist: "Taylor Swift",
    quote: "Hard things will happen to us. We will recover.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["sad", "heartbroken", "overwhelmed", "hopeful"],
    source: "NYU Commencement Speech, 2022"
  },
  {
    artist: "Taylor Swift",
    quote: "Losing things doesn't just mean losing.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["heartbroken", "sad", "hopeful"],
    source: "NYU Commencement Speech, 2022"
  },
  {
    artist: "Taylor Swift",
    quote: "You can't carry all things.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["overwhelmed", "anxious", "burnout"],
    source: "NYU Commencement Speech, 2022"
  },

  {
    artist: "Beyoncé",
    quote: "I now know that, yes, I am powerful.",
    genre: "R&B / Pop",
    country: "🇺🇸 USA",
    moods: ["confident", "motivated", "hopeful"],
    source: "GQ interview, 2013"
  },
  {
    artist: "Beyoncé",
    quote: "Power is making things happen without asking for permission.",
    genre: "R&B / Pop",
    country: "🇺🇸 USA",
    moods: ["confident", "motivated"],
    source: "ELLE interview, 2016"
  },
  {
    artist: "Beyoncé",
    quote: "I am a musician first.",
    genre: "R&B / Pop",
    country: "🇺🇸 USA",
    moods: ["creative", "motivated", "confident"],
    source: "GQ interview, 2024"
  },

  {
    artist: "Dua Lipa",
    quote: "I get a real kick out of proving people wrong.",
    genre: "Pop",
    country: "🇬🇧 UK / 🇽🇰 Kosovo-Albanian heritage",
    moods: ["motivated", "angry", "confident"],
    source: "Apple Music interview, 2024"
  },
  {
    artist: "Dua Lipa",
    quote: "I’m going to take that criticism and find something constructive in it.",
    genre: "Pop",
    country: "🇬🇧 UK / 🇽🇰 Kosovo-Albanian heritage",
    moods: ["anxious", "motivated", "hopeful"],
    source: "Warner Records press interview"
  },
  {
    artist: "Dua Lipa",
    quote: "Loving yourself for who you are.",
    genre: "Pop",
    country: "🇬🇧 UK / 🇽🇰 Kosovo-Albanian heritage",
    moods: ["anxious", "heartbroken", "confident"],
    source: "Warner Records press interview"
  },

  {
    artist: "David Bowie",
    quote: "I promise it won't be boring.",
    genre: "Rock",
    country: "🇬🇧 UK",
    moods: ["hopeful", "creative", "confident"],
    source: "50th Birthday concert, 1997"
  },
  {
    artist: "David Bowie",
    quote: "The point is to grow into the person you grow into.",
    genre: "Rock",
    country: "🇬🇧 UK",
    moods: ["reflective", "hopeful", "anxious"],
    source: "Playboy interview, 1975"
  },
  {
    artist: "David Bowie",
    quote: "That's what keeps me from getting bored.",
    genre: "Rock",
    country: "🇬🇧 UK",
    moods: ["creative", "motivated", "hopeful"],
    source: "Playboy interview, 1975"
  },

  {
    artist: "Freddie Mercury",
    quote: "You have to have confidence in this business.",
    genre: "Rock",
    country: "🇬🇧 UK",
    moods: ["confident", "motivated", "anxious"],
    source: "Interview with Queen, 1974"
  },
  {
    artist: "Freddie Mercury",
    quote: "Music is so interesting.",
    genre: "Rock",
    country: "🇬🇧 UK",
    moods: ["creative", "happy", "reflective"],
    source: "Interview with Queen, 1974"
  },
  {
    artist: "Freddie Mercury",
    quote: "You have to judge people on what they are.",
    genre: "Rock",
    country: "🇬🇧 UK",
    moods: ["angry", "confident", "hopeful"],
    source: "Guardian interview archive"
  },

  {
    artist: "Lady Gaga",
    quote: "I like to not fit in.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["confident", "creative", "anxious"],
    source: "Los Angeles Times interview, 2024"
  },
  {
    artist: "Lady Gaga",
    quote: "I love odd things.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["creative", "confident", "happy"],
    source: "Los Angeles Times interview, 2024"
  },
  {
    artist: "Lady Gaga",
    quote: "This was more about beauty and sincerity.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["creative", "hopeful", "reflective"],
    source: "Los Angeles Times interview, 2024"
  },

  {
    artist: "Rihanna",
    quote: "You just need to know who you are.",
    genre: "Pop / R&B",
    country: "🇧🇧 Barbados",
    moods: ["confident", "anxious", "overwhelmed"],
    source: "Vogue interview, 2016"
  },
  {
    artist: "Rihanna",
    quote: "You know when you love it and that's the only thing that matters.",
    genre: "Pop / R&B",
    country: "🇧🇧 Barbados",
    moods: ["confident", "creative", "hopeful"],
    source: "Vogue interview, 2016"
  },
  {
    artist: "Rihanna",
    quote: "I just focus on my little project.",
    genre: "Pop / R&B",
    country: "🇧🇧 Barbados",
    moods: ["motivated", "overwhelmed", "creative"],
    source: "Vogue interview, 2016"
  },

  {
    artist: "Miley Cyrus",
    quote: "To me, the Hollywood sign represents making dreams a reality.",
    genre: "Pop / Rock",
    country: "🇺🇸 USA",
    moods: ["hopeful", "motivated", "happy"],
    source: "British Vogue interview, 2024"
  },
  {
    artist: "Miley Cyrus",
    quote: "A rose protects itself; it's vulnerable but powerful.",
    genre: "Pop / Rock",
    country: "🇺🇸 USA",
    moods: ["heartbroken", "anxious", "confident"],
    source: "British Vogue interview, 2024"
  },
  {
    artist: "Miley Cyrus",
    quote: "Loving others and being loved is my ultimate inspiration.",
    genre: "Pop / Rock",
    country: "🇺🇸 USA",
    moods: ["happy", "hopeful", "heartbroken"],
    source: "British Vogue interview, 2024"
  },

  {
    artist: "Adele",
    quote: "I make music because songs resonate with people.",
    genre: "Pop / Soul",
    country: "🇬🇧 UK",
    moods: ["creative", "hopeful", "reflective"],
    source: "Vanity Fair interview, 2016"
  },
  {
    artist: "Adele",
    quote: "My life is more important to me than anything.",
    genre: "Pop / Soul",
    country: "🇬🇧 UK",
    moods: ["overwhelmed", "reflective", "hopeful"],
    source: "Vanity Fair interview, 2016"
  },
  {
    artist: "Adele",
    quote: "I love to make music.",
    genre: "Pop / Soul",
    country: "🇬🇧 UK",
    moods: ["happy", "creative", "motivated"],
    source: "Vanity Fair interview, 2016"
  },

  {
    artist: "Sabrina Carpenter",
    quote: "All the lows feel lower, and the highs feel higher.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["sad", "happy", "heartbroken", "reflective"],
    source: "Glamour interview, 2023"
  },
  {
    artist: "Sabrina Carpenter",
    quote: "You can make it to the other end of things.",
    genre: "Pop",
    country: "🇺🇸 USA",
    moods: ["heartbroken", "sad", "hopeful"],
    source: "Glamour interview, 2023"
  },

  {
    artist: "Shakira",
    quote: "You have to laugh at life before life laughs at you.",
    genre: "Latin Pop",
    country: "🇨🇴 Colombia",
    moods: ["sad", "overwhelmed", "happy", "hopeful"],
    source: "Al cielo con ella interview"
  }
];

export default ArtistQuotes;
