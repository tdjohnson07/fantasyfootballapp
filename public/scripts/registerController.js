angular.module('fantasyApp').controller('registerController',['$http','$location', function($http, $location){
  var vm=this;
  vm.username='';
  vm.password='';
  vm.confirmPassword='';
  vm.register = function(){
    console.log(vm.username, vm.password);
    var sendData = {};
    sendData.username= vm.username;
    sendData.password = vm.password;
    $http.post('/register', sendData).then(handleSuccess, handleFailure);
  }
  function handleSuccess(res){
    console.log('success adding user', res);
    $location.path('/home')
  }
  function handleFailure(res){
    console.log('failed to add user', res);
  }
}]);
