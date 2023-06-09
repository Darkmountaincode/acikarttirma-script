
const yorumlar = new Schema({
    uyeyorum:{type:String},
    uyeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'uyeler'
    },
    urunId:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'urunler'
    },
    degerlendirme:{type:Number},
}, {collection:'yorumlar'});

module.exports = mongoDB.model('yorumlar', yorumlar);  