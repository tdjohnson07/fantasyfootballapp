angular.module('fantasyApp').controller('loginController',['$http', '$location', function($http, $location){
  var vm = this;
  vm.username = '';
  vm.password = '';
  vm.login = function(){
    console.log('here',  vm.username, vm.password);
    var sendData = {};
    sendData.username =vm.username;
    sendData.password = vm.password;
    $http.post('/login', sendData).then(handleSuccess, handleFailure);
  }
  function handleSuccess(res){
    console.log('success', res);
    $location.path('/home');
  }
  function handleFailure(res){
    console.log('failure', res);
    $location.path('/');
  }
}]);
