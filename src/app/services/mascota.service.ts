import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  // Atributos
  baseUri: string = 'http://localhost:4000/api';  // Cambia esto con la URL de tu backend de mascotas
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Método para agregar una mascota
  agregarMascota(data: any): Observable<any> {
    let url = `${this.baseUri}/agregar`;  // Ruta para agregar mascota
    return this.http.post(url, data, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  // Método para obtener todas las mascotas
  getMascotas(): Observable<any> {
    let url = `${this.baseUri}/mascotas`;  // Ruta para obtener mascotas
    return this.http.get(url)
      .pipe(catchError(this.errorManager));
  }

  // Método para obtener una mascota por ID
  getMascota(id: any): Observable<any> {
    let url = `${this.baseUri}/mascota/${id}`;  // Ruta para obtener mascota por ID
    return this.http.get(url, { headers: this.headers })
      .pipe(map((res: any) => res || {}),
        catchError(this.errorManager));
  }

  // Método para actualizar una mascota
  actualizarMascota(id: any, data: any): Observable<any> {
    let url = `${this.baseUri}/actualizar/${id}`;  // Ruta para actualizar mascota
    return this.http.put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  // Método para eliminar una mascota
  eliminarMascota(id: any): Observable<any> {
    let url = `${this.baseUri}/eliminar/${id}`;  // Ruta para eliminar mascota
    return this.http.delete(url, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  // Manejador de errores
  errorManager(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Obtenemos el error del lado del cliente
      errorMessage = error.error.message;
    } else {
      // Obtenemos el error del lado del servidor
      errorMessage = `Error: ${error.status} \n Mensaje: ${error.message}`;
    }
    console.log(error.message);
    return throwError(() => errorMessage);
  }
}
