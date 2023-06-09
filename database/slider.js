const slider = new Schema({
    slideadi:{type:String, default:''},
    slidealtadi:{type:String, default:''},
    slideurunbaslangicfiyati:{type:Number, default:0},
    slideindirimlifiyati:{type:Number, default:0},
    slideindirimorani:{type:String, default:'0%'},
    slideurunlinki:{type:String, default:''},
    slidegorsel:{type:String, default:''},
    eklenmetarihi: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') }
}, {collection:'slider'});


module.exports = mongoDB.model('slider', slider);