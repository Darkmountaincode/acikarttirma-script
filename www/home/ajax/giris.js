function yorumekle() {
    var selectedRating = $('input[name="yildiz"]:checked').val();
    var data = {
        yorumbilgisi: $('#yorumbilgisi').val(),
        yildizbilgisi: selectedRating,
        urunId : $('#urunId').val(),
    }
    console.log(data);
    $.ajax({
        url:'/yorumekle',
        method:'POST',
        data:data,
        success: function(response) {
            Swal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: 'Tebrikler Bilgileriniz Güncellendi',
                showConfirmButton: false,
                timer: 3000
            });
          
            setTimeout(() => {
                location.reload();
            }, 3000);
        },
        error: function(error) {
            var errorResponse = JSON.parse(error.responseText);
            if (errorResponse.errors) {
                // Hata mesajı varsa göster
                var errorMessage = errorResponse.errors.join(' ');
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: errorMessage,
                    showConfirmButton: false,
                    timer: 6000
                });
            } else {
                // Hata mesajı yoksa genel bir hata mesajı göster
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: 'Bir Hata Oluştu',
                    showConfirmButton: false,
                    timer: 6000
                });
            }
        }
    });
    }

$('#yorumekle').on('submit', function(event) {
    event.preventDefault();
    yorumekle();
});
      


function hesapdetay(){
    var data = {
        uyead:$('#uyead').val(),
        uyesoyad:$('#uyesoyad').val(),
        uyetel:$('#uyetel').val(),
        uyemail:$('#uyemail').val(),
        eskisifre:$('#eskisifre').val(),
        yenisifre:$('#yenisifre').val(),
        yenisifretekrar:$('#yenisifretekrar').val(),
        adres:$('#adres').val(),
        Iller:$('#Iller').val(),
        Ilceler:$('#Ilceler').val(),
        postakodu:$('#postakodu').val()
    }
    $.ajax({
        url:'/hesapdetay',
        method:'POST',
        data:data,
        success: function(response) {
            Swal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: 'Tebrikler Bilgileriniz Güncellendi',
                showConfirmButton: false,
                timer: 3000
            });
          
            setTimeout(() => {
                location.reload();
            }, 3000);
        },
        error: function(error) {
            var errorResponse = JSON.parse(error.responseText);
            if (errorResponse.errors) {
                // Hata mesajı varsa göster
                var errorMessage = errorResponse.errors.join(' ');
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: errorMessage,
                    showConfirmButton: false,
                    timer: 6000
                });
            } else {
                // Hata mesajı yoksa genel bir hata mesajı göster
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: 'Bir Hata Oluştu',
                    showConfirmButton: false,
                    timer: 6000
                });
            }
        }
    });
    }

    $('#hesapdetay').on('submit', function(event) {
        event.preventDefault();
        hesapdetay();
      });
      


function teklifver(){
    var data = {
        teklifmiktari:$('#teklifmiktari').val(),
        urunId:$('#urunId').val()
    };
    $.ajax({
        url:'/teklifver',
        method:'POST',
        data:data,
        success: function(response) {
            Swal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: 'Başarıyla Teklif Verdiniz Tebrikler',
                showConfirmButton: false,
                timer: 3000
            });
            setTimeout(() => {
                location.reload();
            }, 4000);
        },
        error: function(error) {
            var errorResponse = JSON.parse(error.responseText);
            if (errorResponse.errors) {
                // Hata mesajı varsa göster
                var errorMessage = errorResponse.errors.join(' ');
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: errorMessage,
                    showConfirmButton: false,
                    timer: 6000
                });
            } else {
                // Hata mesajı yoksa genel bir hata mesajı göster
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: 'Bir Hata Oluştu',
                    showConfirmButton: false,
                    timer: 6000
                });
            }
        }
    });
    }
    

    $('#teklifim').on('submit', function(event) {
        event.preventDefault();
        teklifver();
      });
      



