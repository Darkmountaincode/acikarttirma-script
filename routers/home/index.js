const routers = require('express').Router();
const sistem = require('../../functions/home/functions');
const hatalar = require('../../functions/home/validator');
const auth = require('../../functions/home/auth');
const gorseller = require('../../functions/home/multer');
const ayarlar = require('./functions');


routers.get('/', async (req, res) => {

  const {kategorilerListesi, altKategorilerListesi, cuzdan, slider, sites, ozellikler, urunler} = await ayarlar.tumfonksiyonlar(req);
  res.render('home/pages/index', { user: req.user,  kategoriler: kategorilerListesi,
    altkategoriler: altKategorilerListesi, urunler, cuzdan, site: sites, slider, anasayfa: ozellikler });
});

routers.get('/login', auth.oturumacilmamis,async (req,res) => {
  const {kategorilerListesi, altKategorilerListesi, cuzdan, sites, ozellikler } = await ayarlar.tumfonksiyonlar(req);
      

res.render('home/pages/giris', {user:req.user, kategoriler:kategorilerListesi,altkategoriler:altKategorilerListesi, cuzdan, site:sites, anasayfa:ozellikler})});


routers.get('/urun-ekle',auth.oturumacilmis, async(req,res) => 
{
  const {kategorilerListesi, altKategorilerListesi, cuzdan, sites, ozellikler } = await ayarlar.tumfonksiyonlar(req);
    
  res.render('home/pages/urun_ekle', {user:req.user, kategoriler:kategorilerListesi,altkategoriler:altKategorilerListesi, cuzdan, site:sites, anasayfa:ozellikler})});  
 

routers.get('/urunler/:url' ,async (req, res, next) => {
      try {
        let kazananUyeAdi = "";

      const {kategorilerListesi, altKategorilerListesi,cuzdan,sites , ozellikler } = await ayarlar.tumfonksiyonlar(req);
      const {urunler,teklifler, yorumlar} = await ayarlar.urunlerim(req);

res.render('home/pages/urunlistesi', { user: req.user,kategoriler:kategorilerListesi,altkategoriler:altKategorilerListesi, urunler,yorumlar, cuzdan, teklifler, site: sites, kazananUyeAdi, anasayfa:ozellikler });
      } catch (err) {
        console.log(err);
        next(err);
      } 
    });

routers.get('/404',auth.oturumacilmis, async (req,res) => {
    const {cuzdan, kategorilerListesi, altkategoriler,sites, ozellikler} = await ayarlar.tumfonksiyonlar(req);

      res.render('home/pages/404', {user:req.user, cuzdan, kategoriler:kategorilerListesi,altkategoriler,site:sites, anasayfa:ozellikler});
    })
 
    
routers.get('/kategoriler/:url', async (req, res) => {
try {
const {cuzdan, kategorilerListesi, altKategorilerListesi,urunler,kategorilerim,sites, ozellikler} = await ayarlar.kategoriler(req);

res.render('home/pages/kategoriler',{ user: req.user,  kategoriler: kategorilerListesi,
  altkategoriler: altKategorilerListesi, cuzdan, urunler, kategorilerim, site:sites, anasayfa:ozellikler});
        } catch (err) {
          console.log(err);
        } 
      });
      
    
    
     
routers.get('/favoriler',auth.oturumacilmis, async(req,res) => 
{
  const {kategorilerListesi, altKategorilerListesi, cuzdan,sites, ozellikler} = await ayarlar.tumfonksiyonlar(req)

    res.render('home/pages/favoriler', {user:req.user,  kategoriler:kategorilerListesi, altkategoriler:altKategorilerListesi, cuzdan, site:sites, anasayfa:ozellikler})});

 
 routers.get('/ara',auth.oturumacilmamis ,async(req,res) => {

   const {sites,kategorilerListesi, altKategorilerListesi, cuzdan, urunler, ozellikler} = await ayarlar.tumfonksiyonlar(req);
  res.render('home/pages/ara', {site:sites, kategoriler:kategorilerListesi, altkategoriler: altKategorilerListesi, cuzdan, urunler, anasayfa:ozellikler});
})


routers.get('/hesabim', async(req,res) => 
{ 
  const {kategorilerListesi, altKategorilerListesi, cuzdan,sites, teklifverilenurunler, teklifler, ihalelerim, ozellikler, yorumlar} = await ayarlar.tumfonksiyonlar(req)
  res.render('home/pages/hesabim',{user:req.user, kategoriler:kategorilerListesi, altkategoriler:altKategorilerListesi, cuzdan,yorumlar, site:sites,urunler:teklifverilenurunler, tekliflerim:teklifler, ihalelerim, anasayfa:ozellikler })});

  routers.get('/cikis', (req,res) => {
    req.session.destroy(err => { if(err){ console.log(err)}});
    res.redirect('/')});
  
routers.get('/bakiye', async (req,res) => {


  const {kategorilerListesi, altKategorilerListesi,cuzdan,sites, ozellikler} = await ayarlar.tumfonksiyonlar(req);
  res.render('home/pages/bakiye',{user:req.user,kategoriler:kategorilerListesi, altkategoriler:altKategorilerListesi, cuzdan, site:sites, anasayfa:ozellikler});
})


routers.get('/hesapbilgileri', async (req,res) => {
  const {kategorilerListesi, altKategorilerListesi, cuzdan,sites, teklifverilenurunler, teklifler, ihalelerim, ozellikler, yorumlar, havale} = await ayarlar.tumfonksiyonlar(req)

  res.render('home/pages/hesapbilgileri',{user:req.user, kategoriler:kategorilerListesi, altkategoriler:altKategorilerListesi, cuzdan,yorumlar,havale ,site:sites,urunler:teklifverilenurunler, tekliflerim:teklifler, ihalelerim, anasayfa:ozellikler })});
 
////////////////////// POST İŞLEMLERİ ////////////////////////////
 
routers.post('/uyegiris', hatalar.uyegiris(),sistem.uyegiris);

routers.post('/uyekayit',hatalar.uyekayit(),sistem.uyekayit);

routers.post('/urunkaydet', gorseller.fields([
    {  name: 'urungorsel', maxCount: 5}]), hatalar.urunkaydet(), sistem.urunkaydet);
    
routers.post('/hesapdetay', hatalar.hesapdetay(), sistem.hesapdetay);

routers.post('/ara', sistem.aramayap);


routers.post('/teklifver', hatalar.teklifver(),sistem.teklifver);

routers.post('/yorumekle',hatalar.yorumekle(), sistem.yorumekle);


module.exports = routers;