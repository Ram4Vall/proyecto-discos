var Puntuaciones = React.createClass({
    getInitialState: function () {
        return {listaDiscos:''}
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

    puntuar: function (idDisco) {
        if (!sessionStorage.ClienteLogeado) {
            alert("Hola");
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
                success: function (a) {
                    alert(a);
                }.bind(this)
            });
        }

    },

    render () {
        const list = this.state.listaDiscos;
        if(!list){return null;}
        return (
            <Table lista={list} puntuar={this.puntuar} />
            );
}
});

var Table = React.createClass({
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
                              <Button onclick={() => { puntuar(item.IdDisco)  }} className="btVoto">Vote</Button>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
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

React.render(<Puntuaciones url="../api/Discos" />, document.getElementById('container'));