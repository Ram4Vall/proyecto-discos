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
                chart.loadCharts();
            }.bind(this)
        });
        
    },

    //Renderiza una tabla con los datos
    render () {
        const list = this.state.listaDiscos;
        if(!list){return null;}
        return (
            <Table lista={list} />
            );
}
});

//Componente que renderiza la tabla usando la lista
var Table = React.createClass({
    componentDidMount: function () {
        //Usa el pluggin DataTable para crear una tabla más bonita
        $("#datosTab").DataTable();
        /*function miFuncion() { $(".btVoto").click(function (e) {
            var butMe = e.target;
            puntuar(butMe.id, butMe.name, e);
        });}*/

        //miFuncion();
        
        $("#datosTab").on('draw.dt', function () {
            $(".btVoto").unbind('click');
            $(".btVoto").click(function (e) {
                var butMe = e.target;
                puntuar(butMe.id, butMe.name, e);
            });
        } );
    },
    render () {
        const lista = this.props.lista;

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