function urunkaydet() {
    var form = new FormData();
    form.append('urunadi', $('#urunadi').val()); 
    form.append('urunkategori', $('#urunkategori').val());    
    form.append('urunaciklamasi', $('#editor').val());
    form.append('urunanahtarkelimesi', $('#tags').val());
    form.append('urunfiyati', $('#urunfiyati').val());
    form.append('ihaleBaslangicFiyati', $('#ihaleBaslangicFiyati').val());
    form.append('ihaleBaslangicTarihi', $('#ihaleBaslangicTarihi').val());
    form.append('ihaleBitisTarihi', $('#ihaleBitisTarihi').val());
    form.append('kullaniciId', $('#kullaniciId').val());
    form.append('hemenalfiyati', $('#hemenalfiyati').val());

    
    var files = $('#file-input')[0].files; // Seçilen dosyaların listesi
    
    for (var i = 0; i < files.length; i++) {
      form.append('urungorsel', files[i]); // Her bir dosyayı FormData'ya ekle
    }

    $.ajax({
        url: 'urunkaydet',
        method: 'POST',
        data: form,
        processData: false,
        contentType: false,
        success: function(response) {
          Swal.fire({
            icon: 'success',
            title: 'Ürün eklendi!',
            text: 'Ürünlerime yönlendiriliyorsunuz!',
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(() => {
           window.location.href = "/hesabim";
          }, 4000);
        },
        error: function(error) {
          var errorResponse = JSON.parse(error.responseText);
          var errorMessage = errorResponse.erorrs; // Hata mesajını al
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: errorMessage.join(' '),
            showConfirmButton: false,
            timer: 4000
          });
        }
      });
    }
$('#urunekle').on('submit', function(event){
    event.preventDefault();
    urunkaydet();
});




function uyekayit() {
    var data = {
        ad: $('#ad').val(),
        soyad: $('#soyad').val(),
        emails: $('#emails').val(),
        tel: $('#tel').val(),
        sifres: $('#sifres').val(),
        resifres: $('#resifres').val()
    };
    $.ajax({
        url: 'uyekayit',
        method: 'POST',
        data: data,
        success: function(response) {
            Swal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: 'Kayıt Başarılı Tebrikler Giriş Yapabilirsiniz.',
                showConfirmButton: false,
                timer: 4000
            });
            setTimeout(() => {
                location.reload();
            }, 4000);
        },
        error: function(error) {
            var errorResponse = JSON.parse(error.responseText);
            var errorMessage = errorResponse.erorrs; // Hata mesajını al
            Swal.fire({
                icon: 'error',
                title: 'Hata',
                text: errorMessage.join(' '),
                showConfirmButton: false,
                timer: 6000
            });
        }
        
    });
}

$('#uyekayit').on('submit', function(event) {
    event.preventDefault();
    uyekayit();
});

function uyegiris() {
    var data ={
        email: $('#email').val(),
        sifre:$('#sifre').val(),

    };
$.ajax({
    url: 'uyegiris',
    method: 'POST',
    data: data,
    success: function(response) {
        Swal.fire({
            icon: 'success',
            title: 'Başarılı',
            text: 'Giriş Başarılı Yönlendiriliyorsunuz',
            showConfirmButton: false,
            timer: 3000
        });
        setTimeout(() => {
            window.location.href = "/";
        }, 4000);
    },
    error: function(error) {
        var errorResponse = JSON.parse(error.responseText);
        if (errorResponse.errors) {
            // Hata mesajı varsa göster
            var errorMessage = errorResponse.errors.join(' ');
            Swal.fire({
                icon: 'error',
                title: 'Hata',
                text: errorMessage,
                showConfirmButton: false,
                timer: 6000
            });
        } else {
            // Hata mesajı yoksa genel bir hata mesajı göster
            Swal.fire({
                icon: 'error',
                title: 'Hata',
                text: 'Bir Hata Oluştu',
                showConfirmButton: false,
                timer: 6000
            });
        }
    }
});
}
$('#uyegiris').on('submit', function(event) {
    event.preventDefault();
    uyegiris();
  });