const anasayfa = new Schema({
    ozellik1:{type:String},
    ozellik2:{type:String},
    ozellik3:{type:String},
    ozellik4:{type:String},
    ozellik5:{type:String},
    altozellik1:{type:String},
    altozellik2:{type:String},
    altozellik3:{type:String},
    altozellik4:{type:String},
    altozellik5:{type:String},
    magazabilgileri:{type:String},
    copyright: {type:String},
    telefonbilgileri: {type:String},
    adresbilgileri: {type:String},
    misyonbilgileri: {type:String}
}, {collection:'anasayfa'});

module.exports = mongoDB.model('anasayfa', anasayfa);

// 