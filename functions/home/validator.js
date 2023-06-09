const {body} = require('express-validator');
exports.uyekayit = () => {
    return [
        body('ad', 'Adınız Minimum 3 Maksimum 15 Karakter Olabilir').isLength({min:3, max:15}),
        body('soyad', 'Soyadınız Minimum 3 Maksimum 20 Karakter Olabilir').isLength({min:3,max:20}),
        body('emails').isEmail().withMessage('Lütfen Geçerli Bir Email Giriniz'),
        body('sifres', 'Şifreniz Minimum 6 Maksimum 18 Karakter Olabilir').isLength({min:6, max:18}),
        body('resifres').trim().custom((value, {req}) => {
            if(value !== req.body.sifres){
                throw new Error('Şifreniz Aynı Olmalıdır.');
            }
            return true;
        })
    ];
};

exports.yorumekle = () => {
  return [
      body('yorumbilgisi','Yorumunuz Minimum 15 Maksimum 200 Karakter Olaiblir').isLength({min:15, max:200})
  ]
}

exports.hesapdetay = () => {
    return [
            body('uyead', 'Adınız Minimum 3 Maksimum 15 Karakter Olabilir').isLength({min:3, max:15}),
            body('uyesoyad', 'Soyadınız Minimum 3 Maksimum 20 Karakter Olabilir').isLength({min:3,max:20}),
            body('uyemail').isEmail().withMessage('Lütfen Geçerli Bir Email Giriniz'),
            body('uyetel').custom((value, { req }) => {
                // Telefon numarasındaki tüm rakamları ve boşlukları kaldırarak sadece rakamları içeren bir dize elde ediyoruz
                const numericValue = value.replace(/[\s()-]/g, '');
            
                if (!/^\d{10}$/.test(numericValue)) {
                  throw new Error('Lütfen Geçerli Bir Numara Giriniz');
                }
            
                return true;
              }),
            body('eskisifre', 'Şifreniz Minimum 6 Maksimum 18 Karakter Olabilir').isLength({min:6, max:18}),
            body('yenisifre')
            .optional({ checkFalsy: true }) // Alan boş bırakıldığında doğrulama yapma
            .isLength({ min: 6, max: 18 }).withMessage('Yeni Şifreniz Minimum 6 Maksimum 18 Karakter Olabilir'),
          body('yenisifretekrar')
            .optional({ checkFalsy: true }) // Alan boş bırakıldığında doğrulama yapma
            .custom((value, { req }) => {
              if (value && value !== req.body.yenisifre) { // Alan doluysa ve şifreler eşleşmiyorsa hata döndür
                throw new Error('Şifreniz Aynı Olmalıdır');
              }
              return true;
            })
    ];
};

exports.uyegiris = () => {
    return [
        body('email').isEmail().withMessage("Lütfen Geçerli Bir Email Giriniz"),
        
    ]
}

exports.urunkaydet = () => {
    return [
        body('urunadi','Ürün adınız minimum 5, maksimum 100 karakter olabilir.').isLength({min:5, max:100}),
        body('urunaciklamasi', 'Ürün açıklamanız minimum 100, maksimum 2000 karakter olabilir.').isLength({min:100, max:2000}),
        body('urunfiyati').isNumeric().withMessage('Lütfen Geçerli Bir Ürün Fiyatı Giriniz'),
        body('ihaleBaslangicFiyati').isNumeric().withMessage('Lütfen Geçerli Bir Başlangıç Fiyatı Giriniz Giriniz'),
        body('hemenalfiyati').isNumeric().withMessage('Lütfen Geçerli Bir Hemen Al Fiyatı Giriniz'),
        body('ihaleBaslangicTarihi').isAfter().withMessage('İhale başlangıç tarihi bugünden önce olamaz').custom((value, {req}) => {
            if (new Date(value) > new Date(req.body.ihaleBitisTarihi)) {
                throw new Error('İhale başlangıç tarihi, ihale bitiş tarihinden ileri olamaz.')
            }
            return true;
        }),
        body('ihaleBitisTarihi')
        .isAfter(new Date().toString())
        .withMessage('Lütfen gelecek zaman tarihi giriniz.')
        .custom((value, { req }) => {
          if (new Date(value) < new Date(req.body.ihaleBaslangicTarihi)) {
            throw new Error('İhale bitiş tarihi, ihale başlangıç tarihinden geri bir tarih olmamalıdır.');
          }
          return true;
        })
    ]   
}

exports.teklifver = () => {
    return [
        body('teklifmiktari').notEmpty().withMessage('Lütfen bir fiyat giriniz.').isNumeric().withMessage('.')

    ]
}
