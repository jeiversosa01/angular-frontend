import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './cliente.json';
import { Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  constructor(private http:HttpClient) { }

  getClientes(): Observable<Cliente[]> {

    // return of(CLIENTES);   // Datos estáticos en cliente.json.ts

    // Más sencilla
    return this.http.get<Cliente[]>(this.urlEndPoint);

    // más complicada
    // return this.http.get(this.urlEndPoint).pipe(
    //   map(response => response as Cliente[])
    // );

  }

}
