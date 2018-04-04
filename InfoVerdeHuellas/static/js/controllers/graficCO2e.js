angular.module('HV').controller('graficCO2e', ['$scope','Crud',function (controller,api) {
    api.get("/api/huellas/CO2e").then(function(response){
        controller.dataSearch = JSON.parse(response);
        console.log()
        Highcharts.chart('CO2e', {
           title: {text: 'Producion CO2e Por Años'},
            yAxis: {title: {text: 'KgCO2e/Kwh'}},
            plotOptions: {series: {pointStart: 2010}},
                series: controller.dataSearch
                });
              });
}]);