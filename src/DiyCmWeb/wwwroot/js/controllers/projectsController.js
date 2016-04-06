﻿app.controller('projectsController', ['$scope', '$http', 'ReportsService', function ($scope, $http, ReportsService) {

    $scope.message = 'Everyone come and look!';

    var onGetAllBudgetActual = function (data) {
        $scope.tableProjects = data;
        console.log(data);
    };

    var onGetAllProjects = function (data) {
        $scope.allProjects = data;
        console.log(data);
    };

    var onGetAllComplete = function (data) {
        //console.log(data);
    };

    var onGetAllError = function (reason) {
        console.log(reason);
    };

    var onAddProject = function (data) {
      $scope.newProject = data;
      console.log(data);
    };

    var onAddProjectError = function (reason) {
      console.log(reason);
    }

    var onEditProject = function (data) {
      $scope.newProject = data;
      console.log(data);
    };

    var onEditProjectError = function (reason) {
      console.log(reason);
    }

    $scope.addProject = function () {
      var data = {
        ProjectName: $scope.project.Name,
        Description: $scope.project.Description,
        ProjectedStartDate: $scope.project.ProjectedStartDate,
        ActualStartDate: $scope.project.ActualEndDate,
        ProjectedEndDate: $scope.project.ProjectedEndDate,
        ActualEndDate: $scope.project.ActualEndDate
      };
      ReportsService.addProject(data)
        .then(onAddProject, onAddProjectError);
    };

    $scope.editProject = function () {
      var data = {
        ProjectId: $scope.p.ProjectId,
        ProjectName: $scope.p.Name,
        Description: $scope.p.Description,
        ProjectedStartDate: $scope.p.ProjectedStartDate,
        ActualStartDate: $scope.p.ActualEndDate,
        ProjectedEndDate: $scope.p.ProjectedEndDate,
        ActualEndDate: $scope.p.ActualEndDate
      };
      console.log(data);
      // ReportsService.editProject(data, data.ProjectId)
      //   .then(onEditProject, onEditProjectError);
    };

    $scope.editClickProject = function (id) {
      $scope.edit = false;
      var btn = angular.element("#edit-project-" + id);
      btn.find("[data-target='#collapse2']").click();
      // console.log(btn);
    };

    ReportsService.getAllProjectsBudgetActual()
    .then(onGetAllBudgetActual, onGetAllError);
    ReportsService.getAllProjects()
    .then(onGetAllProjects, onGetAllError);
    //ReportsService.getAllProjectsBudgetActual()
    //    .then(onGetAllComplete, onGetAllError);
    ReportsService.getCategoryDetailsAndSummary()
        .then(onGetAllComplete, onGetAllError);
    ReportsService.getSubCategoryDetailsAndSummary()
        .then(onGetAllComplete, onGetAllError);
    ReportsService.getActivities()
        .then(onGetAllComplete, onGetAllError);

//
$scope.edit = true;

// DatePicker
      $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();

      $scope.clear = function() {
        $scope.dt = null;
      };

      $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };

      $scope.dateOptions = {
        // dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };

      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }

      $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };

      $scope.toggleMin();

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $scope.open3 = function() {
        $scope.popup3.opened = true;
      };

      $scope.open4 = function() {
        $scope.popup4.opened = true;
      };

      $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.altInputFormats = ['M!/d!/yyyy'];

      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };

      $scope.popup3 = {
        opened: false
      };

      $scope.popup4 = {
        opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      }
}]);
