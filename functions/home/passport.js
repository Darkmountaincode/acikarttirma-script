const localStrategy = require("passport-local").Strategy;
const kullanici = require('../../database/uyeler');

module.exports = async function(passport){
    const options = {
        usernameField: 'email',
        passwordField: 'sifre'
    };
 
   passport.use(new localStrategy(options, async (uyemail, password, done) => {
    try{
        const _bulunanuser = await kullanici.findOne({uyemail});
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

passport.serializeUser(function(kullanici,done){
    done(null,kullanici.id);
})


passport.deserializeUser(function(id, done){
    kullanici.findById(id)
      .then((kullanici) => {
        const yeniUser = {
            id:kullanici.id,
            uyemail:kullanici.uyemail,
            uyead:kullanici.uyeadi,
            uyesoyad:kullanici.uyesoyad,
            uyebakiye:kullanici.uyebakiye,
            uyedurum:kullanici.uyedurum,
            uyetel:kullanici.uyetel,
            admin:kullanici.admin,
            uyeadres:kullanici.uyeadres,
            uyeil:kullanici.uyeil,
            uyeilce:kullanici.uyeilce,
            postakodu:kullanici.postakodu,
            bandurumu:kullanici.bandurumu,
            uyekayittarihi:kullanici.uyekayittarihi          
        }
        done(null, yeniUser);
      })
      .catch((err) => {
        done(err, null);
      });
});