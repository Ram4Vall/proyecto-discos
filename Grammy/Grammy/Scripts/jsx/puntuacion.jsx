//Componente que renderiza las puntuaciones de discos
var Puntuaciones = React.createClass({
    //Se inicia el estado con la lista vacia
    getInitialState: function () {
        return {
            listaDiscos: ''
        }
    },

    //Petición al API REST de los discos [GET]
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (listaDiscos) {
                this.setState({ listaDiscos });
                loadCharts();
            }.bind(this)
        });
        
    },

    //Función que me permite puntuar un disco mediante una petición ajax al API REST [POST]
    puntuar: function (idDisco, nomDis, event) {
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
                }.bind(this)
            });
            //Desabilita el botón para no volver a puntuar
            event.target.disabled = true;
            event.target.value = "Votado";
        }

    },

    //Renderiza una tabla con los datos
    render () {
        const list = this.state.listaDiscos;
        if(!list){return null;}
        return (
            <Table lista={list} puntuar={this.puntuar} />
            );
}
});

//Componente que renderiza la tabla usando la lista
var Table = React.createClass({
    componentDidMount: function () {
        //Usa el pluggin DataTable para crear una tabla más bonita
        $("#datosTab").DataTable();
        function miFuncion() { $(".btVoto").click(function (e) {
            var butMe = e.target;
            puntuar(butMe.id, butMe.name, e);
        });}

        miFuncion();
        $("#datosTab").on( 'draw.dt', function () {
            miFuncion();
        } );
    },
    render () {
        const lista = this.props.lista;
        const puntuar = this.props.puntuar;
        return (
            <table id="datosTab" className="table table-striped table-bordered" cellspacing="0">
                <thead><tr><th>Titulo</th><th>Interprete</th><th>Votar</th></tr></thead>
                <tbody>
                    { lista.map((item) =>

                        <tr>
                            <td className="titulo">{item.Titulo}</td>
                            <td className="interprete">{item.Interprete.Interprete1}</td>
                            <td><Button name={item.Titulo} id={item.IdDisco} className="btVoto">Vote</Button></td>
                        </tr>
                    )//onclick={() => { puntuar(item.IdDisco, item.Titulo, event)  }}
                    }
                </tbody>
            </table>
        );
}
});

//Renderiza el botón que puntua el disco
var Button = React.createClass({
    render() {
        const onClick = this.props.onclick;
        const children = this.props.children;
        const className = this.props.className;
        const name = this.props.name;
        const id = this.props.id;
        return (<button name={name} id={id}  className={className} typeof="button">{children}</button>);
}
});

React.render(<Puntuaciones url="../api/Discos" />, document.getElementById('container'));//Se ejecuta el render