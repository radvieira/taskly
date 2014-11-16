/**
 * A demonstration of integrating Angular and non-angular.
 *
 * Taskly is a web application with a part of its page being a TaskList Angular App.
 * Taskly, initializes the TaskList App by getting a handle on the TaskList's TaskProvider and setting
 * up its initial list of tasks.
 *
 * A submit handler is bound to Taskly's non-Angular form and upon submission Taskly creates a new Task by adding it to
 * the Task service.  Taskly triggers a digest cycle so Angular can update the TaskList view.
 *
 * Taskly, binds to a 'task-selected' event broadcasted by the Tasks service to update
 * the form's display value for editing.
 */

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
