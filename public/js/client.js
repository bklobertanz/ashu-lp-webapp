'use strict';

  window.addEventListener('load', function() {

    
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
        fetch('http://157.230.15.186/contacto', params)
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
      $('.nav-link, .navbar-brand, #anchorSaberMas, .btnIrContacto').click(function() {
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