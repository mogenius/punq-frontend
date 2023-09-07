import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  updateItem(key: string, value: any) {
    if (localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}
