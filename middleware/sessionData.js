// middleware/message.js
module.exports = (req, res, next) => {
  //if user
  console.log('session data');
  if(req.session){
    console.log(req.session);
    res.locals.isAuthenticated = !!req.session.user_id; //
    res.locals.message = req.session.message;
    delete req.session.message; // Clear the message after setting it

    if(req.session.userId){
      res.locals.user_id = req.session.user_id;
      res.locals.user = req.session.user; // Pass user data to views
    }
  }
  
  next();
};