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

            console.log(puntuacionesOB);
            google.charts.setOnLoadCallback(drawChart);
        }
    });
}

document.body.onload = function () {
    loadCharts();
}

function drawChart() {

    var data = google.visualization.arrayToDataTable(
            [
              ["Title", "Score", { role: "style" }],
              [puntuacionesOB[0].Titulo, parseInt(puntuacionesOB[0].Puntuacion), "#b87333"],
              [puntuacionesOB[1].Titulo, parseInt(puntuacionesOB[1].Puntuacion), "silver"],
              [puntuacionesOB[2].Titulo, parseInt(puntuacionesOB[2].Puntuacion), "gold"],
              [puntuacionesOB[3].Titulo, parseInt(puntuacionesOB[3].Puntuacion), "color: #e5e4e2"],
              [puntuacionesOB[4].Titulo, parseInt(puntuacionesOB[4].Puntuacion), "pink"]
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
        width: 600,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };
    var chart = new google.visualization.BarChart(document.getElementById("ranking"));
    chart.draw(view, options);
}