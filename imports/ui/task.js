import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './task.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  }
});
//Button functionallity
Template.task.events({
  'click .toggle-checked'() {
    Meteor.call('tasks.setChecked', this._id, !this.checked)
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id)
  },
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
  'click .todo-content'(event) {
    const items = document.querySelectorAll('.todo-content')
    items.forEach(item => {
      if (event.currentTarget.id === item.id && !item.classList.contains('show-text')) item.classList.add("show-text") 
      else item.classList.remove("show-text")
    })
  }
});