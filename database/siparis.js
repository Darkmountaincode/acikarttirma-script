const siparisler = new  Schema({
    siparisno:{type:String, required:true, unique:true},
    uyeId:{ type:mongoose.Schema.Types.ObjectId, ref:'uyeler', required:true },
    urunId:{type:mongoose.Schema.Types.ObjectId, ref:'urunler', required:true},
    miktar:{type:Number, required:true},
    toplamFiyat:{type:Number, required:true},
    teslimatAdresi:{type:Number, required:true},
    siparisTarihi:{type:Date, default:Date.now},
    durum:{type:String, default:'beklemede'}
})