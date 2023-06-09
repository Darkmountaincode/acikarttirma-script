const site = new Schema({
    site:{
        favicon:{type:String, default:'https://png.pngtree.com/png-clipart/20200709/original/pngtree-letter-i-logo-template-design-png-image_3577016.jpg'},
        logo:{type:String, default:'https://png.pngtree.com/png-clipart/20200709/original/pngtree-letter-i-logo-template-design-png-image_3577016.jpg'},
        baslik:{type:String, default:"İhale E-Ticaret"},
        aciklama:{type:String, default:"herkesin kendi oluşturduğu ihaleler ile teklif yapma"},
        anahtar:{type:String, default:'ihale, eticaret,ihaleleriniz, ihale oluştur, hemen ihale'},
        googleanalistik:{type:String, default:''}
        
    },
   
    reklam:{
        header:{type:String, default:''},
        footer:{type:String, default:''}
    },
    ihaledurumu:{
        status:{type:Boolean, default:true},
        message:{type:String, default:'İhaleler Şuan da Kapalı Daha Sonra Tekrar Deneyiniz'}
    },
    sitedurum:{
        status:{type:Boolean, default:true},
        message:{type:String, default:'Sitemiz Şuanda Bakımdadır Lütfen Daha Sonra Tekrar Deneyiniz'}
    },
    uyedurum:{
        status:{type:Boolean, default:true},
        message:{type:String, default:'Sitemiz Şuan da Üye Alımına Kapalıdır.'}
    },
    mail:{
        status:{type:Boolean,default:false},
        mailArea:{type:Boolean,default:false},
        baslik:{type:String,default:'İhale Sitesine Hoşgeldiniz'},
        tema:{type:String,default:'Hoşgeldiniz, {name} hesabınızı aktifleştirmek için lütfen linke tıklayınız:{link}'},
        smtp:{
            host:{type:String,default:''},
            port:{type:Number,default:587},
            secure:{type:Boolean,default:false},
            auth:{
                user:{type:String,default:''},
                pass:{type:String,default:''},
            },
        }
    },
    bildirim:{
        teklifsonrasi:{
            status:{type:Boolean,default:false},
            message:{type:String, default:'Üst Teklif Verildiğinde Bildirim gitsin mi ?'}
        },
        dusukbakiye:{
            status:{type:Boolean,default:false},
            cuzdan:{type:Number, default:10}, // 10 tlden düşük bakiyesi varsa bilidirm gönderebilir.
        },
        yenisiparis:{
        status:{type:Boolean, default:false},
        sms:{
            status:{type:Boolean,default:false},
            number:{type:String,default:''}
        },
        mail:{
            status:{type:Boolean,default:false},
            mail:{type:String,default:''},
        }
        },
        songonderim: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }, // Son gönderim tarihi
    },

    captcha:{
        service:{type:Boolean, default:false}, // (true =google , false: hcaptcha)
        sitekey:{type:String, default:''},
        secretkey:{type:String, default:''},
        status:{type:Boolean,default:false},
      
    },
    sanalPos:{
        payTr:{
            status:{type:Boolean,default:false},
            name:{type:String,default:'PayTR'},
            commission:{type:Number, default: 2 },
            minPrice:{type:Number, default: 10},
            MaxPrice:{type:Number, default:10000},
            merchantId:{type:String, default:''},
            merchantKey:{type:String, default:''},
            merchantSalt:{type:String, default:''}
        },
        payTrHavale:{
            status:{type:Boolean, default:false},
            name:{type:String, default:'PayTR Havale'},
            commission:{type:String,default:0},
            minPrice:{type:String,default:10},
            maxPrice:{type:String, default:10000},
            merchantId:{type:String,default:''},
            merchantKey:{type:String,default:''},
            merchantSalt:{type:String,default:''}
        },
        vallet: {
            status: { type: Boolean, default: false }, // Vallet açık mı?
            name: { type: String, default: 'Vallet' }, // Görünür isim
            commission: { type: Number, default: 0 }, // Komisyon oranı
            minPrice: { type: Number, default: 10 }, // Minimum ödeme tutarı
            maxPrice: { type: Number, default: 1000 }, // Maksimum ödeme tutarı
            api_user: { type: String, default: '' }, // Vallet api kullanıcı adı
            shop_code: { type: String, default: '' }, // Vallet mağaza kodu
            api_key: { type: String, default: '' }, // Vallet api anahtarı
            api_hash: { type: String, default: '' }, // Vallet api hash
        },
        weepay: {
            status: { type: Boolean, default: false }, // Weepay Açık mı ? 
            name: { type: String, default: 'Weepay' }, // Görünür isim
            commission: { type: Number, default: 0 }, // Komisyon oranı
            minPrice: { type: Number, default: 10 }, // Minimum ödeme tutarı
            maxPrice: { type: Number, default: 1000 }, // Maksimum ödeme tutarı
            bayiId: { type: String, default: '' }, // Weepay bayi id
            apiKey: { type: String, default: '' }, // Weepay api anahtarı
            secretKey: { type: String, default: '' }, // Weepay gizli anahtar
            currency: { type: String, default: 'TRY' }, // Weepay para birimi
        },
        shipy: {
            status: { type: Boolean, default: false }, // Shipy Açık mı ?
            name: { type: String, default: 'Shipy' }, // Görünür isim
            commission: { type: Number, default: 0 }, // Komisyon oranı
            minPrice: { type: Number, default: 10 }, // Minimum ödeme tutarı
            maxPrice: { type: Number, default: 1000 }, // Maksimum ödeme tutarı
            apiKey: { type: String, default: '' }, // Shipy api anahtarı
        },
        iyzico: {
            status: { type: Boolean, default: false }, // Iyzico Açık mı ?
            name: { type: String, default: 'Iyzico' }, // Görünür isim
            commission: { type: Number, default: 0 }, // Komisyon oranı
            minPrice: { type: Number, default: 10 }, // Minimum ödeme tutarı
            maxPrice: { type: Number, default: 1000 }, // Maksimum ödeme tutarı
            apiKey: { type: String, default: '' }, // Iyzico api anahtarı
            apiSecret: { type: String, default: '' }, // Iyzico api gizli anahtarı
        },
        bankahesaplari:{type:Array, default:[]},
        apiServices:{type:Array, default:[]},
        license:{
            key:{type:String,default:''},
            status:{type:String,default:'active'},
            expireDate:{type:String,default:moment().format('DD MMMM YYYY HH:mm:ss')}, // lisansın son kullanım tarihi
            lastCheck:{type:String,default : moment().format('DD MMMM YYYY HH:mm:ss')}, // son kontrol tarihi
        }
    }
});

module.exports = mongoDB.model('site', site);