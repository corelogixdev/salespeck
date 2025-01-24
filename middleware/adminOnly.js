function branchmanagerOnly(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    } 
    if (req.session.user.role === 'branchmanager') {
      next();
    } else {
      if ((req.path.startsWith('/users') && (req.query.role=="customer") || req.body.role =="customer") || req.path === '/sales') {
        next();
      }
      else {
        res.redirect('/dashboard');
      }
    }
  }

module.exports = branchmanagerOnly;