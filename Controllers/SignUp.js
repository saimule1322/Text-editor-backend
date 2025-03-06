export const getProfile = (req, res) => {
  if (req.isAuthenticated()) {
    // res.redirect('/');
    console.log(req.body)

  }
};