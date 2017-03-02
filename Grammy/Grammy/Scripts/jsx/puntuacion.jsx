var Puntuaciones = React.createClass({
    getInitialState: function(){
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
    render () {
        const list = this.state.listaDiscos;
        if(!list){return null;}
        return (
            <Table lista={list}/>
            );
    }
});

var Table = React.createClass({
    render () {
        const lista = this.props.lista;
        return (
            <div>
                { lista.map((item) =>
                     <div key={item.IdDisco}>
                         <span>{item.Titulo}</span>
                         <span>{item.Interprete.Interprete1}</span>
                     </div>
                 )
                }
            </div>
        );
    }
});
 
React.render( <Puntuaciones url="../api/Discos" />, document.getElementById('container'));