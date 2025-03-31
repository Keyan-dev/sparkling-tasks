import { ToDostore } from './store/todos.store';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { toDoFilterType } from './store/todos.model';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // providers:[ToDostore]
})
export class AppComponent {
  title = 'todo-app-with-store';
  taskValue = "";
  addedTask: string[] = [];
  toDoStore = inject(ToDostore);
  constructor() {

  }
  ngOnInit() {
    initFlowbite();
  }
  addTask() {
    this.toDoStore.addToDo(this.taskValue);
    this.taskValue = "";
  }
  toggleTodo(id: string) {
    this.toDoStore.toggleToDo(id);
  }
  toggleFilter(value: toDoFilterType) {
    this.toDoStore.toggleFilter(value);
  }
}
