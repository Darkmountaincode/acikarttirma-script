const havale = new Schema({
    bankaadi:{type:String, default:''},
    bankahesapadsoyad:{type:String, default:''},
    ibanno:{type:String, default:''},
    subekodu:{type:String, default:''},
    hesapno:{type:String, default:''},
    bankaaciklamasi:{type:String, default:''},
    bankaislemsonucu:{type:String, default:''},
    eklenmetarihi:{type:String,default:moment().format('DD MMMM YYYY HH:mm:ss')}, // lisansın son kullanım tarihi
}, {collection:'havale'})

module.exports = mongoDB.model('havale', havale)