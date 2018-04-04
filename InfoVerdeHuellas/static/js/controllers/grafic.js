angular.module('HV').controller('grafic', ['$scope','Crud',function (controller,api) {
    api.get("/api/huellas/consumoE").then(function(response){
        controller.dataSearch = JSON.parse(response);
        Highcharts.chart('container', {
           title: {text: 'Consumo Energía Eléctrica Por Año'},
            yAxis: {title: {text: 'KWH'}},
            plotOptions: {series: {pointStart: 2010}},
                series: controller.dataSearch
                });
              });

}]);