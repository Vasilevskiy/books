import { Component, OnInit } from '@angular/core';
import {BooksService} from '../services/books.service';
import {Book} from '../interfaces/book';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html'
})
export class ShowcaseComponent implements OnInit {


  constructor(private books: BooksService) { }

  public booksArray = [];

  ngOnInit() {
    this.books.getBooks().subscribe((res: Book[]) => {
      this.booksArray = res;
    });
  }

}
