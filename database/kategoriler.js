const kategoriler =  Schema({
    kategoriadi:{ type:String },
    kategoriaciklama:{ type:String },
    kategoriurl: { type:String },
    altkategoriler: [{ type: mongoose.Schema.Types.ObjectId, ref: 'altkategoriler' }],
    kategoridurum: {type:Boolean, default: true},
}, {collection:'kategoriler'});

module.exports = mongoDB.model('kategoriler', kategoriler);