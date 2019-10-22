import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BookStorageService, IBook} from '../book-storage.service';
import {OnPageVisible} from 'angular-page-visibility';
import {Observable, timer} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  private books: IBook[];
  constructor(private bookStorageService: BookStorageService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.books = this.bookStorageService.fetch();
    timer(0, 10000)
      .pipe(filter(_ => {
        console.log('Do check.')
        if (this.books.length === 0) { return true; }
        return Math.floor((new Date().getTime() - new Date(this.books[this.books.length - 1].date).getTime()) / 1000) > 30;
      }))
      .subscribe(_ => {
        this.add();
      });
  }

  add(): void {
    const random = Math.ceil( Math.random() * 10000 );
    const book: IBook = { id: random, name: 'Sample' + random, date: new Date() };
    this.bookStorageService.add(book);
    this.books = this.bookStorageService.fetch();
  }

  clear(): void {
    this.bookStorageService.clear();
    this.books = this.bookStorageService.fetch();
  }

  @OnPageVisible()
  onPageVisible() {
    console.log('Page Visible!');
    this.books = this.bookStorageService.fetch();
    this.cd.detectChanges();
  }

}
