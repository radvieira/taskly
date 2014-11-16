
;(function(ng) {

  var taskly = ng.module('taskly', ['task-list']);

  taskly.config(function(TasksProvider) {

    //configure the Task list with a list of tasks
    //this can come from anywhere - async requires manual bootrapping
    TasksProvider.init([{

      name: 'Get some milk!'

    }]);

  });

  taskly.run(function($rootScope, Tasks) {

    var taskForm = document.querySelector('.task-entry');

    taskForm.addEventListener('submit', function(e) {

      e.preventDefault();

      Tasks.save({ name: this.task.value });

      $rootScope.$digest();

      this.reset();

    }.bind(taskForm));

    $rootScope.$on('task-selected', function(e, task) {

      this.task.value = task.name;

    }.bind(taskForm));

  });


}(angular));
