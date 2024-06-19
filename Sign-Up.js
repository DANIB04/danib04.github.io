$(function() {
    $("form").attr('novalidate', 'novalidate');
    
    $('.panel__link, .form__retrieve-pass').on('click', function(e) {
        e.preventDefault();
        if ($(this).attr('href') === '#password-form') {
            $('.panel__header').removeClass('active');
        } else {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
        }
        target = $(this).attr('href');
        $('.panel__forms > form').not(target).hide();
        $(target).fadeIn(500);
    });

    $('.panel__prev-btn').on('click', function(e) {
        $('.panel, .panel_blur').fadeOut(300);
    });

    const authorizedUsers = {
        'Dani': '1234',
        'usuario2': 'contraseña2',
        // Añadir más usuarios autorizados aquí
    };

    // Redirigir al hacer submit en el formulario si las credenciales son correctas
    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        
        const username = $('#login-user').val();
        const password = $('#password').val();
        
        if (authorizedUsers[username] && authorizedUsers[username] === password) {
            window.location.href = "https://www.youtube.com"; // URL de redirección a YouTube
        } else {
            alert('Invalid credentials');
        }
    });
    
    $.validate({
        modules : 'security',
        errorMessageClass: 'form__error',
        validationErrorMsgAttribute: 'data-error'
    });
});
