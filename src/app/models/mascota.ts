export class Mascota {
  nombre!: string;
  fechaDeLlegada!: string;
  estadoAdopcion!: 'Disponible' | 'Adoptada' | 'En proceso';
  genero!: 'Macho' | 'Hembra';
  descripcionLlegada!: string;
  esterilizado!: boolean;
}
