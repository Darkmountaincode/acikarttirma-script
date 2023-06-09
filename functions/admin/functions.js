const site = require('../../database/site');
require('../home/passport')(passport)
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path'); // path modülünü ekleyin
const kategori = require('../../database/kategoriler');
const uyeler = require('../../database/uyeler');
const altkategori = require('../../database/altkategoriler');
const urun = require('../../database/urunler');
const slide = require('../../database/slider');
const ozellik  = require('../../database/anasayfa');
const havale = require('../../database/havale');
exports.uyelist = async (req,res,next) => {
  try{

  const uyebilgi = await uyeler.findOneAndUpdate(
    {_id: req.body.uyeId},
    { 
    uyeadi:req.body.uyeadi,
    uyesoyad:req.body.uyesoyad,
    uyemail:req.body.uyemail,
    uyebakiye:req.body.uyebakiye,
    bandurumu:req.body.bandurumu,
    admin:req.body.admin,
    uyetel:req.body.uyetel,
    uyeadres:req.body.uyeadres,
    uyeil:req.body.uyeil,
    uyeilce:req.body.uyeilce,
    uyecinsiyet:req.body.uyecinsiyet
  }, {new:true});
 res.status(200).json({success: ['Güncelleme Başarıyla Tamamlanmıştır']});

  }catch(err){
    console.log(err);
  }
}

exports.slideguncelle = async (req,res,next) => {
      try{
          const slider = {
            slideadi:req.body.slideurunadi,
            slidealtadi:req.body.slidealtadi,
            slideurunbaslangicfiyati:req.body.slidebaslangicfiyati,
            slideindirimlifiyati:req.body.slideindirimlifiyati,
            slideindirimorani:req.body.slideindirimorani,
            slideurunlinki:req.body.slidelinki

          };

        if(req.file){
          slider.slidegorsel = req.file.filename;
          
        };

       await slide.findOneAndUpdate({_id:req.body.slideId}, slider);
       res.status(200).json({success: "Slider Güncellendi"});

      }catch(err){
        console.log(err);
      }
}


exports.sitebilgileri = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('validation_error', errors.array());
    req.flash('baslik', req.body.baslik);
    req.flash('aciklama', req.body.aciklama);
    req.flash('anahtar', req.body.anahtar);
    res.redirect('sitebilgileri');
    console.log("hata");

    return;
  }

  try {
    const sitebilgileri = {
      site: {
        baslik: req.body.baslik,
        aciklama: req.body.aciklama,
        anahtar: req.body.anahtar,
      },
    };
  
    // Logo kontrolü ve güncelleme
    if (req.files && req.files.logo && req.files.logo.length > 0) {
      const logoDosyaYolu = path.join(__dirname, '../../www/admin/uploads', req.files.logo[0].filename);
      // Dosyayı yüklemek için gereken işlemleri buraya ekleyin
      sitebilgileri.site.logo = req.files.logo[0].filename;
    } else {
      // Logo eklenmediyse veritabanındaki değeri koru
      const existingSite = await site.findOne({});
      sitebilgileri.site.logo = existingSite.site.logo;
    }
  
    // Favicon kontrolü ve güncelleme tskk // nereeye ekliyordukkkkkkkkkk
    if (req.files && req.files.favicon && req.files.favicon.length > 0) {
      const faviconDosyaYolu = path.join(__dirname, '../../www/admin/uploads', req.files.favicon[0].filename);
      // Dosyayı yüklemek için gereken işlemleri buraya ekleyin
      sitebilgileri.site.favicon = req.files.favicon[0].filename;
    } else {
      // Favicon eklenmediyse veritabanındaki değeri koru
      const existingSite = await site.findOne({});
      sitebilgileri.site.favicon = existingSite.site.favicon; 
    }
  
  
    await site.findOneAndUpdate({}, sitebilgileri);

    res.redirect('sitebilgileri');
 
  } catch (err) {
    console.log(err);
  }
  
};



exports.odemebilgileri = async (req,res,next) => {
  try{
 
     paytrbilgileri = {
      sanalpos:{
        payTr:{
       name:req.body.odemetipi,
       commission:req.body.komisyon,
       minPrice:req.body.minodeme,
       maxPrice:req.body.maxodeme,
       merchantId:req.body.marketId,
       merchantKey:req.body.marketkey,
       merchantSalt:req.body.marketsalt,
       status:true
     }
      }
    };
 await findOneAndUpdate({}, paytrbilgileri); 
 
  }catch(err){
   console.log(err);
  }
 
 }
 
