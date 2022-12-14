import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) { }
    fgValidacion = this.fb.group({
      Nombre: ['', [Validators.required]],
      Apellidos: ['', [Validators.required]],
      Telefono: ['', [Validators.required, Validators.minLength(6)]],
      Correo: ['', [Validators.required, Validators.email]],
    });
  ngOnInit(): void {
  }
  store(){
    let usuario = new UsuarioModel();
    usuario.Nombre = this.fgValidacion.controls["Nombre"].value as string;
    usuario.Apellidos = this.fgValidacion.controls["Apellidos"].value as string;
    usuario.Correo = this.fgValidacion.controls["Correo"].value as string;
    usuario.Telefono = this.fgValidacion.controls["Telefono"].value as string;
 
    this.usuarioService.store(usuario).subscribe((data: UsuarioModel)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
}
