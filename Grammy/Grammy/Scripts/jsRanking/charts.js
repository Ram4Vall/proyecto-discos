google.charts.load("current", { packages: ["corechart"] });


var arrayPunt = [["Element", "Density", { role: "style" }]];
var puntuacionesOB;
function loadCharts() {
    $.ajax({
        url: '../api/Top',
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (Puntuaciones) {
            puntuacionesOB = JSON.parse(Puntuaciones);
            $(document).ready(function () {
                console.log(puntuacionesOB);
                google.charts.setOnLoadCallback(drawChart);
            });
        }
    });
}

/*document.body.onload = function () {
    loadCharts();
}*/

function drawChart() {

    var data = google.visualization.arrayToDataTable(
            [
              ["Title", "Score", { role: "style" }],
              [puntuacionesOB[0].Titulo, parseInt(puntuacionesOB[0].Puntuacion), "fill-color:#cc6666; fill-opacity:0.5"],
              [puntuacionesOB[1].Titulo, parseInt(puntuacionesOB[1].Puntuacion), "fill-color:#cc9966; fill-opacity:0.5"],
              [puntuacionesOB[2].Titulo, parseInt(puntuacionesOB[2].Puntuacion), "fill-color:#cccc66; fill-opacity:0.5"],
              [puntuacionesOB[3].Titulo, parseInt(puntuacionesOB[3].Puntuacion), "fill-color:#cccc99; fill-opacity:0.5"],
              [puntuacionesOB[4].Titulo, parseInt(puntuacionesOB[4].Puntuacion), "fill-color:#cccccc; fill-opacity:0.5"]
            ]
        );

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     {
                         calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation"
                     },
                     2]);

    var options = {
        title: "Top 5 ratings",
        
        titleTextStyle: { color: 'white', fontSize: 30, fontfamily: 'Roboto' },
        textStyle:{color:"white", fontSize:20},
        /*width: 800,
        height: 400,*/
        is3D: true,
        fontSize: 15,
        backgroundColor: "none",
        bar: { groupWidth: "95%" },
        legend: { position: "none", fontSize: 20 },
    };
    var chart = new google.visualization.BarChart(document.getElementById("ranking"));
    chart.draw(view, options);
}

/*var chart = new Charts();

google.charts.load("current", { packages: ["corechart"] });
document.body.onload = function () {
    chart.loadCharts();
    loadCharts();
}

//var arrayPunt = [["Element", "Density", { role: "style" }]];

function Charts (){
    this.puntuacionesOB;
}

Charts.prototype.loadCharts = function () {
    var that = this;
    document.getElementById("ranking").innerHTML = "";
    $.ajax({
        url: '../api/Top',
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (Puntuaciones) {
            that.puntuacionesOB = JSON.parse(Puntuaciones);
            $(document).ready(function () {
                console.log(that.puntuacionesOB);
                google.charts.setOnLoadCallback(that.drawChart);
            });
        }
    });
}

Charts.prototype.drawChart = function() {

    var that = this;
    var data = google.visualization.arrayToDataTable(
            [
              ["Title", "Score", { role: "style" }],
              [that.puntuacionesOB[0].Titulo, parseInt(that.puntuacionesOB[0].Puntuacion), "fill-color:#cc6666; fill-opacity:0.5"],
              [that.puntuacionesOB[1].Titulo, parseInt(that.puntuacionesOB[1].Puntuacion), "fill-color:#cc9966; fill-opacity:0.5"],
              [that.puntuacionesOB[2].Titulo, parseInt(that.puntuacionesOB[2].Puntuacion), "fill-color:#cccc66; fill-opacity:0.5"],
              [that.puntuacionesOB[3].Titulo, parseInt(that.puntuacionesOB[3].Puntuacion), "fill-color:#cccc99; fill-opacity:0.5"],
              [that.puntuacionesOB[4].Titulo, parseInt(that.puntuacionesOB[4].Puntuacion), "fill-color:#cccccc; fill-opacity:0.5"]
            ]
        );

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     {
                         calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation"
                     },
                     2]);

    var options = {
        title: "Top 5 ratings",
        
        titleTextStyle: { color: 'white', fontSize: 30, fontfamily: 'Roboto' },
        textStyle:{color:"white", fontSize:20},
        width: 800,
        height: 400,
        is3D: true,
        fontSize: 15,
        backgroundColor: "none",
        bar: { groupWidth: "95%" },
        legend: { position: "none", fontSize: 20 },
    };
    var chart = new google.visualization.BarChart(document.getElementById("ranking"));
    chart.draw(view, options);
}*/
