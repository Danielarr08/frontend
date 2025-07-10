import { Component, OnInit } from '@angular/core'; 
import { MascotaService } from '../../services/mascota.service';  // Servicio para manejar mascotas
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-mascotas',
  imports: [RouterLink, CommonModule],
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css']
})
export class ListaMascotasComponent implements OnInit {

  // Propiedades
  listaMascotas: any = [];

  constructor(private mascotaService: MascotaService) {
    this.getMascotas();
  }

  ngOnInit(): void {}

  // Método que hace la petición al service para obtener las mascotas
  getMascotas() {
    this.mascotaService.getMascotas().subscribe((data) => {
      this.listaMascotas = data;
    });
  }

  // Método para eliminar una mascota
  eliminarMascota(mascota: any, index: any) {
    if (window.confirm('¿Estás seguro que deseas eliminar esta mascota?')) {
      this.mascotaService.eliminarMascota(mascota._id)
        .subscribe((data) => {
          this.listaMascotas.splice(index, 1);  // Elimina la mascota del listado
        });
    }
  }

  // Función que asigna el color de fondo según el estado de adopción de la mascota
  getRowColor(estadoAdopcion: string): string {
    switch (estadoAdopcion) {
      case 'Disponible':
        return 'bg-rojo';  // Rojo para "Disponible"
      case 'Adoptada':
        return 'bg-verde';  // Verde para "Adoptada"
      case 'En proceso':
        return 'bg-amarillo';  // Amarillo para "En proceso"
      default:
        return '';  // Sin color si no coincide
    }
  }
}
