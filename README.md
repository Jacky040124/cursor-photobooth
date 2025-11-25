# Photobooth

A retro-style instant camera photobooth web app with a modern, clean UI inspired by Cursor IDE aesthetics.

## Features

- 📸 **Instant Camera Experience**: Capture photos using your webcam with a retro polaroid camera interface
- 🎨 **Light, Modern UI**: Clean, minimalist design with a light color palette
- 📤 **Gallery Sharing**: Upload photos to a public gallery powered by Supabase
- 📧 **Email Sharing**: Send photos via email with a pre-filled template
- 🎯 **Interactive Polaroids**: Drag, flip, and customize your polaroid photos
- 📱 **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Supabase (Storage + Database)
- **Libraries**: 
  - html2canvas (for collage downloads)
  - Supabase JS Client

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jackyzhong0124/cursor-photobooth.git
   cd photobooth
   ```

2. **Configure Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Create a storage bucket named `photos` with public read access
   - Create a database table named `gallery` with the following schema:
     ```sql
     CREATE TABLE gallery (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       url TEXT NOT NULL,
       caption TEXT,
       secret TEXT,
       created_at TIMESTAMPTZ DEFAULT NOW()
     );
     ```
   - Get your Supabase URL and Anon Key from Project Settings > API

3. **Update Configuration**
   - Open `app.js`
   - Find the Supabase configuration section at the top of the file
   - Replace `YOUR_SUPABASE_URL_HERE` and `YOUR_SUPABASE_ANON_KEY_HERE` with your actual credentials

4. **Deploy**
   - You can host this on any static hosting service (Vercel, Netlify, GitHub Pages, etc.)
   - Or simply open `index.html` in a browser (note: Supabase features require HTTPS in production)

## Usage

1. Allow camera access when prompted
2. Click the shutter button to capture a photo
3. Drag polaroids around the desk
4. Click "Flip" to write a secret message on the back
5. Click "Add to Gallery" to share publicly
6. Click "Email" to send via email
7. Click "View Gallery" to see all shared photos
8. Click "Download" to save your collage

## Project Structure

```
photobooth/
├── index.html         # Main HTML file
├── styles.css         # All CSS styles
├── app.js             # All JavaScript logic
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

## License

MIT License - feel free to use this project for your own purposes!

## Author

**Jacky Zhong**
- X: [@JackyZhong0124](https://x.com/JackyZhong0124)
- GitHub: [@jackyzhong0124](https://github.com/jackyzhong0124)

## Acknowledgments

- Inspired by retro instant cameras and the Cursor IDE aesthetic
- Uses [Permanent Marker](https://fonts.google.com/specimen/Permanent+Marker) font for authentic polaroid handwriting feel
- Special thanks to [@ann_nnng](https://x.com/ann_nnng) for inspiration and support

