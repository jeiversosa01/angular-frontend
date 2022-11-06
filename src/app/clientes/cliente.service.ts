import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './cliente.json';
import { Observable, of, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'}) // 415

  constructor(private http:HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);   // Datos estáticos en cliente.json.ts

    return this.http.get<Cliente[]>(this.urlEndPoint); // Más sencilla
    
    // return this.http.get(this.urlEndPoint).pipe(  // Más complicada
    //   map(response => response as Cliente[])
    // );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeader})
  }

  getCliente(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeader})
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader})
  }
}
