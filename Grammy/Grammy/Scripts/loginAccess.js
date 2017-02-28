﻿//Variable auxiliar para comprobar si existe el usuario.
var contAux = 0;
$(document).ready(function () {
    //Se crea la ventana modal al darle al botón del login
    $("#login").click(function () {
        var dialog = $("#dialog-form").dialog({
            width: 500,
            maxWidth: 500,
            height: 'auto',
            modal: true,
            fluid: true, 
            resizable: false
        });
        dialog.dialog("open");
        thisForm = new Formulario();

    });
    //Se ejecuta cuando la ventana se redimensiona
    $(window).resize(function () {
        fluidDialog();
    });
   //La ventana modal se centra.
    function fluidDialog() {
        var $visible = $(".ui-dialog:visible");
        // each open dialog
        $visible.each(function () {
            var $this = $(this);
            var dialog = $this.find(".ui-dialog-content").data("ui-dialog");
            if (dialog.options.fluid) {
                var wWidth = $(window).width();
                // check window width against dialog width
                if (wWidth < (parseInt(dialog.options.maxWidth) + 50)) {
                    // keep dialog from filling entire screen
                    $this.css("max-width", "90%");
                } else {
                    // fix maxWidth bug
                    $this.css("max-width", dialog.options.maxWidth + "px");
                }
                //reposition dialog
                dialog.option("position", dialog.options.position);
            }
        });

    }
});
function Formulario() {
    this.dialog;
    this.botonLogin = $("#login-submit");
    this.botonRegistro = $("#register-submit");
    this.contenedor = $("#dialog-form");
    this.username = $("#username");
    this.password = $("#password");
    this.emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    this.nombreRegistro = $("#nombre1");
    this.emailRegistro = $("#email1");
    this.usernameRegistro = $("#username1");
    this.fNacimientoRegistro = $("#fNacimiento1");
    this.passwordRegistro = $("#password1");
    //Evento click en el boton del login y del registro.
    this.botonLogin.bind('click', this.buscarUsuario);
    this.botonRegistro.bind('click', this.añadirUsuario);
}
Formulario.prototype.buscarUsuario = function () {

            var that = this;
            $.ajax({
                url: '../api/Clientes',
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                success: function (Clientes) {
                    $.each(Clientes, function (index) {
                        //Busca en todos los registros de la BD
                        if (Clientes[index].Username == $('#username').val() && Clientes[index].Password == $('#password').val()) {
                            var obClient = JSON.stringify(Clientes[index]);
                            //Si el usuario quiere ser recordado en la web se crea un localStorage, sino, un sessionStorae
                            if ($('#remember:checked').length > 0) {
                                contAux++;
                                localStorage.setItem('ClienteLogeado', obClient);
                            }
                            else {
                                contAux++;
                                sessionStorage.setItem('ClienteLogeado', obClient);
                            }
                        }
                    })
                    //Si existe el usuario se ejecuta el Toastr "success", sino "error"
                    if (contAux > 0) {
                        success(); contAux = 0;
                        $("#dialog-form").dialog('close');
                    } else {
                        error();
                    }
                }
            });  
}
//Funcion que registra un usuario nuevo.
Formulario.prototype.añadirUsuario = function () {
    var regExpNombre = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
    var regExpUsername = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
    var regExpFNac = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    var regExpEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    var regExpPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (regExpNombre.test($("#nombre1").val()) && 
        regExpUsername.test($("#username1").val()) &&
        regExpEmail.test($("#email1").val()) &&
        regExpPassword.test($("#password1").val()) &&
        regExpFNac.test($("#fNacimiento1").val())) {
        var that = this;
        var client = { Nombre: $("#nombre1").val(), Email: $("#email1").val(), Username: $("#username1").val(), Password: $("#password1").val(), FechaNacimiento: $("#fNacimiento1").val(), FechaNacimiento: '10/2/2017' };
        $.ajax({
            type: "POST",
            data: JSON.stringify(client),
            url: "../api/Clientes",
            contentType: "application/json",
            success: function (Clientes) {
                successRegistro();
                $("#login-form").delay(100).fadeIn(100);
                $("#register-form").fadeOut(100);
                $('#register-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
            }
        });
    }  
}
//Toastr Error
function error() {
    Command: toastr["error"]("", "No existe ningún usuario en nuestra base de datos con ese nombre, inténtalo de nuevo.")

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}
//Toastr Success
function success() {
    Command: toastr["success"]("¡Bienvenido!", "")

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}
function successRegistro() {
    Command: toastr["success"]("¡Usuario registrado!", "")

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}