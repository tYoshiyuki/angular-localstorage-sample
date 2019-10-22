import { Component, OnInit } from '@angular/core';
import {BookStorageService, IBook} from '../book-storage.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  private books: IBook[];
  constructor(private bookStorageService: BookStorageService) { }

  ngOnInit() {
    this.books = this.bookStorageService.fetch();
  }

  add(): void {
    const random = Math.ceil( Math.random() * 10000 );
    const book: IBook = { id: random, name: 'Sample' + random, date: new Date() };
    this.bookStorageService.add(book);
    this.books = this.bookStorageService.fetch();
  }

}
