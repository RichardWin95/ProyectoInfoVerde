angular.module('HV').controller('DetailSample', ['$scope','Crud',function (controller,api) {
    controller.cantidadPaginas = 0;
    controller.dataOfficeShow = [];
    api.get("/api/detailSample").then(function(response){
            controller.dataSearch = JSON.parse(response);
            controller.cantidadPaginas = Math.floor(controller.dataSearch.length/10);
            if(controller.dataSearch.length%10!=0){
                controller.cantidadPaginas++;
            }
            controller.pagination(1);
        });

    controller.pagination = function(range){
        controller.dataOfficeShow = [];
        for(var i=range*10-10;i<range*10 && i<controller.dataSearch.length;i++){
            controller.dataOfficeShow.push(controller.dataSearch[i]);
        }
    };
    controller.range = function(max) {
        var input = [];
        for (var i = 1; i <= max; i++)
            input.push(i);
        return input;
    };
}]);