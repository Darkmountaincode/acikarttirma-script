const teklif = require('../../database/teklifler');
const slide = require('../../database/slider');
const ozellik = require('../../database/anasayfa');
const altkategori = require('../../database/altkategoriler');
const kategori = require('../../database/kategoriler'); 
const urun = require('../../database/urunler');
const site = require('../../database/site');
const cuzdanim = require('../../database/cuzdan');
const uye = require('../../database/uyeler');
const yorum = require('../../database/yorumlar');
const bankahavale = require('../../database/havale');
async function tumfonksiyonlar(req){
   const kategorilerListesi = await kategori.find({}).lean();
   const altKategorilerListesi = await altkategori.find({}).lean();  
   const urunler = await urun.find({});
   const slider = await slide.find({});
   const sites = await site.findOne({});
   const ozellikler = await ozellik.findOne({});
   const kategoriler = await kategori.find({});
   const havale  = await bankahavale.find({})
   let cuzdan = null;
   let ihalelerim = null;
   let teklifler = null;
   let tekliflerim = null;
   let teklifverilenurunler = null;
   let yorumlar = null;
    
   if(req.user){
    yorumlar = await yorum.find({ uyeId: req.user.id }).populate('urunId');
    teklifler = await teklif.find({ urunId: urunler._id }).populate('uyeId').sort({eklenmetarihi: -1});
    tekliflerim = await teklif.find({ uyeId: req.user.id }).populate('urunId');
    teklifverilenurunler = await Promise.all(tekliflerim.map(async (teklif) => {
    urunlerim = await urun.findById(teklif.urunId).lean();
    return urunlerim;
  }));
}

 

   if (req.user) {
     cuzdan = await cuzdanim.findOne({ uyeId: req.user.id }).populate('uyeId');
     ihalelerim = await urun.find({uyeId:req.user.id}).populate('uyeId');
   }
 
 
   return {
     cuzdan,
     sites,
     kategorilerListesi,
     altKategorilerListesi,
     slider,
     ozellikler,
     urunler,
     kategoriler,
     teklifler,
     teklifverilenurunler,
     tekliflerim,
     ihalelerim,
     yorumlar,
     havale
   }
 }

async function urunlerim(req){
   const url = req.params.url;
    
        if (url === 'anasayfa' || url === 'hataliurl') {
          return res.redirect('/404');
        }

        const urunler = await urun.findOne({ ihaleurl: url });
        if (!urunler) {
          return res.redirect('/404');
        }

        if (urunler.ihaledurumu === false && urunler.kazananUyeId) {
         const kazananUye = await uye.findById(urunler.kazananUyeId);
         kazananUyeAdi = kazananUye.uyeadi + ' ' + kazananUye.uyesoyad;
       }
       
     const teklifler = await teklif.find({ urunId: urunler._id }).populate('uyeId').sort({eklenmetarihi: -1});
    const yorumlar = await yorum.find({urunId: urunler._id});
   return {
      urunler,
      teklifler,
      yorumlar
      
   }
}

async function kategoriler(req){
   const url = req.params.url;
   const kategorilerim = await kategori.find({ kategoriurl: url });
   const kategoriIds = kategorilerim.map(kategori => kategori._id); // Kategorilerin _id 
   const kategorilerListesi = await kategori.find({}).lean();
   const altKategorilerListesi = await altkategori.find({}).lean(); 
   const urunler = await urun.find({ kategoriId: { $in: kategoriIds } }).populate('kategoriId', 'urunadi').exec();
   const ozellikler = await ozellik.findOne({});

   let cuzdan = null;
   if (req.user) {
     cuzdan = await cuzdanim.findOne({ uyeId: req.user.id }).populate('uyeId');
   }
   const sites = await site.findOne({});
   return {
      kategorilerim,
      urunler,
      sites,
      kategorilerListesi,
      altKategorilerListesi,
      ozellikler
   }
}


async function gizlisistem(req){
  const arananKelime = req.body.ara;
  const ozellikler = await ozellik.findOne({});


  const Urunler = await urun.find({ urunadi: { $regex: arananKelime, $options: "i" } }).exec();

  const sites = await site.findOne({});
  const kategorilerListesi = await kategori.find({}).lean();
  const altKategorilerListesi = await altkategori.find({}).lean();  
  cuzdan = null;
  if (req.user) {
    cuzdan = await cuzdanim.findOne({ uyeId: req.user.id }).populate('uyeId');
  }
  return {
    Urunler,
    sites,
    kategorilerListesi,
    altKategorilerListesi,
    cuzdan,
    ozellikler
  }
}

 
 module.exports = {
    tumfonksiyonlar,
    urunlerim,
    kategoriler,
    gizlisistem
 }