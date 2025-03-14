document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement){
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            })
        }
    });
});

document.querySelector('.logo').addEventListener('click', function(e) {
     e.preventDefault();
     window.scrollTo({top :0 , behavior :'smooth' });
});

//-------------------------------------VALIDACIONES FORMULARIO--------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formularioContacto');
    const mensajesError = {
        nombre: {
            required: 'Ingresa tu nombre',
            minlength: 'El nombre debe tener al menos 2 caracteres',
            maxlength: 'El nombre no puede tener más de 50 caracteres'
        },

        telefono: {
            required: 'Ingresa tu teléfono',
            pattern: 'Ingresa un número de teléfono válido de 10 dígitos'
        },

        ubicacion: {
            required: 'Ingresa tu ubicación',
            minlength: 'La ubicación debe tener al menos 3 caracteres',
            maxlength: 'La ubicación no puede tener más de 100 caracteres'
        },

        email: {
            required: 'Ingresa tu email',
            invalid: 'Ingresa un email válido, por favor'
        },

        mensaje: {
            required: 'Ingresa tu mensaje',
            minlength: 'El mensaje debe tener al menos 10 caracteres',
            maxlength: 'El mensaje no puede tener más de 500 caracteres'
        }
    };

    function mostrarError(input, mensaje) {
        const errorSpan = document.getElementById(`${input.id}-error`);
        errorSpan.textContent = mensaje;
        input.classList.add('error');
    }

    function limpiarError(input) {
        const errorSpan = document.getElementById(`${input.id}-error`);
        errorSpan.textContent = '';
        input.classList.remove('error');
    }

    function validarNombre(input) {
        if (input.value.length < 2) {
            mostrarError(input, mensajesError.nombre.minlength);
            return false;
        }
        return true;
    }

    function validarTelefono(input) {
        const telefonoRegex = /^[0-9]{10}$/;
        if (!telefonoRegex.test(input.value)) {
            mostrarError(input, mensajesError.telefono.pattern);
            return false;
        }
        return true;
    }

    function validarEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            mostrarError(input, mensajesError.email.invalid);
            return false;
        }
        return true;
    }

    function validarMensaje(input) {
        if (input.value.length < 10) {
            mostrarError(input, mensajesError.mensaje.minlength);
            return false;
        }
        return true;
    }

    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            limpiarError(input);
        });

        input.addEventListener('blur', function() {
            if (!input.value) {
                mostrarError(input, mensajesError[input.id].required);
                return;
            }

            switch(input.id) {
                case 'nombre':
                    validarNombre(input);
                    break;
                case 'telefono':
                    validarTelefono(input);
                    break;
                case 'email':
                    validarEmail(input);
                    break;
                case 'mensaje':
                    validarMensaje(input);
                    break;
            }
        });
    });

    form.addEventListener('submit', function(e) {
        let esValido = true;
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            if (!input.value) {
                mostrarError(input, mensajesError[input.id].required);
                esValido = false;
                return;
            }
            switch(input.id) {
                case 'nombre':
                    if (!validarNombre(input)) esValido = false;
                    break;
                case 'telefono':
                    if (!validarTelefono(input)) esValido = false;
                    break;
                case 'email':
                    if (!validarEmail(input)) esValido = false;
                    break;
                case 'mensaje':
                    if (!validarMensaje(input)) esValido = false;
                    break;
            }
        });

        if (!esValido) {
            e.preventDefault();
        }
    });
});
