angular.module('HV').controller('DetailSample', ['$scope','Crud',function (controller,api) {
    controller.dataDetailSample = {factor : "",oficina : "", maquina:"", cantidad:"", muestra:"" , id:""};//nombre de la otra foranea
    controller.cantidadPaginas = 0;
    controller.dataOfficeShow = [];
    controller.createDetailSample = function(){
        api.post("/api/detailSample",controller.dataDetailSample).then(function(response){
            controller.clearField();
            controller.search();//consulta de nuevo la bd
        });
    };
    controller.addMachineQuantity = function(){
        api.patch("/api/detailSample", controller.dataDetailSample).then(function(response){
        });
    };
    controller.deleteDetailSample = function(data){
        api.delete("/api/detailSample/"+data.det_serial).then(function(response){
            controller.search();//consulta de nuevo la bd
        });
    };
    controller.clearField = function(){
        controller.dataDetailSample = {factor : "",oficina : "", maquina:"", cantidad:"", muestra:"" , id:""};
        controller.updateFields = false;
    };

    controller.showFormUpdate = function(data){
        controller.dataDetailSample.cantidad = data.det_cantidad;
        controller.dataDetailSample.oficina = data.id_Oficina;
        controller.dataDetailSample.oficina = data.id_Maquina;
        controller.dataDetailSample.oficina = data.id_Muestra;
        controller.dataDetailSample.oficina = data.id_Factor;
        controller.dataDetailSample.id = data.det_serial;
        controller.updateFields = true;
    };
     controller.update = function(){
        api.put("/api/detailSample",controller.dataDetailSample).then(function(response){
            controller.clearField();
            controller.search();//consulta de nuevo la bd
        });
    }
    controller.search = function(){
        api.get("/api/detailSample").then(function(response){
            controller.dataSearch = JSON.parse(response);
        });

    };
    api.get("/api/huellas/detailSample").then(function(response){
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