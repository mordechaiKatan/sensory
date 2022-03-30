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
    return this.http.post(`http://localhost:8000/Add`, { data: person }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(person: Person, index: number) {
    return this.http.post(`http://localhost:8000/update`, { person, index }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  remove(person: Person) {
    return this.http.post(`http://localhost:8000/remove`, { data: person }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
