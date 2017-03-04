var Puntuaciones = React.createClass({
    getInitialState: function () {
        return {
            listaDiscos: '',
            searchTerm: ''
        }
    },

    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (listaDiscos) {
                this.setState({ listaDiscos });
            }.bind(this)
        });
    },

    puntuar: function (idDisco, nomDis, event) {
        if (!sessionStorage.ClienteLogeado) {
            abrirLogin();
        } else {
            var idCliente = JSON.parse(sessionStorage.ClienteLogeado);
            var obPuntuacion = {
                Idcliente: idCliente.id,
                iddisco: idDisco,
                Puntuacion1: null,
                Fecha: null
            }
            var dataInsert = JSON.stringify(obPuntuacion);
            $.ajax({
                data: dataInsert,
                url: "../api/Puntuaciones/",
                dataType: 'json',
                contentType: "application/json;chartset=utf-8",
                type: "POST",
                success: function () {
                    //alert(a);
                    success("Se ha puntuado el disco " + nomDis);
                }.bind(this)
            });
            event.target.disabled = true;
            event.target.value = "Votado";  
        }

    },
    /*onSearchSubmit: function(event) {
        const searchTerm = this.state.searchTerm;
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();
    },*/
    render () {
        const list = this.state.listaDiscos;
        if(!list){return null;}
        return (
            <Table lista={list} puntuar={this.puntuar} />
            );
}
});

/*var Table = React.createClass({
    render () {
        const lista = this.props.lista;
        const puntuar = this.props.puntuar;
        //const hola = this.props.hola;
        //var aux = {backgroundColor: "red"};
        return (
            <div>
                { lista.map((item) =>
                    <div key={item.IdDisco}>
                        <div className="vote">
                            <div className="titulo">{item.Titulo}</div>
                            <div className="interprete">{item.Interprete.Interprete1}</div>
                            <div>
                              <Button onclick={() => { puntuar(item.IdDisco, item.Titulo, event)  }} className="btVoto">Vote</Button>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        );
}
});*/

var Table = React.createClass({

    /*componentDidMount: function () {
        //console.log(document.getElementById("datosTab"));
        //crearTabla();
        this.hola();
    },*/
    render () {
        const lista = this.props.lista;
        const puntuar = this.props.puntuar;
        //var aux = {backgroundColor: "red"};
        return (
            <table id="datosTab" className="table table-striped table-bordered" cellspacing="0">
                <thead><tr><th>Titulo</th><th>Interprete</th><th>Votar</th></tr></thead>
                <tbody>
                    { lista.map((item) =>

                        <tr>
                            <td className="titulo">{item.Titulo}</td>
                            <td className="interprete">{item.Interprete.Interprete1}</td>
                            <td><Button onclick={() => { puntuar(item.IdDisco, item.Titulo, event)  }} className="btVoto">Vote</Button></td>
                        </tr>
                 )
                    }
                </tbody>
            </table>
        );
}
});

var Button =  React.createClass({
    render() {
        const onClick = this.props.onclick;
        const children = this.props.children;
        const className = this.props.className;
        return(<button onClick={onClick} className={className} typeof="button">{children}</button>);
}
});

/*var Search = React.createClass({
    return () {
        const onSubmit = this.props.onSubmit;
        const children = this.props.children;
        const value = this.props.value;
        <form onSubmit={onSubmit}>
        <input type="text" value={value} />
        <button type="submit">{children}</button>
      </form>
    }
})*/




React.render(<Puntuaciones url="../api/Discos" />, document.getElementById('container'));