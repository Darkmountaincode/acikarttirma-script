function odemebilgileri() {
  var data = {
    odemetipi: $('#odemetipi').val(),
    komisyon: $('#komisyon').val(),
    minodeme: $('#minodeme').val(),
    maxodeme: $('#maxodeme').val(),
    marketId: $('#marketId').val(),
    marketkey: $('#marketkey').val(),
    marketsalt: $('#marketsalt').val()
  };
 console.log(data)
  $.ajax({
    url:'odemedurumu',
    method:'POST',
    data:data,
    success: function(response) {
      Swal.fire({
        icon: 'success',
        title: 'Başarılı',
        text: 'Güncelleme başarıyla tamamlandı.',
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

$('#odemedurum').on('submit', function(event) {
  event.preventDefault();
  odemebilgileri();
})
function siteDurumKontrol() {
  var data = {
    ihaledurum: $('#ihaledurum option:selected').val(),
    uyelikdurum: $('#uyelikdurum option:selected').val(),
    bakimdurum: $('#bakimdurum option:selected').val()
  
  };
  

  $.ajax({
    url: 'sitedurumguncelle',
    method: 'POST',
    data: data,
    success: function(response) {
      Swal.fire({
        icon: 'success',
        title: 'Başarılı',
        text: 'Güncelleme başarıyla tamamlandı.',
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

// Form gönderildiğinde Ajax isteğini tetikleyen event listener
$('#sitedurumguncelle').on('submit', function(event) {
  event.preventDefault();
  siteDurumKontrol();
});




$('form[id^="uyelist"]').on('submit', function(event) {
  event.preventDefault();
  var formId = $(this).attr('id');
  var data = {
    uyeadi: $('#' + formId + ' #uyeadi').val(),
    uyesoyadi: $('#' + formId + ' #uyesoyadi').val(),
    uyemail: $('#' + formId + ' #uyemail').val(),
    uyebakiye: $('#' + formId + ' #uyebakiye').val(),
    bandurumu: $('#' + formId + ' #bandurumu option:selected').val(),
    admin: $('#' + formId + ' #admin option:selected').val(),
    uyetel: $('#' + formId + ' #uyetel').val(),
    uyeadres: $('#' + formId + ' #uyeadres').val(),
    uyeil: $('#' + formId + ' #uyeil').val(),
    uyeilce: $('#' + formId + ' #uyeilce').val(),
    uyecinsiyet: $('#' + formId + ' #uyecinsiyet').val(),
    uyeId: $('#' + formId + ' #uyeId').val()
  }
  console.log(data);
  $.ajax({
    url: 'uyeguncelle',
    method: 'POST',
    data: data,
    success: function(response) {
      Swal.fire({
        icon: 'success',
        title: 'Başarılı',
        text: 'Üye Güncellemesi Başarıyla Tamamlanmıştır..',
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
          timer: 3000
        });
      } else {
        // Hata mesajı yoksa genel bir hata mesajı göster
        Swal.fire({
          icon: 'error',
          title: 'Hata',
          text: 'Bir Hata Oluştu',
          showConfirmButton: false,
          timer: 3000
        });
      }
    }
  });
});
$('#uyelist').on('submit', function(event) {
  event.preventDefault();
  uyelist();
});





function kategoriekle() {
  var data = {
    kategoriadi:$('#kategoriadi').val(),
    kategoriaciklama:$('#kategoriaciklama').val()
  }

  $.ajax({
    url:'kategoriekle',
    method: 'POST',
    data:data,
    success:function(response){
      Swal.fire({
        icon:'success',
        title:'Başarılı',
        text:'Kategori Başarıyla Kayıt Edilmiştir.',
        showConfirmButton:false,
        timer:3000
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
              timer: 3000
          });
      } else {
          // Hata mesajı yoksa genel bir hata mesajı göster
          Swal.fire({
              icon: 'error',
              title: 'Hata',
              text: 'Bir Hata Oluştu',
              showConfirmButton: false,
              timer: 3000
          });
      }
  }
});
}
$('#kategoriekle').on('submit', function(event) {
  event.preventDefault();
  kategoriekle();
});

 

function altkategoriekle() {
  var data = {
    kategoriId:$('#kategoriId option:selected').val(),
    altkategoriadi:$('#altkategoriadi').val(),
  }
  console.log(data);

  $.ajax({
    url:'altkategoriekle',
    method: 'POST',
    data:data,
    success:function(response){
      Swal.fire({
        icon:'success',
        title:'Başarılı',
        text:'Kategori Başarıyla Kayıt Edilmiştir.',
        showConfirmButton:false,
        timer:3000
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
              timer: 3000
          });
      } else {
          // Hata mesajı yoksa genel bir hata mesajı göster
          Swal.fire({
              icon: 'error',
              title: 'Hata',
              text: 'Bir Hata Oluştu',
              showConfirmButton: false,
              timer: 3000
          });
      }
  }
});
}

$('#altkategoriekle').on('submit', function(event) {
  event.preventDefault();
  altkategoriekle();
});

function nadminlogin() {
  var data = {
    email:$('#email').val(),
    sifre:$('#sifre').val()
  }

  $.ajax({
    url:'nadminlogin',
    method:'POST',
    data:data,
    success:function(response){
      Swal.fire({
        icon:'success',
        title:'Başarılı',
        text:'Giriş Başarılı Yönlendiriliyorsunuz',
        showConfirmButton:false,
        timer:4000
      });
      setTimeout(() => {
        window.location.href="/nadminpanel"
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
              timer: 3000
          });
      } else {
          // Hata mesajı yoksa genel bir hata mesajı göster
          Swal.fire({
              icon: 'error',
              title: 'Hata',
              text: 'Bir Hata Oluştu',
              showConfirmButton: false,
              timer: 3000
          });
      }
  }
});
}

$('#nadminlogin').on('submit', function(event) {
  event.preventDefault();
  nadminlogin();
})


function slideguncelle() {
  var formData = new FormData();

  formData.append('slideurunadi', $('#slideurunadi').val());
  formData.append('slidealtadi', $('#slidealtadi').val());
  formData.append('slidebaslangicfiyati', $('#slidebaslangicfiyati').val());
  formData.append('slideindirimlifiyati', $('#slideindirimlifiyati').val());
  formData.append('slideindirimorani', $('#slideindirimorani').val());
  formData.append('slideId', $('#slideId').val());
  formData.append('slidelinki', $('#slidelinki').val());
  formData.append('slidegorsel', $('#slidegorsel')[0].files[0]);
  $.ajax({
    url: 'slideguncelle',
    method: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
       Swal.fire({
        icon: 'success',
        title: 'Başarılı',
        text: 'Güncelleme başarıyla tamamlandı.',
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(function() {
        location.reload(); // Sayfayı yenile
      }, 3000);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

// Form gönderildiğinde Ajax isteğini tetikleyen event listener
$('#slideguncelle').on('submit', function(event) {
  event.preventDefault();
  slideguncelle();
});




function siteBilgiGuncelle() {
  var formData = new FormData();
  var anahtar = $('input[name="anahtar"]').val();
  formData.append('baslik', $('#baslik').val());
  formData.append('aciklama', $('#aciklama').val());
  formData.append('anahtar', anahtar);
  formData.append('logo', $('#logo')[0].files[0]);
  formData.append('favicon', $('#favicon')[0].files[0]);
  $.ajax({
    url: 'sitekaydet',
    method: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
       Swal.fire({
        icon: 'success',
        title: 'Başarılı',
        text: 'Güncelleme başarıyla tamamlandı.',
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(function() {
        location.reload(); // Sayfayı yenile
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
              timer: 3000
          });
      } else {
          // Hata mesajı yoksa genel bir hata mesajı göster
          Swal.fire({
              icon: 'error',
              title: 'Hata',
              text: 'Bir Hata Oluştu',
              showConfirmButton: false,
              timer: 3000
          });
      }
    }
  });
}

function bankahesaplari() {
  var data = {
    bankaadi:$('#bankaadi').val(),
    bankahesapadsoyad:$('#bankahesapadsoyad').val(),
    ibanno:$('#ibanno').val(),
    subekodu:$('#subekodu').val(),
    hesapno:$('#hesapno').val(),
    bankaaciklama:$('#bankaaciklama').val(),
    bankaislemsonucu:$('#bankaislemsonucu').val(),

  }
  $.ajax({
    url:'havalekaydet',
    method:'POST',
    data:data,
    success: function(response) {
      Swal.fire({
       icon: 'success',
       title: 'Başarılı',
       text: 'Güncelleme başarıyla tamamlandı.',
       showConfirmButton: false,
       timer: 3000
     });
     setTimeout(function() {
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
             timer: 3000
         });
     } else {
         // Hata mesajı yoksa genel bir hata mesajı göster
         Swal.fire({
             icon: 'error',
             title: 'Hata',
             text: 'Bir Hata Oluştu',
             showConfirmButton: false,
             timer: 3000
         });
     }
   }
 });
}
$('#havalekaydet').on('submit', function(event) {
  event.preventDefault();
  bankahesaplari();
});


function anasayfaOzellikGuncelle() {
  var data = {
    ozellik1:$('#ozellik1').val(),
    ozellik2:$('#ozellik2').val(),
    ozellik3:$('#ozellik3').val(),
    ozellik4:$('#ozellik4').val(),
    ozellik5:$('#ozellik5').val(),
    altozellik1:$('#altozellik1').val(),
    altozellik2:$('#altozellik2').val(),
    altozellik3:$('#altozellik3').val(),
    altozellik4:$('#altozellik4').val(),
    altozellik5:$('#altozellik5').val(),
    magazabilgileri:$('#magazabilgileri').val(),
    telefonbilgileri:$('#telefonbilgileri').val(),
    adresbilgileri:$('#adresbilgileri').val(),
    copyright:$('#copyright').val(),
    misyonbilgileri:$('#misyonbilgileri').val(),
  }
  console.log(data);
  $.ajax({
    url: 'ozellikKaydet', 
    method: 'POST',
    data: data,
    success: function(response) {
       Swal.fire({
        icon: 'success',
        title: 'Başarılı',
        text: 'Güncelleme başarıyla tamamlandı.',
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(function() {
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
              timer: 3000
          });
      } else {
          // Hata mesajı yoksa genel bir hata mesajı göster
          Swal.fire({
              icon: 'error',
              title: 'Hata',
              text: 'Bir Hata Oluştu',
              showConfirmButton: false,
              timer: 3000
          });
      }
    }
  });
}

$('#ozellikKaydet').on('submit', function(event) {
  event.preventDefault();
  anasayfaOzellikGuncelle();
});


// Form gönderildiğinde Ajax isteğini tetikleyen event listener
$('#sitekaydet').on('submit', function(event) {
  event.preventDefault();
  siteBilgiGuncelle();
});

function sil(id) {
  if (confirm('Silmek istediğinize emin misiniz?')) {
    $.ajax({
      url: 'kategoriler/kategorisil/' + id,
      type: 'DELETE',
      success: function(result) {
        Swal.fire({
        title: 'Başarılı!',
        text: 'Silme işlemi başarıyla tamamlandı.',
        icon: 'success',
        confirmButtonText: 'Tamam'
      }).then(function() {
        window.location.reload();
       });
      },
      error: function(err) {
        console.error('Silme işlemi hatası', err);
      }
    });
  }
}

function sil(id) {
  if (confirm('Silmek istediğinize emin misiniz?')) {
    $.ajax({
      url: 'altkategori/altkategorisil/' + id,
      type: 'DELETE',
      success: function(result) {
        Swal.fire({
        title: 'Başarılı!',
        text: 'Silme işlemi başarıyla tamamlandı.',
        icon: 'success',
        confirmButtonText: 'Tamam'
      }).then(function() {
        window.location.reload();
       });
      },
      error: function(err) {
        console.error('Silme işlemi hatası', err);
      }
    });
  }
}

function sil(id) {
  if (confirm('Silmek istediğinize emin misiniz?')) {
    $.ajax({
      url: 'urunler/urunsil/' + id,
      type: 'DELETE',
      success: function(result) {
        Swal.fire({
        title: 'Başarılı!',
        text: 'Silme işlemi başarıyla tamamlandı.',
        icon: 'success',
        confirmButtonText: 'Tamam'
      }).then(function() {
        window.location.reload();
       });
      },
      error: function(err) {
        console.error('Silme işlemi hatası', err);
      }
    });
  }
}

$("#kategori").change(function() {
  var kategoriId = $(this).val();

  $.ajax({
    url: "/getAltKategoriler",
    type: "GET",
    data: { kategoriId: kategoriId },
    success: function(response) {
      var altKategoriler = response.altKategoriler;
      var altKategoriSelect = $("#alt_kategori");

      altKategoriSelect.empty();
      altKategoriSelect.append($('<option>', {
        value: '',
        text: 'Seçin'
      }));

      altKategoriler.forEach(function(element) {
        altKategoriSelect.append($('<option>', {
          value: element._id,
          text: element.altkategoriadi
        }));
      });

      // Seçilen alt kategoriyi koruma
      var selectedAltKategori = altKategoriSelect.data('selected');
      if (selectedAltKategori) {
        altKategoriSelect.val(selectedAltKategori);
      }
    },
    error: function(xhr, status, error) {
      console.log(error);
    }
  });
});

// Alt kategori seçildiğinde değeri kaydetme
$("#alt_kategori").change(function() {
  var selectedAltKategori = $(this).val();
  $(this).data('selected', selectedAltKategori);
});