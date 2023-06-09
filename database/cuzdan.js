const cuzdan = new Schema({
    uyeId:{type:mongoose.Schema.Types.ObjectId, ref:'uyeler', required:true},
    bakiye:{type:Number, default:0},
    bakiyetarihi: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }, // Son gönderim tarihi

}, {collection: 'cuzdan'});

module.exports = mongoDB.model('cuzdan',cuzdan);