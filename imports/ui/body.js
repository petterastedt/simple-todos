import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks';
import { Meteor } from 'meteor/meteor'
import './body.html';
import './task.js';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict()
    Meteor.subscribe('tasks')
  })
//Hides completed todo items, checks number of todo items, sorts todo items
Template.body.helpers({
    tasks() {
        const instance = Template.instance()
        if (instance.state.get('hideCompleted')) {
            return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
        return Tasks.find({}, { sort: { createdAt: -1 } })
    },
    incompleteCount() {
        return Tasks.find({ checked: { $ne: true } }).count() 
      },
})
//Submits new todo item
Template.body.events({
    'submit .new-task'(event) {
        event.preventDefault()
        const target = event.target
        const text = target.text.value

        Meteor.call('tasks.insert', text)
        
        target.text.value = ''
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);    
      },
})

