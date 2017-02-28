google.charts.load("current", { packages: ["corechart"] });


var arrayPunt = [["Element", "Density", { role: "style" }]];

function loadCharts() {
    $.ajax({
        url: '../api/Puntuaciones',
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (Puntuaciones) {
            $.each(Puntuaciones, function (index) {
                if (index < 5) {
                    aux = [(Puntuaciones[index].iddisco).toString(), Puntuaciones[index].Puntuacion1, "green"];
                    arrayPunt.push(aux);
                }/*else if(index == 5){
                    aux = [Puntuaciones[index].idDisco, +Puntuaciones[index].Puntuacion1, 'green'];
                    arrayPunt.push(aux);

                }*/
            });
            console.log(arrayPunt);
            google.charts.setOnLoadCallback(drawChart);
        }
    });
}

document.body.onload = function () {
    loadCharts();
}

function drawChart() {
    [
      ["Element", "Density", { role: "style" }],
      [arrayPunt[1][0], arrayPunt[1][1], "#b87333"],
      [arrayPunt[2][0], arrayPunt[2][1], "silver"],
      [arrayPunt[3][0], arrayPunt[3][1], "gold"],
      [arrayPunt[4][0], arrayPunt[4][1], "color: #e5e4e2"],
      [arrayPunt[5][0], arrayPunt[5][1], "pink"]
    ]
    var data = google.visualization.arrayToDataTable();

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