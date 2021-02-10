import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  FetchData(): Observable<any> {
    return this.http.get('https://crypto-be-304111.el.r.appspot.com/');
  }


}
