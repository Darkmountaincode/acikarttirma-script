function rastgeleurunkodu(length){
 let result = '';
 const karakterler = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
 const karakteruzunluk = karakterler.length;

 for(let i = 0; i < length; i++){
    result += karakterler.charAt(Math.floor(Math.random() * karakteruzunluk));
 }
 return result;
}
const urunler = new Schema({
    urunadi:{type:String, unique:true, required:true},
    urunaciklamasi:{type:String},
    urunfiyati:{type:String},
    baslangicfiyati:{type:Number},
    hemenalfiyati:{type:Number},
    urunId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'uyeler'
    },
    kategoriId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'kategoriler'
    },
    altkategoriId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'altkategoriler'
    },
    uyeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'uyeler'
    },
    urunozellikleri:{type:String},
    urunetiketleri:{type:String},
    urunkodu:{type:String, default: rastgeleurunkodu(8)},
    urungorsel1:{type:String, default:''},
    urungorsel2:{type:String, default:''},
    urungorsel3:{type:String, default:''},
    urungorsel4:{type:String, default:''},
    urungorsel5:{type:String, default:''},
    ozellik1:{type:String, default:''},
    ozellik2:{type:String, default:''},
    ozellik3:{type:String, default:''},
    ozellik4:{type:String, default:''},
    ozellik5:{type:String, default:''},
    populerurun: {type:Boolean, default: false},
    kazananUyeId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'uyeler',
        default: null
      },    ihaledurumu:{type:Boolean, default:true},
    ihaleurl:{type:String},
    ihaleeklemetarihi:{type:Date, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    ihalebaslangictarihi:{type:Date},
    ihalebitistarihi:{type:Date}
}, {collection:'urunler'});


module.exports = mongoDB.model('urunler', urunler);