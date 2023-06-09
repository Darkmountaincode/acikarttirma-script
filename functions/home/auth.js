exports.oturumacilmis = function(req, res, next) {
  if (req.isAuthenticated()) {
    // Oturum açmış kullanıcı, isteği işlemek için bir sonraki işleve geçebilir
    return next();
  } else {
    // Oturum açmamış kullanıcı, oturum açma sayfasına yönlendirilir
    res.redirect('/login');
  }
};


exports.oturumacilmamis = function(req, res, next) {
  if (req.isAuthenticated()) {
    // Oturum açmış kullanıcı, ana sayfaya yönlendirilir
    res.redirect('/');
  } else {
    // Oturum açmamış kullanıcı, isteği işlemek için bir sonraki işleve geçebilir
    return next();
  }
};