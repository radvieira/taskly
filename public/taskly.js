/**
 * A demonstration of integrating Angular with non-angular.
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

  var onTasksRetrieved = function(tasks) {

    var taskly = ng.module('taskly', ['task-list']),

      taskForm = document.querySelector('.task-entry');

    taskForm.task.focus();

    //configure the Task list with a list of tasks
    //this can come from anywhere - async requires manual bootstrapping
    taskly.config(function(TasksProvider) {

      TasksProvider.init(tasks);

    });

    //add or update tasks by listing to non-angular form submits
    taskly.run(function($rootScope, Tasks) {

      taskForm.addEventListener('submit', function(e) {

        e.preventDefault();

        Tasks.save({ name: this.task.value });

        $rootScope.$digest();

        this.reset();

      }.bind(taskForm));

    });

    //listen for task-selected event and update the non-angular input field
    taskly.run(function($rootScope) {

      $rootScope.$on('task-selected', function(e, task) {

        this.task.value = task.name;
        this.task.focus();

      }.bind(taskForm));

    });

    //listen for task-completed event and update non-angular elements
    taskly.run(function($rootScope) {

      var messages = document.querySelector('.messages');

      $rootScope.$on('task-completed', function(e, task) {

        var message = document.createElement('p');
        message.classList.add('alert');
        message.classList.add('alert-success');
        message.classList.add('text-center');
        message.innerHTML = task.name + ' <strong>Completed!</strong>';

        this.appendChild(message);

        setTimeout(function() {
          this.removeChild(message);
        }.bind(messages), 500);

        taskForm.reset();

      }.bind(messages));

    });

    //kick off the bootstrap process now that we have data.
    ng.bootstrap(document.getElementById('taskly'), ['taskly']);

  };

  //get the tasks from the backend and kick-off angular bootstrapping on success.
  (function(success) {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

      if (this.readyState === 4) {
        if (this.status === 200) {
          success(JSON.parse(this.responseText));
        } else {
          alert('Could not retrieve tasks!');
        }
      }

    }.bind(xhr);

    xhr.open('GET', '/api/tasks', true);

    xhr.send(null);

  }(onTasksRetrieved));

}(angular));
