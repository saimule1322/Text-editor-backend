
// import express from 'express';
// import dotenv from 'dotenv';
// import session from 'express-session';
// import cookieParser from 'cookie-parser';
// import passport from './Configuration/passport.js';
// import connectDB from './Configuration/Database.js';
// import routes from './Routes/Index.js';
// import cors from 'cors'

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cookieParser());
// app.use(express.json());
// app.use(cors())
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 1000 * 60 * 60 },
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use('/', routes);

// // Database and Server Setup
// const port = process.env.PORT || 5000;
// connectDB().then(() => {
//   app.listen(port, () => console.log(`Server running on port ${port}`));
// });



import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from './Configuration/passport.js';
import connectDB from './Configuration/Database.js';
import routes from './Routes/Index.js';
import cors from 'cors'

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: 'https://text-editor-frontend-dusky.vercel.app', // React app's URL
  credentials: true,              // Allow sending cookies with requests
};

app.use(cors(corsOptions))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/api', routes);

app.get('/auth/google', googleAuth);
app.get('/auth/google/callback', googleAuthCallback, (req, res) => {
  res.cookie('accessToken', req.user.accessToken, { maxAge: 3600000, httpOnly: true });
  res.cookie('refreshToken', req.user.refreshToken, { maxAge: 3600000, httpOnly: true });
  res.cookie('googleId', req.user.id, { maxAge: 3600000,secure: false  });

  res.redirect('https://text-editor-frontend-dusky.vercel.app/Editor');
}); 

app.get('/', (req,res)=>{
  res.send("server is running")
});


// Database and Server Setup
const port = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
