import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../services/http.service';

@Injectable()
export class CitiesResolver implements Resolve<any> {
  constructor(private httpService: HttpService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.httpService.getCities();
  }

}
