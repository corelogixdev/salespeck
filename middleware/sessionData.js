// middleware/sessionData.js
module.exports = (req, res, next) => {
  //if user
  //console.log('session data');
  //console.log(req.session);
  if(!req.session){
    req.session.isAuthenticated = false;
  }
  else{
    res.locals.isAuthenticated = !!req.session.user_id; //
    
    if(req.session.user_id){
      res.locals.user_id = req.session.user_id;
      res.locals.user = req.session.user; // Pass user data to views
    }
  }
  res.locals.message = req.session.message;
  delete req.session.message; // Clear the message after setting it
  
  next();
};