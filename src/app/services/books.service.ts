import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Book} from '../interfaces/book';

@Injectable()
export class BooksService {

  headers: HttpHeaders;

  public booksUrl = 'http://localhost:3004/books/';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'x-auth-token': 'bad18eba1ff45jk7858b8ae88a77fa30'});
  }


  getBooks(): Observable<any> {
    return this.http.get(this.booksUrl, {headers: this.headers});
  }

  getBook(id): Observable<any> {
    return this.http.get(this.booksUrl + id, {headers: this.headers});
  }

  pushNewBook(book): Observable<Book> {
    return this.http.post(this.booksUrl, book, {headers: this.headers});
  }
}
