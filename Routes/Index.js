import express from 'express';
import {
  googleAuth,
  googleAuthCallback,
  logout,login,userDetails ,deletefiles ,getfiles
} from '../Controllers/authController.js';
import { getProfile } from '../Controllers/SignUp.js';
import { uploadFile , saveNotes } from '../Controllers/driveController.js';
import upload from '../Utils/upload.js';

const router = express.Router();

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback, (req, res) => {
  res.cookie('accessToken', req.user.accessToken, { maxAge: 3600000, httpOnly: true });
  res.cookie('refreshToken', req.user.refreshToken, { maxAge: 3600000, httpOnly: true });
  res.cookie('googleId', req.user.id, { maxAge: 3600000,secure: false  });

  res.redirect('http://localhost:5173/Editor');
}); 
router.get('/Editor', getProfile);
router.post('api/upload', upload.single('file'), uploadFile);
router.get('/api/logout', logout);
router.post('/api/login', login);
router.post('/api/userDetails', userDetails);
router.post('/api/drive', upload.single('file'), uploadFile);
router.post('/api/saveNotes', saveNotes);
router.post('/api/files', getfiles);
router.delete('/api/files/:googleId/:noteId', deletefiles);










export default router;