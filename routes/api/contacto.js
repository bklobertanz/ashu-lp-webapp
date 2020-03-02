const express = require('express');
const router = express.Router(); 
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

router.post('/',[

    check('nombre')
    .not().isEmpty().withMessage('Nombre no puede estar vacío.')
    .isLength({
      min: 3
    }).withMessage('Nombre no puede contener menos de 3 caracteres.')
    .isAlpha('es-ES').withMessage('Nombre no puede contener números o caracteres especiales.'),

    check('apellido')
    .not().isEmpty().withMessage('Apellido no puede estar vacio.')
    .isLength({
      min: 3
    }).withMessage('Apellido no puede contener menos de 3 caracteres.')
    .isAlpha('es-ES').withMessage('Apellido no puede contener números o caracteres especiales.'),

    check('celular')
    .not().isEmpty().withMessage('Celular no puede estar vacio.')
    .isNumeric([true]).withMessage('Celular no puede contener letras o caracteres especiales.')
    .isLength({
      min:8,
      max:8
    }).withMessage('Celular debe contener 8 dígitos.'),

    check('email')
    .isEmail().withMessage('Ha ingresado un email inválido.'),

    check('comentario').escape()

], (req,res) => {
    
    const errors = validationResult(req); 

    if(!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array()
      })
    }
    //Formulario validado

    res.status(202).json({
      success: 'OK'
  })
  //por hacer: Formateo y sanitizado para correo y bd 

        if (req.body.comentario.length == 0){
                req.body.comentario = '-'
        }

        //Enviar email via Nodemailer
        let transporter = nodemailer.createTransport({
                service: "gmail", 
                auth: {
                  user: process.env.EMAIL, // generated ethereal user
                  pass: process.env.PASSWORD// generated ethereal password
                }
              });

        let mailOptions ={
                from: process.env.EMAIL,
                to: process.env.EMAILDEST,
                subject: `Solicitud de contacto generada desde ${process.env.PAGINAWEB}`,
                html:`<h1>Solicitud de contacto</h1>
                      <h2>Por favor, contactarse lo más pronto posible con el interesado!</h2>
                      <p>Datos del futuro cliente:</p> 
                      <ul>
                        <li>Nombre: ${req.body.nombre}.</li>
                        <li>Apellido: ${req.body.apellido}.</li>
                        <li>Celular: ${req.body.celular}.</li>
                        <li>Email: ${req.body.email}.</li>
                        <li>Necesidad: ${req.body.necesidad}.</li>
                        <li>Comentario adicional: ${req.body.comentario}.</li>
                      </ul>
                      <p> Que tengas un buen día :D </p>
                 `
        };
       transporter.sendMail(mailOptions,(err,data)=>{
                if(err){
                  console.log('Ocurrió un error');
                }else {
                  console.log('Email enviado!');
                }
        
        });
        
});

module.exports = router;