import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Apellidos: ['', [Validators.required]],
      Telefono: ['', [Validators.required, Validators.minLength(6)]],
      Correo: ['', [Validators.required, Validators.email]],
    });

id: string=''

  buscarRegistro(id: string){
  this.usuarioService.getWithId(id).subscribe((data: UsuarioModel) => {
    console.log(data)
    this.fgValidacion.controls["id"].setValue(id)
    //this.fgValidacion.controls["Nombre"].setValue(data.Nombre)
    //this.fgValidacion.controls["Apellidos"].setValue(data.Apellidos)
    //this.fgValidacion.controls["Correo"].setValue(data.Correo)
    //this.fgValidacion.controls["Telefono"].setValue(data.Telefono)
  })
  }
  edit(){
    let usuario = new UsuarioModel();
    usuario.id = this.fgValidacion.controls["id"].value as string;
    usuario.Nombre = this.fgValidacion.controls["Nombre"].value as string;
    usuario.Apellidos = this.fgValidacion.controls["Apellidos"].value as string;
    usuario.Correo = this.fgValidacion.controls["Correo"].value as string;
    usuario.Telefono = this.fgValidacion.controls["Telefono"].value as string;
 
    this.usuarioService.update(usuario).subscribe((data: UsuarioModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
  
  ngOnInit(): void {let id = this.route.snapshot.params["id"]
  this.getWithId(id)
  }

  getWithId(id: string){
    this.usuarioService.getWithId(id).subscribe((data: UsuarioModel) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["Nombre"].setValue(data.Nombre as string)
      this.fgValidacion.controls["Apellidos"].setValue(data.Apellidos as string)
      this.fgValidacion.controls["Correo"].setValue(data.Correo as string)
      this.fgValidacion.controls["Telefono"].setValue(data.Telefono as string)
    })
  }

}