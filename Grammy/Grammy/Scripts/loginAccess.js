function searchClient() {
   
    $.ajax({
        url: '../api/Clientes',
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (Clientes) {
            $.each(Clientes, function (index) {
                if (Clientes[index].Username == $('#username').val() && Clientes[index].Password == $('#password').val()) {
                    //Volver a la pagina principal, cambiar Div "Bienvenido 'nombre'
                    var obClient = JSON.stringify(Clientes[index]);
                    localStorage.setItem('ClienteLogeado', obClient);
                }
            })
        }
    });
}

function searchClient() {
    var client = { Email: $("#email1").val(), Username: $("#email1").val(), Password: $("#password1").val() };
    $.ajax({
        type: "POST",
        data: JSON.stringify(client),
        url: "../api/Clientes",
        contentType: "application/json",
        success: function (Clientes) {
            $.each(Clientes, function (index) {
                console.log(Clientes[index]);
            }
            )
        }


    });
}