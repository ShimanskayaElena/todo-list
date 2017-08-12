import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToDo } from '../shared/data-model';
import { LocalStorageService } from '../core/localStorage.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class ToDoListComponent {
    // public data: ToDo[] = data; /** .reverse()*/
    public data: ToDo[];

    public listForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private localStorageService: LocalStorageService) {

      this.data = this.localStorageService.get('todo-list');
      this.createForm(this.data);

      // When changing the value in any of the input
      this.listForm.valueChanges.subscribe( () => {
          this.save();
        }
      );
    }

    createForm(list: ToDo[]): void {

      this.listForm = this.fb.group({
        items: this.fb.array([])
      });

      // const listFGs = list.map(item => this.fb.group(item));
      const listFGs = list.map(item => this.fb.group({
        action: [ item.action, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(225)
        ]],
        description: [ item.description, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(225)
        ]],
        completed: [ item.completed],
        priority: [ item.priority]
      }));
      const listFormArray = this.fb.array(listFGs);
      this.listForm.setControl('items', listFormArray);

    // console.log(this.listForm.controls.items.value[0]); // The first item from the list
    // console.log(this.listForm.controls.items.invalid);
    // console.log(this.listForm.get('items').value);
    // console.log(this.listForm.controls.items.status);
    }

    get items(): FormArray {
      return this.listForm.get('items') as FormArray;
    };

    addToDo(): void { // Adding a new element to the top of the FormArray
      this.items.insert(0, this.fb.group({
        action: [ '', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(225)
        ]],
        description: [ '', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(225)
        ]],
        completed: [ false],
        priority: []
      }));

      this.listForm.valueChanges.subscribe( () => {
          this.save();
        }
      );

    }

    save(): void {
      this.localStorageService.set('todo-list', this.listForm.controls.items.value);
    }

    removeToDo(index: number): void {
      this.items.removeAt(index);
      this.save();
    }

    showCompleted(): void {
      const initialData: ToDo[] = this.localStorageService.get('todo-list');
      const filteredData: ToDo[] = initialData.filter( (item) => {
        return item.completed === true;
      });
      this.createForm(filteredData);
    }

    showPriority(): void {
      const initialData: ToDo[] = this.localStorageService.get('todo-list');
      const filteredData: ToDo[] = initialData.filter( (item) => {
        return item.priority === 'high';
      });
      this.createForm(filteredData);
    }

    showAll(): void {
      this.data = this.localStorageService.get('todo-list');
      this.createForm(this.data);
    }
}
