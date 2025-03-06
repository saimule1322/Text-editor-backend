import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  image: String,
  notes:[{
    title:String,
    content:String
  }]
});

const User = mongoose.model('User', UserSchema);

export default User;