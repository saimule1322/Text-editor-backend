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

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback, (req, res) => {
  res.cookie('accessToken', req.user.accessToken, { maxAge: 3600000, httpOnly: true });
  res.cookie('refreshToken', req.user.refreshToken, { maxAge: 3600000, httpOnly: true });
  res.cookie('googleId', req.user.id, { maxAge: 3600000,secure: false  });

  res.redirect('https://text-editor-frontend-dusky.vercel.app/Editor');
}); 
router.get('/Editor', getProfile);
router.post('/upload', upload.single('file'), uploadFile);
router.get('/logout', logout);
router.post('/login', login);
router.post('/userDetails', userDetails);
router.post('/drive', upload.single('file'), uploadFile);
router.post('/saveNotes', saveNotes);
router.post('/files', getfiles);
router.delete('/files/:googleId/:noteId', deletefiles);










export default router;
