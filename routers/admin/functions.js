const site = require('../../database/site');
const kategori = require('../../database/kategoriler');
const altkategori = require('../../database/altkategoriler');
const uyelik = require('../../database/uyeler');
const urun = require('../../database/urunler');
const ozellik = require('../../database/anasayfa'); 
const slide = require('../../database/slider');
const havaleler = require('../../database/havale');
async function tumfonksiyonlar(req){
            const sites = await site.findOne({})
            const kategoriler = await kategori.find({});
          const altkategoriler = await altkategori.find({}).populate('kategoriId');
         const uyeler = await uyelik.find({});
          const urunler = await urun.find({});
            
            const seciliAltKategoriId = req.query.alt_kategori;
            const slideId = req.query.id;
          
            const slider = await slide.findById(slideId);
            const kategoriId = req.query.kategoriId;
            const altKategoriler = await altkategori.find({ kategoriId: kategoriId });
            const sliderr =  await slide.find({});
            const ozellikler = await ozellik.findOne({});
            const havale = await havaleler.find({});
    return {
      sites,
      kategoriler,
      altkategoriler,
      uyeler,
      urunler,
      seciliAltKategoriId,
      slider,
      altKategoriler,
      ozellikler,
      sliderr,
      havale
    }
  }

  
async function urunler(req){
      const urunId = req.query.id; // id parametresini al
        
           
            const urunler = await urun.findById(urunId);
            const kategoriler = await kategori.find({});
            const altkategoriler = await altkategori.find({});
            
          
            const seciliAltKategoriId = req.query.alt_kategori;
        

    return {
        urunler,
        kategoriler,
        altkategoriler,
        seciliAltKategoriId
    }
}

  module.exports = {
    tumfonksiyonlar,
    urunler
  }