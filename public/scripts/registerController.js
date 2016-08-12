angular.module('fantasyApp').controller('registerController',['$http','$location', function($http, $location){
  var vm=this;
  vm.username='';
  vm.password='';
  vm.confirmPassword='';
  vm.showMessage=false;
  vm.register = function(){
    if(vm.password != vm.confirmPassword || vm.username==='' || vm.password ===''){
      vm.showMessage = true;
      return;
    }
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
    $location.path('/');
  }
}]);
