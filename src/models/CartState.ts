// Se define CartState.ts para menjar ele stado del carro de libros
import type { Book } from "./BookModel";

export interface CartState {
    loading: boolean,
    data: Book[], //arreglo de libros
    booksOnCart: number, // numero para guardar la cantidad de libros que estan en el carro 
    total: number // numero que almacenara el costo total de los libros que estan dentro del carro 
}