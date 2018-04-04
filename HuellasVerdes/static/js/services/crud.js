angular.module('HV').service('Crud', ['$http', '$q', '$httpParamSerializer', function (api, respuestaServidor, serializador) {
    this.get = function (url) {
        var datosGet = respuestaServidor.defer();
        api.get(url).success(function (datos) {
            datosGet.resolve(datos);
        }).error(function (error) {
            datosGet.reject(error);
        });
        return datosGet.promise;
    };
}]);