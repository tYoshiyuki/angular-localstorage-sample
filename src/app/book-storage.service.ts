import { Injectable } from '@angular/core';

const BOOK_STORAGE_KEY = 'book_storage_key';

export interface IBook {
  id: number;
  name: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BookStorageService {

  constructor() {
    const book: IBook[] = [
      { id: 1, name: 'Book001', date: new Date()},
      { id: 2, name: 'Book002', date: new Date()},
      { id: 3, name: 'Book003', date: new Date()},
    ];
    book.forEach(b => this.add(b));
  }

  fetch(): IBook[] {
    return JSON.parse(localStorage.getItem(BOOK_STORAGE_KEY)) || [];
  }

  clear(): void {
    localStorage.removeItem(BOOK_STORAGE_KEY);
  }

  add(book: IBook): void {
    this.delete(book);
    localStorage.setItem(BOOK_STORAGE_KEY, JSON.stringify(this.fetch().concat(book)));
  }

  delete(book: IBook): void {
    localStorage.setItem(BOOK_STORAGE_KEY, JSON.stringify(this.fetch().filter(_ => _.id !== book.id)));
  }
}
