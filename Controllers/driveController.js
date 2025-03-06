import { google } from 'googleapis';
import streamifier from 'streamifier';
import User from '../Models/Users.js';

export const uploadFile = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const fileMetadata = {
      name: req.file.originalname,
      mimeType: req.file.mimetype,
    };

    const media = {
      mimeType: req.file.mimetype,
      body: streamifier.createReadStream(req.file.buffer),
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    res.status(200).send(`File uploaded successfully with ID: ${file.data.id}`);
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Error uploading file');
  }
};

export const saveNotes = async(req,res) =>{

      const { email, title, content } = req.body; // Get email, title, and content from the request body
  
      let user = await User.findOne({ googleId: req.body.googleId });
    
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Add the new note to the user's notes array
      user.notes.push({ title, content });
  
      // Save the updated user document
      await user.save();
  
      // Return success message
      return res.status(200).json({
        message: 'Note added successfully!',
        notes: user.notes, // Optionally return the updated list of notes
      });
  
    
  };
