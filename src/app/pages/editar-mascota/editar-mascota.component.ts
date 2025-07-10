import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MascotaService } from '../../services/mascota.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-mascota',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.css']
})
export class EditarMascotaComponent implements OnInit {

  // Propiedades
  editarMascotaForm: FormGroup = new FormGroup({});
  enviado: boolean = false;
  mascotaData: any = {};

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private mascotaService: MascotaService,
    private actRoute: ActivatedRoute
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getMascota(id);
  }

  // Método para definir el formulario
  mainForm() {
    this.editarMascotaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      fechaDeLlegada: ['', [Validators.required]],
      tipo: ['', [Validators.required]],  // Agregado para el tipo de mascota
      estadoAdopcion: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      descripcionLlegada: ['', [Validators.required]],
      esterilizado: [false]  // Por defecto, no esterilizado
    });
  }

  // Método para obtener la mascota que vamos a modificar
  getMascota(id: any) {
    this.mascotaService.getMascota(id).subscribe((data) => {
      this.editarMascotaForm.setValue({
        nombre: data['nombre'],
        fechaDeLlegada: data['fechaDeLlegada'],
        tipo: data['tipo'],  // Agregado para el tipo de mascota
        estadoAdopcion: data['estadoAdopcion'],
        genero: data['genero'],
        descripcionLlegada: data['descripcionLlegada'],
        esterilizado: data['esterilizado']
      });
    });
  }

  // Getter para acceder a los controles del formulario
  get myForm() {
    return this.editarMascotaForm.controls;
  }

  // Método que se ejecuta cuando se hace el submit
  onSubmit() {
    this.enviado = true;
    if (!this.editarMascotaForm.valid) {
      return false;
    } else {
      if (window.confirm('¿Estás seguro que deseas modificar los datos de esta mascota?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.mascotaService.actualizarMascota(id, this.editarMascotaForm.value)
          .subscribe({
            complete: () => {
              this.router.navigateByUrl('/listar-mascotas');
              console.log('Se actualizó correctamente');
            },
            error: (e) => {
              console.log(e);
            }
          });
      }
    }
    return;
  }
}
