// /// <reference path="PersonaController.ts"/>
// /// <reference path="PersonaListController.ts"/>
// /// <reference path="SkillListController.ts"/>
// /// <reference path="SettingController.ts"/>

// declare let angular;

// const StickyTableDirective = () => ({
//   restrict: 'A',
//   link($scope, $element) {
//     $element.stickyTableHeaders();
//     $scope.$on('$destroy', () => {
//       $element.stickyTableHeaders('destroy');
//     });
//   },
// });

// const myModule = angular.module('myModule', ['ngRoute']);
// myModule.directive('stickyTable', StickyTableDirective);
// myModule.controller('PersonaController', ['$scope', PersonaController]);
// myModule.controller('PersonaListController', ['$scope', PersonaListController]);
// myModule.config(($routeProvider) => {
//   $routeProvider.when('/list', { templateUrl: 'view/list.html', controller: PersonaListController });
//   $routeProvider.when('/skill', { templateUrl: 'view/skill.html', controller: SkillListController });
//   $routeProvider.when('/persona/:persona_name', { templateUrl: 'view/persona.html', controller: PersonaController });
//   $routeProvider.when('/setting', { templateUrl: 'view/setting.html', controller: SettingController });
// });
// myModule.run(($rootScope, $location, $route, $window) => {
//   $rootScope.$on('$locationChangeStart', (event) => {
//     if (!$location.path()) {
//       $location.path('/list');
//       $route.reload();
//     }
//     else {
//       $window.scrollTo(0, 0);
//     }
//   });
// });
