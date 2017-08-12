import { Injectable } from '@angular/core';

import { ToDo, data } from '../shared/data-model';

@Injectable()
export class LocalStorageService {

    set(property: string, value: ToDo[] ): void {
        localStorage.setItem(property, JSON.stringify(value));
    }

    remove(property: string): void {
        localStorage.removeItem(property);
    }
    get(property: string): ToDo[] {

        if (localStorage.getItem(property)) {
            return JSON.parse(localStorage.getItem(property));
        } else {
           return data;
        }
    }

    clear(): void {
        localStorage.clear();
    }
}