exports.sitedurum = async (req, res, next) => {
  try {
    const sitebilgi = {
      sitedurum: {
        status: req.body.bakimdurum
      },
      uyedurum: {
        status: req.body.uyelikdurum
      },
      ihaledurumu: {
        status: req.body.ihaledurum
      }
    };
    
    await site.findOneAndUpdate({sitebilgi}, req.body.slideId);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: "OK" }));
    res.end();
  } catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: "Error" }));
    res.end();
  }
};

exports.nadminlogin = (req,res,next) =>{
   errors = validationResult(req);
   if(!errors.isEmpty()){
    const errorMessage = errors.array().map(error => error.msg);
    res.status(400).json({ errors: errorMessage });
    return;
   }
 
    passport.authenticate('local', {failureFlash:true, session:true, cookie:{maxAge:18000000}}, function(err,uyeler,info){
      if(err){
        res.status(400).json({errors:["Bir Hata Oluştu"]});
      }

      if(!uyeler){
        return res.status(400).json({errors: ["Email Veya Şifreniz Hatalı"]});
      }
      if(!uyeler.admin){
        return res.status(403).json({errors: ['Admin Değilsiniz']})
      }
      req.login(uyeler,function(err){
        if(err){return next(err);}
        console.log(req.body.sifre);
        res.status(200).json({success:"Giriş Başarılı Tebrikler Yönlendiriliyorsunuz..."});
        
      });
    })(req,res,next);
};

exports.altkategoriekle = async (req,res,next) => {
    try{ 
      _altkategorisorgula = await altkategori.findOne({altkategoriadi:req.body.altkategoriadi}); 
        if(_altkategorisorgula){
          return res.status(400).json({errors: ['Alt Kategori Daha Önce Kayıt Edilmiş..']});
          
        }
        if (!req.body.altkategoriadi) {
          return res.status(400).json({ errors: ['Kategori Adını Boş Bırakamazsınız'] });
        }
      const turkceKarakterMap = {
          'ğ': 'g',
          'ü': 'u',
          'ş': 's',
          'ı': 'i',
          'ö': 'o',
          'ç': 'c'
        };          
        let kategoriAdi = req.body.altkategoriadi;
        kategoriAdi = kategoriAdi.replace(/ /g, '-');
        for (let turkceKarakter in turkceKarakterMap) {
          const degisim = turkceKarakterMap[turkceKarakter];
          const regex = new RegExp(turkceKarakter, 'g');
          kategoriAdi = kategoriAdi.replace(regex, degisim);
        } 

        const altkategorikayit = new altkategori({
          altkategoriadi:req.body.altkategoriadi.trim(),
          altkategoriurl: kategoriAdi.toLowerCase(),
          kategoriId:req.body.kategoriId,
          altkategoridurum:true

        })

       await altkategorikayit.save();
       res.status(200).json({success : ["Alt Kategoriniz Oluşturuldu"]});

    }catch(err){
      console.log(err);
    }
    
}



exports.urunguncelle = async (req,res,next) => {
  try{

      const urunguncelle = {
        urunadi:req.body.urunadi,
        urunaciklamasi:req.body.urunaciklamasi,
        kategoriId:req.body.kategori,
        altkategoriId:req.body.alt_kategori,
        urunetiketleri:req.body.urunetiketi,
        baslangicfiyati:req.body.baslangicfiyati,
      }
      
      await urun.findOneAndUpdate({_id:req.body.urunId}, urunguncelle);
      res.redirect(`/nadminpanel/urun_duzenle?id=${req.body.urunId}`);
  }catch(err){
    console.log(err);
  }
}


exports.kategoriguncelle = async (req,res,next) => {
  errors = validationResult(req);
  if(!errors.isEmpty()){
    req.flash('validation_error', errros.array());
    req.flash('kategoriadi', req.body.kategoriadi);
    req.flash('kategoriaciklama', req.body.kategoriaciklama);
    return;
  }
  try{
    _kategorisorgula = await kategori.findOne({kategoriadi:req.body.kategoriadi});

 

    const kategoriguncelle = {
      kategoriadi:req.body.kategoriadi,
      kategoriaciklama:req.body.kategoriaciklama
    }
    console.log(kategoriguncelle);
 

    await kategori.findOneAndUpdate({ _id: req.body.kategoriId }, kategoriguncelle);
    res.redirect('/nadminpanel/kategoriler')
  }catch(err){
  }
}

