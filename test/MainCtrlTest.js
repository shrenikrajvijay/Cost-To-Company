var mockScope = {};
var controller;

beforeEach(module("ibm"));

beforeEach(angular.mock.inject(function($controller, $rootScope) {
	mockScope = $rootScope.$new();
	controller = $controller("PersonCtrl", {
		$scope: mockScope
	});
}));

it("request data from server", function() {
	mockScope.get("/a");
	expect(mockScope.Person).toBeDefined();
});

