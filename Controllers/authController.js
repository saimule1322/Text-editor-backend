import passport from 'passport';
import User from '../Models/Users.js';

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file'],
});

export const googleAuthCallback = passport.authenticate('google', {
  failureRedirect: '/',
});

export const login = async (req, res) => {

console.log("request",req.body.email)

    let user = await User.findOne({ email: req.body.email });
    let googleId = user.googleId;


      if (user) {
        return res.status(200).json({ googleId });
      }
      else{
        return res.status(500).json({ message:'not found' });

      }
  };

  export const getfiles = async (req, res) => {

    console.log("request",req.body.email)
    
        let user = await User.findOne({ googleId: req.body.googleId });
       
    
          if (user) {
            return res.status(200).json({ user });
          }
          else{
            return res.status(500).json({ message:'not found' });
    
          }
      };

      export const deletefiles = async (req, res) => {
        const { googleId, noteId } = req.params;
    
        if (!googleId || !noteId) {
            return res.status(400).json({ error: "Missing googleId or noteId" });
        }
    
        try {
            // Find the user and check if they exist
            const user = await User.findOne({ googleId });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
    
            // Check if the note exists in the user's notes
            const noteExists = user.notes.some(note => note._id.toString() === noteId);
            if (!noteExists) {
                return res.status(404).json({ error: "Note not found" });
            }
    
            // Perform the deletion
            const updatedUser = await User.findOneAndUpdate(
                { googleId },
                { $pull: { notes: { _id: noteId } } }, // Remove note by _id
                { new: true }
            );
    
            return res.status(200).json({ message: "Note deleted successfully", user: updatedUser });
    
        } catch (error) {
            console.error("Delete Error:", error); // Log error for debugging
            return res.status(500).json({ error: "Failed to delete the note", details: error.message });
        }
    };
    

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error destroying session' });
      }
      res.clearCookie('connect.sid');
      res.clearCookie('accessToken');
      res.clearCookie('googleId');
      res.clearCookie('refreshToken');


      res.send('<h1>Logged out successfully</h1>');
    });
  });
};


export const userDetails = async (req, res) => {

  console.log("request",req.body)
  
      let user = await User.findOne({ googleId: req.body.googleId });
     
        if (user) {
          return res.status(200).json({ user });
        }
        else{
          return res.status(500).json({ message:'not found' });
  
        }
    };


    export const usedrive = async (req, res) => {

      console.log("request",req.body)
      
        };
    