exports.altkategoriguncelle = async (req,res,next) =>{
  try{
     const altkategoriguncelle = {
      altkategoriadi:req.body.altkategoriadi
     }

     await altkategori.findOneAndUpdate({_id:req.body.altkategoriId}, altkategoriguncelle);
     res.redirect('/nadminpanel/altkategori')
  }catch(err){
    console.log(err)
  }
}

exports.kategoriekle = async (req,res,next)=> {
  errors = validationResult(req);
  if(!errors.isEmpty()){
   const errorMessage = errors.array().map(error => error.msg);
   res.status(400).json({ errors: errorMessage });
   return;
  }
      try{

        _kategorisorgula = await kategori.findOne({kategoriadi:req.body.kategoriadi});

        if(_kategorisorgula){
          res.status(400).json({error: ['Bu Kategori Adı Daha Önce Kayıt Edilmiş']});
        }
        const turkceKarakterMap = {
          'ğ': 'g',
          'ü': 'u',
          'ş': 's',
          'ı': 'i',
          'ö': 'o',
          'ç': 'c'
        };          
        let kategoriAdi = req.body.kategoriadi;
        kategoriAdi = kategoriAdi.replace(/ /g, '-');
        for (let turkceKarakter in turkceKarakterMap) {
          const degisim = turkceKarakterMap[turkceKarakter];
          const regex = new RegExp(turkceKarakter, 'g');
          kategoriAdi = kategoriAdi.replace(regex, degisim);
        }

        const kategorikayit = new kategori({
          kategoriadi:req.body.kategoriadi,
          kategoriurl:kategoriAdi.toLowerCase(),
          kategoriaciklama:req.body.kategoriaciklama,
          kategoridurum:true
        });

       await kategorikayit.save();
       res.status(200).json({success: ['Kategori Başarıyla Kayıt Olmuştur.']}); 
     
      }catch(err){
        console.log(err);
      }
}

exports.bankahavale = async (req,res,next) => {
  errors = validationResult(req);
  if(!errors.isEmpty()){
    const errorMessage = errors.array().map(error => error.msg);
    res.status(400).json({errors:errorMessage});
    return;
  }


  try {
    const havalebilgileri = new havale({
          bankaadi: req.body.bankaadi,
          bankahesapadsoyad: req.body.bankahesapadsoyad,
          ibanno: req.body.ibanno,
          subekodu: req.body.subekodu,
          hesapno:req.body.hesapno,
          bankaaciklamasi: req.body.bankaaciklama,
          bankaislemsonucu: req.body.bankaislemsonucu
    })
   await havalebilgileri.save();
    res.status(200).json({success: ["Güncelleme Başarılı"]});


  }catch(err){
    console.log(err);
  }
}


exports.ozellikler = async (req,res,next) =>{
  errors = validationResult(req);
  if(!errors.isEmpty()){
   const errorMessage = errors.array().map(error => error.msg);
   res.status(400).json({ errors: errorMessage });
   return;
  }
  try{
     const ozellikler = {
      ozellik1 : req.body.ozellik1,
      ozellik2 : req.body.ozellik2,
      ozellik3 : req.body.ozellik3,
      ozellik4 : req.body.ozellik4,
      ozellik5 : req.body.ozellik5,
      altozellik1 : req.body.altozellik1,
      altozellik2 : req.body.altozellik2,
      altozellik3 : req.body.altozellik3,
      altozellik4 : req.body.altozellik4,
      altozellik5 : req.body.altozellik5,
      magazabilgileri : req.body.magazabilgileri,
      telefonbilgileri : req.body.telefonbilgileri,
      adresbilgileri : req.body.adresbilgileri,
      copyright : req.body.copyright,
      misyonbilgileri: req.body.misyonbilgileri
   }

   _ozellikId = await ozellik.find()
   await ozellik.findOneAndUpdate({_id:_ozellikId}, ozellikler)
  res.status(200).json({msg: "Ekleme Başarılı"});


  }catch(err){
    console.log(err)
  }
}

