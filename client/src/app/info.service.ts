import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Person } from './person';


@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http : HttpClient) {}
  
   getAll() {
    return this.http.get('http://localhost:8000/getInfo').pipe(
      map((res: any) => {
        return res
      })
    );
  }

  
  add(person: Person) {
    return this.http.post(`http://localhost:8000/Add`, { person: person }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id: any, person: Person) {
    return this.http.put(`http://localhost:8000/update/${id}`, { person}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  remove(id: any) {
    return this.http.delete(`http://localhost:8000/remove/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
