//Variable auxiliar para comprobar si existe el usuario.
var contAux = 0;
$(document).ready(function () {
    //Se crea la ventana modal al darle al botón del login
    $("#login").click(function () {

        abrirLogin();

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
    this.botonLogout = $("#loginOut");
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
    this.botonLogout.bind('click', this.logout);
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
                        $("#userLogin").css("display", "block");
                        $("#login").css("display", "none");
                        $("#loginOut").css("display", "block");
                        $('#userLogin').text("Bienvenido " + $('#username').val());
                        localStorage.setItem('ClienteLogeado', obClient);
                    }
                    else {
                        $("#userLogin").css("display", "block");
                        $("#login").css("display", "none");
                        $("#loginOut").css("display", "block");
                        $('#userLogin').text("Bienvenido " + $('#username').val());
                        contAux++;
                        sessionStorage.setItem('ClienteLogeado', obClient);
                    }
                }
            })
            //Si existe el usuario se ejecuta el Toastr "success", sino "error"
            if (contAux > 0) {
                success("¡Bienvenido!"); contAux = 0;
                $("#dialog-form").dialog('close');
            } else {
                error("No existe ningún usuario en nuestra base de datos con ese nombre, inténtalo de nuevo.");
            }
        }
    });
}
//Funcion que registra un usuario nuevo.
Formulario.prototype.añadirUsuario = function () {
    var count = 0;
    if ($("#nombre1").valid() && $("#email1").valid() && $("#username1").valid() && $("#password1").valid() && $("#fNacimiento1").valid()) {
        var client = { Nombre: $("#nombre1").val(), Email: $("#email1").val(), Username: $("#username1").val(), Password: $("#password1").val(), FechaNacimiento: $("#fNacimiento1").val(), FechaNacimiento: '10/2/2017' };
        $.ajax({
            type: "POST",
            data: JSON.stringify(client),
            url: "../api/Clientes",
            contentType: "application/json",
            success: function (Clientes) {
                success("¡Usuario registrado!");
                $("#login-form").delay(100).fadeIn(100);
                $("#register-form").fadeOut(100);
                $('#register-form-link').removeClass('active');
                $(this).addClass('active');

            }
        });
    } else {
        count++;
        if (count < 2) { error("Error") };
    }

}
Formulario.prototype.logout = function () {
    localStorage.removeItem('ClienteLogeado');
    sessionStorage.removeItem('ClienteLogeado');
    $("#loginOut").css("display", "none");
    $("#login").css("display", "block");
    $("#userLogin").css("display", "none");

}
//Toastr Error
function error(eMensaje) {
    toastr.options = {
        "maxOpened": 1,
        "preventDuplicates": true,
        "preventOpenDuplicates": true,
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    Command: toastr["error"]("", eMensaje)
}
//Toastr Success
function success(mensaje) {
    toastr.options = {
        "maxOpened": 1,
        "preventDuplicates": true,
        "preventOpenDuplicates": true,
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    Command: toastr["success"](mensaje, "")


}

//open login/register modal form
function abrirLogin() {
    var dialog = $("#dialog-form").dialog({
        width: 280,
        maxWidth: 280,
        height: 'auto',
        modal: true,
        fluid: true,
        resizable: false
    });
    dialog.dialog("open");
    thisForm = new Formulario();
}
