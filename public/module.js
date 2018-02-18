var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

   
    // when submitting the add form, send the text to the node API
    $scope.encrypt = function() {
        console.log($scope.formData);
        url = '/postcontent/'+$scope.formData.content;
        $http.post(url)
            .success(function(data) {
                $scope.content = data.result;
                console.log($scope.content)
                if (data.length == 0)
                {
                    // alert("No data found");
                    $scope.nodata = "No data found";
                }
                else{
                    $scope.nodata = "";
                }
                })
            .error(function(data) {
                console.log('Error: ' + data);
                });
    };


    
}
