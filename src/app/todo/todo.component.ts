import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
  ]
})
export class TodoComponent implements OnInit {

  tasks: any[] = []

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.firestoreCollection.valueChanges({idField: 'id'}).subscribe(item => {
      this.tasks = item.sort((a: any, b: any) => a.isDone - b.isDone);
    });
  }

  onClick(taskInput: HTMLInputElement) {
    if (taskInput.value) {
      this.todoService.addTask(taskInput.value);
      taskInput.value = '';
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }

  onDelete(id: string) {
    this.todoService.deleteTodo(id);
  }

}
