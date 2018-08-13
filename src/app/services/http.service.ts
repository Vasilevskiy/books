import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'x-auth-token': 'bad18eba1ff45jk7858b8ae88a77fa30'});
  }

  getCompanies() {
    return this.http.get('http://localhost:3004/companies', {headers: this.headers});
  }
  getCities() {
    return this.http.get('http://localhost:3004/cities', {headers: this.headers});
  }
  getCountries() {
    return this.http.get('http://localhost:3004/countries', {headers: this.headers});
  }
  getFormats() {
    return this.http.get('http://localhost:3004/formats', {headers: this.headers});
  }

}
