import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal  from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {

  public title: string = 'Formulario Crear'
  public cliente: Cliente = new Cliente()
  public errores!: String[];

  constructor( 
  private clienteService: ClienteService, 
  private router: Router,
  private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente )
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe((cliente) => { 
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente', `El cliente ${cliente.nombre} ha sido creado con exito`, 'success')
      },
      err => {
        this.errores = err.error.errors as String[];
        console.error('Código del error desde el backend: '+ err.status);
        console.error(err.error.errors);
      }      
    );
  }

  update(): void {
    this.clienteService.update(this.cliente)
    .subscribe((json) => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado', `${json.mensaje} : ${json.cliente.nombre}`, 'success') // mensaje y cliente están en el back
    },
    err => {
      this.errores = err.error.errors as String[];
      console.error('Código del error desde el backend: '+ err.status);
      console.error(err.error.errors);
    })
  }

}
