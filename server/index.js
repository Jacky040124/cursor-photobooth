import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Allow larger payloads for base64 images

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  const { email, photoData, caption } = req.body;

  // Validate input
  if (!email || !photoData) {
    return res.status(400).json({ 
      error: 'Missing required fields', 
      message: 'Email and photo data are required' 
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Invalid email', 
      message: 'Please provide a valid email address' 
    });
  }

  try {
    // Extract base64 data (remove data:image/...;base64, prefix if present)
    let base64Data = photoData;
    if (photoData.includes('base64,')) {
      base64Data = photoData.split('base64,')[1];
    }

    // Create buffer from base64
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Send email with Resend
    const { data, error } = await resend.emails.send({
      from: 'UBC Startup Event <onboarding@resend.dev>',
      to: email,
      subject: 'Your UBC Startup Event Photo 📸',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #002145; text-align: center;">🎉 UBC Startup Event</h2>
          <p style="text-align: center; color: #666;">Here's your photo from the event!</p>
          <p style="text-align: center; color: #666; font-size: 14px;">
            Thanks for joining us! 🚀
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="text-align: center; color: #999; font-size: 12px;">
            Your photo is attached below.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'photobooth-photo.jpg',
          content: imageBuffer,
          contentType: 'image/jpeg',
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ 
        error: 'Email send failed', 
        message: error.message 
      });
    }

    console.log('Email sent successfully:', data.id);
    res.json({ 
      success: true, 
      message: 'Email sent successfully!',
      id: data.id 
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Server error', 
      message: 'Failed to send email. Please try again.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`📧 Email server running on http://localhost:${PORT}`);
  console.log(`   POST /api/send-email - Send photo to email`);
  console.log(`   GET  /api/health     - Health check`);
});
