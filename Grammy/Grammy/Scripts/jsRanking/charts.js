/*google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);*/

var arrayPunt = [["Element", "Density", { role: "style" }]];

function loadCharts() {
    $.ajax({
        url: '../api/Puntuaciones',
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (Puntuaciones) {
            $.each(Puntuaciones, function (index) {
                if (index < 4) {
                    aux = [Puntuaciones[index].iddisco, + Puntuaciones[index].Puntuacion1, 'green'] ;
                    arrayPunt.push(aux);
                }/*else if(index == 4){
                    aux = [Puntuaciones[index].idDisco, +Puntuaciones[index].Puntuacion1, 'green'];
                    arrayPunt.push(aux);

                }*/
            });
            console.log(arrayPunt);
        }
    });
}

document.body.onload = function () {
    loadCharts();
}
/*
function drawChart() {
    [
      ["Element", "Density", { role: "style" }],
      ["Copper", 8.94, "#b87333"],
      ["Silver", 10.49, "silver"],
      ["Gold", 19.30, "gold"],
      ["Platinum", 21.45, "color: #e5e4e2"],
      ["Emi", 23.3, "pink"]
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
}*/