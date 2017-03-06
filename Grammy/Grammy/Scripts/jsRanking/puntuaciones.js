function puntuar(idDisco, nomDis, event) {
    //Comprobamos que se ha logueado un usuario
    if (!sessionStorage.ClienteLogeado) {
        abrirLogin();
    } else {
        var idCliente = JSON.parse(sessionStorage.ClienteLogeado);
        //Se crea el objeto puntuación para ser insertado en  la BD
        var obPuntuacion = {
            Idcliente: idCliente.id,
            iddisco: idDisco,
            Puntuacion1: null,
            Fecha: null
        }
        //Convertimos el objeto a json
        var dataInsert = JSON.stringify(obPuntuacion);
        //Enviamos la puntuación
        $.ajax({
            data: dataInsert,
            url: "../api/Puntuaciones/",
            dataType: 'json',
            contentType: "application/json;chartset=utf-8",
            type: "POST",
            success: function () {
                //Muestra una etiqueta si todo fue bien
                success("Se ha puntuado el disco " + nomDis);
                //chart.loadCharts();
                loadCharts();
            }//.bind(this)
        });
        //Desabilita el botón para no volver a puntuar
        event.target.disabled = true;
        event.target.innerText = "Votado";
        event.target.style.opacity = 0.5;
    }

}