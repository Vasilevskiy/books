import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../interfaces/book';
import {BooksService} from '../services/books.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

  public formats = [];
  public books: Book[];
  public filteredBooks: Book[];
  public searchForm: FormGroup;
  public author: string;
  public format: number;

  private querySubscription: Subscription;

  constructor(private activeRoute: ActivatedRoute,
              private bookService: BooksService) {
    this.searchForm = new FormGroup({
      'author': new FormControl(''),
      'title': new FormControl(''),
      'isbn': new FormControl(''),
      'format': new FormControl(''),
      'pages': new FormGroup({
        'from': new FormControl(1, Validators.min(1)),
        'to': new FormControl(999)
      }),
      'prices': new FormGroup({
        'from': new FormControl(0, Validators.min(0)),
        'to': new FormControl(999)
      })
    });
    this.formats = this.activeRoute.snapshot.data.formats;
    this.querySubscription = activeRoute.queryParams.subscribe(
      (queryParam: any) => {
        this.author = queryParam['author'];
        this.format = queryParam['formatId'];
      });
  }

  searchBooks(): void {
    this.filteredBooks = this.books.filter((book: Book) => {
      if (book.author.toLowerCase().includes(this.searchForm.get('author').value.toLowerCase())
        && book.title.toLowerCase().includes(this.searchForm.get('title').value.toLowerCase())
        && book.isbn.includes(this.searchForm.get('isbn').value)
        && book.pages >= +this.searchForm.getRawValue().pages['from']
        && book.formatId === +this.searchForm.get('format').value
        && book.pages <= +this.searchForm.getRawValue().pages['to']
        && Math.round(book.price) >= +this.searchForm.getRawValue().prices['from']
        && Math.round(book.price) <= +this.searchForm.getRawValue().prices['to']) {
        return book;
      }
    });
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((result: Book[]) => {
      this.books = result;
      if (this.author && this.format) {
        this.filteredBooks = this.books.filter( book => {
          if (book.author.toLowerCase().includes(this.author.toLowerCase())
            && book.formatId === +this.format) {
            return book;
          }
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

}
