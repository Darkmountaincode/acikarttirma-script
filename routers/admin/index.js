const routers = require('express').Router();
const anaduzen = require('../../functions/admin/functions');
const hata = require('../../functions/admin/validator');
const resimler = require('../../functions/admin/multer');
const auth = require('../../functions/admin/auth'); 
const slidergorsel = require('../../functions/admin/slider');
const ayarlar = require('./functions');


routers.get('/nadminpanel',auth.oturumacilmis, async (req,res) => 
    { res.render('admin/pages/index', {user:req.user})});


routers.get('/nadminpanel/login',auth.oturumacilmamis ,(req,res) => {res.render('admin/pages/login')})

routers.get('/nadminpanel/sitebilgileri',auth.oturumacilmis, async (req,res) => {
      const {sites} = await ayarlar.tumfonksiyonlar(req);
  res.render('admin/pages/sitebilgileri', {site:sites})});


routers.get('/nadminpanel/odemebilgileri',auth.oturumacilmis , async (req,res) => 
{
  const {havale} = await ayarlar.tumfonksiyonlar(req);
res.render('admin/pages/odemebilgileri', {havale})});

 

routers.get('/nadminpanel/kategoriler',auth.oturumacilmis , async (req,res)  => {
      try{
        const {kategoriler} = await ayarlar.tumfonksiyonlar(req);
      res.render('admin/pages/kategoriler',{kategoriler})
    }catch(err){
      console.log(err);
    }});

 
 
 routers.get('/nadminpanel/altkategori', auth.oturumacilmis, async (req, res) => {
      try {
        const {kategoriler,altkategoriler} = await ayarlar.tumfonksiyonlar(req);
        res.render('admin/pages/altkategori', {kategoriler, altkategoriler });
      } catch (err) {
        console.log(err);
      }
    });
    


routers.get('/nadminpanel/uyelist',auth.oturumacilmis ,async (req,res) => {
      const {uyeler} = await ayarlar.tumfonksiyonlar(req);
      res.render('admin/pages/uyelist', {uyeler})});



routers.get('/nadminpanel/favoriler',auth.oturumacilmis , (req,res) => {
        res.render('admin/pages/favoriler')});
    
    
routers.get('/nadminpanel/urunler', auth.oturumacilmis, async (req, res) => {
   try {
   const {urunler, kategoriler, altkategoriler, seciliAltKategoriId} = await ayarlar.tumfonksiyonlar(req);
   res.render('admin/pages/urunler', { urunler, kategoriler, altkategoriler, seciliAltKategoriId });
   } catch (err) {
   console.log(err);
   }});

      
routers.get('/nadminpanel/urun_duzenle', auth.oturumacilmis, async (req, res) => {
     try {
      
     const {kategoriler, altkategoriler,seciliAltKategoriId} = await ayarlar.tumfonksiyonlar(req);
     const {urunler} = await ayarlar.urunler(req); 
     res.render('admin/pages/urun_duzenle', { urunler, kategoriler, altkategoriler, seciliAltKategoriId });
     console.log(urunler);
     } catch (err) {
     console.log(err);
     }});


  
routers.get('/nadminpanel/slide_duzenle', auth.oturumacilmis, async (req,res) => {
     try{
     const {sliderr} = await ayarlar.tumfonksiyonlar(req);
     res.render('admin/pages/slide_duzenle', {sliderr});
     }catch(err){
     console.log(err);
     }});
        
        
routers.get('/getAltKategoriler',  auth.oturumacilmis, async (req, res) => {
        try {
       const {altKategoriler} = await ayarlar.tumfonksiyonlar(req);
        res.json({ altKategoriler});
        } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Sunucu hatası" });
        }});


routers.get('/nadminpanel/slide_duzenle', auth.oturumacilmis, async (req,res) => {
   try{
   res.render('admin/pages/slide_duzenle');
   }catch(err){
   console.log(err);
   }});
 
routers.get('/nadminpanel/slide', auth.oturumacilmis, async (req,res) => {
  try{  
   const {sliderr} = await ayarlar.tumfonksiyonlar(req);
    res.render('admin/pages/slide', {slider:sliderr});
  }catch(err){
    console.log(err);
  }
})




routers.get('/nadminpanel/ozellikler', auth.oturumacilmis, async (req,res) => {
  try{
    const {ozellikler} = await ayarlar.tumfonksiyonlar(req);
      res.render('admin/pages/ozellikler', {ozellikler:ozellikler});
  }catch(err){ 
    console.log(err)
  } 
}) 

/////////////////////////// POST ////////////////////////////////// 


routers.post('/nadminpanel/sitekaydet',resimler.fields([{
  name: 'logo', maxCount: 1
}, {
  name: 'favicon', maxCount: 1
}]),hata.sitebilgi(),anaduzen.sitebilgileri);

routers.post('/nadminpanel/sitedurumguncelle', anaduzen.sitedurum);

routers.post('/nadminpanel/nadminlogin',hata.login(), anaduzen.nadminlogin);

routers.post('/nadminpanel/kategoriekle',auth.oturumacilmis,hata.kategori() ,anaduzen.kategoriekle)

routers.post('/nadminpanel/altkategoriekle',auth.oturumacilmis,hata.altkategori(),anaduzen.altkategoriekle);

routers.post('/nadminpanel/kategoriguncelle',hata.kategori(), anaduzen.kategoriguncelle)

routers.post('/nadminpanel/uyeguncelle', anaduzen.uyelist);

routers.post('/nadminpanel/altkategoriguncelle', anaduzen.altkategoriguncelle)

routers.post('/nadminpanel/odemedurumu', anaduzen.odemebilgileri);

routers.post('/nadminpanel/urunguncelle', anaduzen.urunguncelle);

routers.post('/nadminpanel/slideguncelle',slidergorsel.single('slidegorsel'), anaduzen.slideguncelle);

routers.post('/nadminpanel/ozellikKaydet', hata.ozellikler(), anaduzen.ozellikler);

routers.post('/nadminpanel/havalekaydet',hata.havalesistem(), anaduzen.bankahavale);

///////////////////////////// DELETE İŞLEMLERİ //////////////////////////////////////

routers.delete('/nadminpanel/kategoriler/kategorisil/:id', (req,res) => {
  const kategoriId = req.params.id;
  kategori.findByIdAndDelete(kategoriId).then(()=> {
    res.sendStatus(200).json({success : ['Silme İşlemi Başarılı']});
  }).catch((err) => {
    res.sendStatus(500).json({succes : ['Silme İşlemi Başarısız']})
  });
});

routers.delete('/nadminpanel/altkategori/altkategorisil/:id', (req,res) => {
  const altkategoriId = req.params.id;
  altkategori.findByIdAndDelete(altkategoriId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});


routers.delete('/nadminpanel/urunler/urunsil/:id', (req,res) => {
  const urunId = req.params.id;
  urun.findByIdAndDelete(urunId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});


module.exports = routers;