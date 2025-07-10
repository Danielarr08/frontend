export class Mascota {
  nombre!: string;
  fechaDeLlegada!: string;
  tipo!: 'Perro' | 'Gato' | 'Otro';
  estadoAdopcion!: 'Disponible' | 'Adoptada' | 'En proceso';
  genero!: 'Macho' | 'Hembra';
  descripcionLlegada!: string;
  esterilizado!: boolean;
}
