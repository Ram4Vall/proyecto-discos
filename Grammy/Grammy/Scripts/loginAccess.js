$(document).ready(function () {
    $("#login").click(function () {
        console.log("Le he dado al boton de login!");
        var dialog = $("#dialog-form").dialog({
            width: 500, // overcomes width:'auto' and maxWidth bug
            maxWidth: 500,
            height: 'auto',
            modal: true,
            fluid: true, //new option
            resizable: false
        });
        dialog.dialog("open");
        thisForm = new Formulario();

    });

    // on window resize run function
    $(window).resize(function () {
        fluidDialog();
    });

    // catch dialog if opened within a viewport smaller than the dialog width
   //dialog.on("dialogopen", ".ui-dialog", function (event, ui) {
   //     fluidDialog();
   // });

    function fluidDialog() {
        var $visible = $(".ui-dialog:visible");
        // each open dialog
        $visible.each(function () {
            var $this = $(this);
            var dialog = $this.find(".ui-dialog-content").data("ui-dialog");
            // if fluid option == true
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
    this.botonLogin.bind('click', this.buscarUsuario);
    this.botonRegistro.bind('click', this.añadirUsuario);

}
Formulario.prototype.buscarUsuario = function () {
       $.ajax({
        url: '../api/Clientes',
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (Clientes) {
            $.each(Clientes, function (index) {
                if (Clientes[index].Username == $('#username').val() && Clientes[index].Password == $('#password').val()) {
                    //Volver a la pagina principal, cambiar Div "Bienvenido 'nombre'
                    console.log("addeventLogin");
                    var obClient = JSON.stringify(Clientes[index]);
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
            if (contAux > 0) {
                success(); contAux = 0;
                $("#dialog-form").dialog('close');
            } else {
                error();
            }
        }
    });
}
Formulario.prototype.añadirUsuario = function () {
    var that = this;
    var client = { Nombre:$("#nombre1").val(), Email: $("#email1").val(), Username: $("#email1").val(), Password: $("#password1").val(), FechaNacimiento: $("#fNacimiento1").val(),FechaNacimiento: '10/2/2017' };
    console.log(client);

    $.ajax({
        type: "POST",
        data: JSON.stringify(client),
        url: "../api/Clientes",
        contentType: "application/json",
        success: function (Clientes) {
            console.log(Clientes);
        }


    });
}
    
var contAux = 0;
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