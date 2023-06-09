exports.oturumacilmis = function(req, res, next) {
    if (req.isAuthenticated()) {
    if(req.user.admin === true){
      return next();
    }else{
      res.redirect('/');
    }
  
    } else {
      // Kullanıcı oturum açmamış
      req.flash('error', 'Lütfen Oturum Açınız');
      res.redirect('/nadminpanel/login'); // Oturum açma sayfasına yönlendirin
    }
  };

  exports.oturumacilmamis = function(req,res,next) {
    if(!req.isAuthenticated()){
      return next();
    }else{
      res.redirect('/nadminpanel')
    }
  }