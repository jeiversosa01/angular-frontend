import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Cliente } from './cliente';
import { CLIENTES } from './cliente.json';
import { Observable, of, map, catchError, throwError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'}) // 415

  constructor(private http:HttpClient, private router:Router) { }

  getClientes(page: number): Observable<any> {

    // return of(CLIENTES);   // Datos estáticos en cliente.json.ts
    // return this.http.get<Cliente[]>(this.urlEndPoint); // Más sencilla

    return this.http.get(this.urlEndPoint + '/page/' + page).pipe( // Más complicada
    tap( (response: any) => {
      console.log('ClienteService: tap 1');
      (response.content as Cliente[]).forEach(cliente => {
        console.log(cliente.nombre);
      });
    }),
    map( (response: any) => { // Para transformar datos en la vista
      (response.content as Cliente[]).map(cliente => {
        cliente.nombre = cliente.nombre.toUpperCase(); // Mayusculas
        cliente.createAt = formatDate(cliente.createAt, 'EEEE dd, MMMM yyyy', 'es'); // formato fecha
        return cliente;
      });
      return response;
    }),
    tap(response => {
      console.log('ClienteService: tap 2');
      (response.content as Cliente[]).forEach(cliente => {
        console.log('Cliente.nombre');
      });
    })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeader}).pipe(
      map( (response: any) => response.cliente as Cliente), // Metodo 1: Retorna json como Objeto {Cliente}
      catchError(e =>{
        if (e.status == 400) {
          return throwError(() => e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  getCliente(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> { // Método 2. Retorna un any
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeader}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }
}
