import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Person } from './person';
import {environment} from '../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http : HttpClient) {}

  URL='http://localhost:8000';
  // URL=""
  
   getAll() {
    return this.http.get(`/getInfo`).pipe(
      map((res: any) => {
        return res
      })
    );
  }

  
  add(person: Person) {
    return this.http.post(`/add`, { person: person }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id: any, person: Person) {
    return this.http.put(`/update/${id}`, {person: person}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  remove(id: any) {
    return this.http.delete(`/remove/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
