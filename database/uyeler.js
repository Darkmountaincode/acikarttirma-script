const uyeler = new Schema({
    uyeadi:{type:String},
    uyesoyad:{type:String,},
    uyemail:{type:String, unique:true, required:true},
    uyecinsiyet:{type:String},
    uyebakiye:{type:Number, default:0},
    uyeadres: { type: String },
    uyedurum:{type:Boolean, default:false},
    uyesifre:{type:String},
    uyetel:{type:String},
    uyeadresbasligi:{type:String},
    uyeil:{type:String},
    uyeilce:{type:String},
    postakodu:{type:String},
    admin:{type:Boolean, default:false},
    bandurumu:{type:String,default:false},
    uyekayittarihi: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }, 
}, {collection:'uyeler'});

module.exports = mongoDB.model('uyeler', uyeler)