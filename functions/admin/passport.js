const localStrategy = require("passport-local").Strategy;
const uyeler = require('../../database/uyeler');

module.exports = async function(passport){
    const options = {
        usernameField: 'email',
        passwordField: 'sifre'
    };
 
   passport.use(new localStrategy(options, async (uyemail, password, done) => {
    try{
        const _bulunanuser = await uyeler.findOne({uyemail});
        
        if(!_bulunanuser){

            return done(null, false, {errors:{msg:"Kullanıcı Bulunamadı"}} );
        }
        const sifrekontrol = await bcrypt.compare(password,_bulunanuser.uyesifre);
        if(!sifrekontrol){
            return done(null, false, {errors:{msg:"Şifre Hatalı"}} );
        }else{
            return done(null, _bulunanuser);
        }
    }catch(err)
    {
      return done(err);
    }
   }))
}

passport.serializeUser(function(uyeler,done){
    done(null,uyeler.id);
})


passport.deserializeUser(function(id, done){
    uyeler.findById(id)
      .then((uyeler) => {
        const yeniUser = {
            id:uyeler.id,
            uyemail:uyeler.uyemail,
            uyeadi:uyeler.uyeadi,
            uyesoyad:uyeler.uyesoyad,
            admin:uyeler.admin,
            kullanicitel:uyeler.tel
        }
        done(null, yeniUser);
      })
      .catch((err) => {
        done(err, null);
      });
}); 