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
      .subscribe(cliente => { 
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} creado con exito!`, 'success')
      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con exito!`, 'success')
    })
  }

}
