import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotaService } from '../../services/mascota.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-agregar-mascota',
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css']
})
export class AgregarMascotaComponent {

  // Propiedades
  mascotaForm: FormGroup = new FormGroup({});
  enviado: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private mascotaService: MascotaService
  ) {
    this.mainForm();
  }

  // Método para definir el formulario
  mainForm() {
    this.mascotaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      fechaDeLlegada: ['', [Validators.required]],
      estadoAdopcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      descripcionLlegada: ['', [Validators.required]],
      esterilizado: [null]
    });
  }

  // Getter para acceder a los controles del formulario
  get myForm() {
    return this.mascotaForm.controls;
  }

  // Método que se ejecuta cuando se hace el submit
onSubmit() {
  this.enviado = true;
  if (!this.mascotaForm.valid) {
    return;
  } else {
    // Convertir "Sí" y "No" en valores booleanos
    const formData = this.mascotaForm.value;
    formData.esterilizado = formData.esterilizado === 'Sí';  // Convierte "Sí" a true y "No" a false

    this.mascotaService.agregarMascota(formData).subscribe({
      next: (response) => {
        console.log('Mascota agregada correctamente');
        this.router.navigate(['/listar-mascotas']);
      },
      error: (e) => {
        console.log('Error al agregar la mascota', e);
      }
    });
  }
}

}
