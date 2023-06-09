const altkategoriler = new Schema({
    altkategoriadi:{type:String},
    altkategoridurum:{type:Boolean, default:true},
    kategoriId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'kategoriler'
    },
    altkategoriurl: {type:String},
}, {collection:'altkategoriler'});


module.exports = mongoDB.model('altkategoriler', altkategoriler);