
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
  origin: 'https://text-editor-frontend-dusky.vercel.app/', // React app's URL
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

app.use('/', routes);

app.get('/', (req,res)=>{
  res.send("server is running")
});


// Database and Server Setup
const port = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
