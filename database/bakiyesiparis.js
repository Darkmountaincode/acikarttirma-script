const bakiyesiparis = new Schema({
    bakiye:{type:String},
    bakiyedurum:{type:Boolean, default:false},
    uyeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'cuzdan',
    }
}, {collection:'bakiye', bakiye});

module.expots = mongoDB.model('bakiye', bakiyesiparis)