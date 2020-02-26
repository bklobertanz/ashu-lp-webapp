'use strict';

  window.addEventListener('load', function() {
    //active nav items with scroll 

    $(window).scroll(function() {
      var windscroll = $(window).scrollTop();
      if (windscroll >= 100) {
          $('nav').addClass('fixed');
          $('.wrapper section').each(function(i) {
              if ($(this).position().top <= windscroll + 80) {
                  $('nav a.active').removeClass('active');
                  $('nav a').eq(i).addClass('active');
              }
          });
  
      } else {
  
          $('nav').removeClass('fixed');
          $('nav a.active').removeClass('active');
          $('nav a:first').addClass('active');
      }
  
  }).scroll();
    //active clicked li element
     $('.nav-item a').click(function() {
      let liElem = this.parentElement; 
      liElem.classList.add('clicked');
      let clickedSiblings = $('li.clicked').siblings();
      let i; 
      for(i=0; i < clickedSiblings.length; i++){
        clickedSiblings[i].classList.remove('active');
        clickedSiblings[i].classList.remove('clicked');
      }
      liElem.classList.add('active');
    });
    
    //Manejo del evento Submit + manejo de estilos y validación formulario
    
    const form = document.querySelector('form');
    form.onsubmit = enviarFormulario;
      function enviarFormulario(event){
        event.preventDefault();
          if (form.checkValidity()=== false) {
              event.stopPropagation();
          }
          else{
          let formData = new FormData(form);
          
          let params = {
            headers:{
              'Content-type':'application/json'
            },
            body: JSON.stringify({
              nombre: formData.get('inputNombre'),
              apellido: formData.get('inputApellido'),
              celular: formData.get('inputCelular'),
              email: formData.get('inputEmail'),
              necesidad: formData.get('selectNecesidad'),
              comentario: formData.get('textComentariosAdicionales')
            }),
            method: "POST"
        }
        fetch('http://localhost:3000/contacto', params)
        .then(response => response.json())
        .then(data => {
          if(data.success == 'OK'){
            $('#successModal').modal();
          }
        })
        .catch(err => console.log(err))
        }

        form.classList.add('was-validated');
      }
      
      //Scrolling animation
      $('.nav-link, .navbar-brand, #anchorSaberMas').click(function() {
        if(this.className.includes('navbar-brand')){
          $('li.nav-item').removeClass('active');
        }
        let sectionTo = $(this).attr('href');
        $('html, body').animate({
          scrollTop: $(sectionTo).offset().top
        }, 1500,'swing');
    });
      
    //refreshing page after dismissing the modal

    $('#successModal button').click(()=>{
      $('html,body').scrollTop(0);
      window.location.reload();
    });
});