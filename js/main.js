var app = angular.module('ibm', ['ngSanitize', 'ui.bootstrap', 'ngRoute', 'ui.select', 'angular.filter'])

.config([ '$routeProvider', '$locationProvider',
   function($routeProvider, $locationProvider) {
       //route ng-view based on the url
       $routeProvider.when('/detail', {
           templateUrl : 'detail.html',
           controller : 'DetailCtrl'
       })
       $routeProvider.when('/main', {
           templateUrl : 'main.html',
           controller : 'PersonCtrl'
       }).otherwise({
           redirectTo : '/main'
       });
       //$locationProvider.html5Mode(true); //Remove the '#' from URL.
   }
])
.filter('propsFilter', function() {
    return function(items, props) {
      var out = [];
  
      if (angular.isArray(items)) {
        var keys = Object.keys(props);
  
        items.forEach(function(item) {
          var itemMatches = false;
  
          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }
  
          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }
      return out;
    };
})

.controller('PersonCtrl', function($scope, $http){
    $scope.loading = true;
    //submit user input data to server
    $scope.submitData = function(){
        $scope.loading = true;
        if($scope.fName && $scope.lName){
            var person = {"FirstName":$scope.fName,
                          "LastName":$scope.lName,
                          "Address":$scope.address,
                          "Salary":$scope.salary,
                          "Company":$scope.company
            };
    	    $http.post("/storeData", person).
            success(function(data, status, headers, config){
                    $scope.Person.push(person);
			$scope.fName = "";
			$scope.lName = "";
			$scope.address = "";
			$scope.salary = "";
			$scope.company = "";
                }).
                error(function(data, status, headers, config){
                });
            
        }
        $scope.loading = false;
    }
    //delete the employee from the database
	$scope.deletePerson = function(person){
        $http.post("/deletePerson", person.id).
        success(function(data, status, headers, config){
            $scope.Person.push(person);
    		var index = $scope.Person.indexOf(person);
    		$scope.Person.splice(index, 1);
        }).
        error(function(data, status, headers, config){
        });
	}
	$http.get("/a")
    .then(function(response){
	    $scope.Person = response.data;
	})	
    $scope.loading = false;
})

.controller('DetailCtrl', function($scope, $http, $filter){
    $scope.loading = true;
    //get all the employee data
	$http.get("/a")
    .then(function(response){
		$scope.Person = response.data;
	})	
    $scope.loading = false;

    //get total cost of the currently selected company
	$scope.getTotal = function(){
		var total = 0;
		angular.forEach($scope.Person, function(value, key){
			if(value.Company == $scope.c.selected.Company){
				total += parseInt(value.Salary);	
			}
		});
    	$scope.total = total;
	}
})
.controller('MyController', function($scope) {
  // chart data source
  $scope.dataSource = {
    "chart": {
      "caption": "Column Chart Built in Angular!",
      "captionFontSize": "30",
      // more chart properties - explained later
    },
    "data": [{
        "label": "CornflowerBlue",
        "value": "42"
      }, //more chart data
    ]
  };
});
