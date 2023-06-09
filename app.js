global.mongoose = require('mongoose');
global.express = require('express');
global.config = require('./config');
global.ejs = require('ejs');
global.flash = require('connect-flash');
global.passport = require('passport');
global.app = express();
global.session = require('express-session');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
global.mongoDbStore = require('connect-mongodb-session')(session);
global.Schema = mongoose.Schema;
global.moment = require('moment');
global.bcrypt = require('bcrypt');
global.multer = require('multer');
global.path = require('path');
global.path = require('path');
global.crypto = require('crypto');
global.axios = require('axios')

global.mongoDB = mongoose.createConnection(config.mongoDB, {
    useNewUrlParser:true, useUnifiedTopology:true
}).addListener('connected', () => {
    console.log("Veritabanı Bağlantısı Başarılı");
}).addListener('disconnected', () => {
    console.log("Veritabanı Bağlantısı Başarısız");
}).addListener('error', (err)=> {
    console.log(`${err} Veritabanı Bağlantısı Başarısız`);
})

global.siteModel = require('./database/site');
global.uyelerModel = require('./database/uyeler');
global.anasayfaModel = require('./database/anasayfa');
global.kategorilerModel = require('./database/kategoriler');
global.sliderModel = require('./database/slider');
global.siteData;
 


(async () => {
    let site = await siteModel.countDocuments();
    let uyelerCount = await uyelerModel.countDocuments();
    let anasayfa = await anasayfaModel.countDocuments();
    let kategoriler = await kategorilerModel.countDocuments();
    let slider = await sliderModel.countDocuments();
    if (site === 0) {
      const defaultSiteData = new siteModel().site; // siteModel() ile boş bir siteModel örneği oluşturup, site verilerine erişebilirsiniz
      
      const newSite = new siteModel(defaultSiteData); // Varsayılan site verilerini kullanarak yeni bir siteModel örneği oluşturun
      
      await newSite.save(); // Yeni siteModel örneğini kaydedin
    };

    if (uyelerCount === 0) {
      const adminData = {
        uyeadi: 'admin',
        uyesoyad: 'admin',
        uyemail: 'admin@example.com',
        uyecinsiyet: 'Erkek', 
        uyebakiye: 0,
        uyeadres: '',
        uyedurum: true,
        uyesifre: 'admin123', // Şifreyi güvenli bir şekilde saklamalısınız
        uyetel: '',
        uyeadresbasligi: '',
        uyeil: '',
        uyeilce: '',
        postakodu: '',
        admin: true,
        bandurumu: false,
        uyekayittarihi: moment().format('YYYY-MM-DD HH:mm:ss')
      };
      await admin.save();
      const admin = new uyelerModel(adminData);
    }
      if(anasayfa === 0 ){
        const anasayfaData = { 
        ozellik1 : "Her Gün Yüzlerce İhale",
        ozellik2 : "Güvenli Ödeme",
        ozellik3 : "7/24 Destek",
        ozellik4 : "Anında Geri Ödeme",
        ozellik5 : "Hızlı Kargo",
        altozellik1 : "Hemen Teklif Ver",
        altozellik2 : "%100 Güvenli Ödeme",
        altozellik3 : "Anında Destek",
        altozellik4 : "Anında  Geri Ödeme",
        altozellik5 : "Hızlı Kargo",
        adresbilgileri : "İzmir, Türkiye 35000",
        copyright : "Copyright © İhale Pazarı. Tüm Hakları Pazarı İhale Pazarı.",
        magazabilgileri : "Elektronik endüstrisinde istisnasız olarak mevcut olan mutlak en iyi m…",
        misyonbilgileri : "İhale Pazarı, şeffaf, adil ve rekabetçi bir ortamda ihale süreçlerini …",
        telefonbilgileri : "5445454545",
            };
      const anasayfakayit = new anasayfaModel(anasayfaData);
      await anasayfakayit.save();
    };
    if(kategoriler === 0){
        const kategorilerData = {
        kategoriadi : "Kadın",
        kategoriaciklama : "Kadınlara dair her şey burada",
        kategoriurl : "kadin",
        kategoridurum : "true",
        }
        const kategorilerkayit = new kategorilerModel(kategorilerData);
        await kategorilerkayit.save();
    }
    if(slider === 0){
        const sliderData = {

        slideadi : "slide111",
        slidealtadi : "demo2",
        slideurunbaslangicfiyati : 120,
        slideindirimlifiyati : 100,
        slideindirimorani : "29",
        slideurunlinki : "test.com",
        slidegorsel : "461761.jpg",
        eklenmetarihi : moment().format('YYYY-MM-DD HH:mm:ss')
        };
        const slidekayit = new sliderModel(sliderData);
        await slidekayit.save();
    }

  })();

require('./routers/routers')(this);


app.listen(config.PORT, () => {
    console.log(`${config.PORT} Bağlantısı Başarılı`);
});
