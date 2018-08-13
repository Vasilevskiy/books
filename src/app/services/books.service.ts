import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class BooksService {

  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'x-auth-token': 'bad18eba1ff45jk7858b8ae88a77fa30'});
  }


  getBooks() {
    return this.http.get('http://localhost:3004/books', {headers: this.headers});
  }

  getBook(id) {
    return this.http.get('http://localhost:3004/books/' + id, {headers: this.headers});
  }
}
