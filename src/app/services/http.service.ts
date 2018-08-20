import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpService {
  headers: HttpHeaders;
  private baseUrl = 'http://localhost:3004/';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'x-auth-token': 'bad18eba1ff45jk7858b8ae88a77fa30'});
  }

  getCountries() {
    return this.http.get(this.baseUrl + 'countries', {headers: this.headers});
  }

  getCities() {
    return this.http.get(this.baseUrl + 'cities', {headers: this.headers});
  }

  getCompanies() {
    return this.http.get(this.baseUrl + 'companies', {headers: this.headers});
  }

  getFormats() {
    return this.http.get(this.baseUrl + 'formats', {headers: this.headers});
  }

}
