angular.module('fantasyApp').controller('registerController',['$http','$location', function($http, $location){
  var vm=this;
  vm.username='';
  vm.password='';
  vm.confirmPassword='';
  vm.showMessage="";
  vm.register = function(){
    if(vm.password != vm.confirmPassword || vm.username==='' || vm.password ===''){
      vm.showMessage = "Passwords do not match";
      return;
    }
    var sendData = {};
    sendData.username= vm.username;
    sendData.password = vm.password;
    $http.post('/register', sendData).then(handleSuccess, handleFailure);
  }
  function handleSuccess(res){
    // console.log('success adding user', res);
    $location.path('/')
  }
  function handleFailure(res){
    vm.showMessage = "Username taken";
    console.log('failed to add user', res);
    $location.path('/register');
  }
}]);
