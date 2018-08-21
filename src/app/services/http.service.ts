import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Country} from '../interfaces/country';
import {City} from '../interfaces/city';
import {Company} from '../interfaces/company';

@Injectable()
export class HttpService {
  headers: HttpHeaders;
  private baseUrl = 'http://localhost:3004/';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'x-auth-token': 'bad18eba1ff45jk7858b8ae88a77fa30'});
  }

  getCountries(): Observable<Country> {
    return this.http.get(this.baseUrl + 'countries', {headers: this.headers});
  }

  getCities(): Observable<City> {
    return this.http.get(this.baseUrl + 'cities', {headers: this.headers});
  }

  getCompanies(): Observable<Company> {
    return this.http.get(this.baseUrl + 'companies', {headers: this.headers});
  }

  getFormats(): Observable<any> {
    return this.http.get(this.baseUrl + 'formats', {headers: this.headers});
  }


}
