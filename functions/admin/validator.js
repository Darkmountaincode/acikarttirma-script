const {body} = require('express-validator');

exports.sitebilgi = () => {
    return  [
        body('baslik',"Site Başlığı Minimum 5 Maksimum 100 Karakter Olabilir").isLength({min:5, max:100}),
        body('aciklama', "Site Açıklamanız Minimum 50 Maksimum 500 Karakter Olabilir").isLength({min:50, max:500}),
        body('anahtar', 'Site Anahtar Kelimeniz Minimum 10 Maksimum 100 Karakter Olabilir').isLength({min:10, max:100}),

    ]
};

exports.login = () => {
    return [
        body('email').isEmail().withMessage("Lütfen Geçerli Bir Email Giriniz")
    ]
}

exports.kategori = () => {
    return [
        body('kategoriadi', "Kategori Adınız En Az 3 En Fazla 30 Karakter Olabilir").isLength({min:3, max:30}),
        body('kategoriaciklama', "Kategori Açıklamanız En  Az 20 En Fazla 300 Karakter Olabilir").isLength({min:20, max:300})
    ]
}

exports.altkategori = () => {
    return [
        body('altkategoriadi').trim().isLength({min:3, max:30}).withMessage("Alt Kategoriniz en Az 3 En Fazla 30 Karakter Olabilir")
    ]
}

exports.ozellikler = () => {
    return [
        body('ozellik1', 'Lütfen Geçerli Bir Özellik 1 Giriniz').isLength({min:3, max:25}),
        body('ozellik2','Lütfen Geçerli Bir Özellik 2 Giriniz').isLength({min:3, max:25}),
        body('ozellik3', 'Lütfen Geçerli Bir Özellik 3 Giriniz').isLength({min:3, max:25}),
        body('ozellik4', 'Lütfen Geçerli Bir Özellik 4 Giriniz').isLength({min:3, max:25}),
        body('ozellik5', 'Lütfen Geçerli Bir Özellik 5 Giriniz').isLength({min:3, max:25}),
        body('altozellik1', 'Lütfen Geçerli Bir Özellik 1 Giriniz').isLength({min:3, max:25}),
        body('altozellik2', 'Lütfen Geçerli Bir Özellik 2 Giriniz').isLength({min:3, max:25}),
        body('altozellik3', 'Lütfen Geçerli Bir Özellik 3 Giriniz').isLength({min:3, max:25}),
        body('altozellik4', 'Lütfen Geçerli Bir Özellik 4 Giriniz').isLength({min:3, max:25}),
        body('altozellik5', 'Lütfen Geçerli Bir Özellik 5 Giriniz').isLength({min:3, max:25}),
        body('magazabilgileri', 'Mağaza Bilgileriniz Minimum 5 Maksimum 100 Karakter Olabilir').isLength({min:5, max:100}),
        body('copyright', 'Footer Alanı Minimum 10 Maksimum 70 Karakter Olabilir').isLength({min:10, max:70}),
        body('telefonbilgileri').isNumeric().withMessage('Lütfen Geçerli Bir Telefon Numarası Giriniz.'),
        body('adresbilgileri', 'Adresiniz Minimum 15 Maksimum 100 Karakter Olabilir.').isLength({min:15, max:100}),
        body('misyonbilgileri', 'Misyon Bilgileri Minimum 15 Maksimum 100 Karakter Olabilir.').isLength({min:15, max:200}),
    ] 
}

exports.havalesistem = () => {
    return [
        body('bankaadi', 'Lütfen Banka Adını Boş Bırakmayınız..').isLength({min:1}),
        body('bankahesapadsoyad', 'Lütfen  Banka Hesap Adınızı Ve Soyadınızı Boş Bırakmayınız..').isLength({min:1}),
        body('ibanno', 'Lütfen İban No Boş Bırakmayınız').isLength({min:1}),
        body('subekodu', 'Lütfen Şube Kodunu Boş Bırakmayınız..').isLength({min:1}),
        body('hesapno', 'Lütfen Hesap Numarasını Boş Bırakmayınız..').isLength({min:1}),
        body('bankaaciklama', 'Lütfen Banka Açıklamasını Boş Bırakmayınız..').isLength({min:1}),
        
    ]
}