import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from './core/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.localStorageService.get( 'todo-list');
  }
}
