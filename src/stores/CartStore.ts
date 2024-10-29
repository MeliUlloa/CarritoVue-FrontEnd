import { defineStore } from "pinia"; // defineStore de Pinia: Es el core de Pinia que se usa para definir una tienda de estado (store).Aquí crea y configura un store llamado CartStore para el carrito. 
import type { Book } from '@/models/BookModel'
import type { CartState } from "@/models/CartState";

// type { Book } y type { CartState }: Estos son tipos de TypeScript. 
// Book define el tipo de objeto libro con propiedades como id, title, y price, y CartState describe el estado inicial del carrito (con propiedades como loading, data, total, y booksOnCart). 
// Esto ayuda a detectar errores en el código y a tener un mejor control sobre los datos.


// Se inicializa el estado con:
// loading en false 
// data sera un arreglo vacio 
// total estara en 0
// BooksOnCart tambien estara en 0 
// esto es asi porque inicialmente el carro etsa vacio 

// Al estructurar state como una función que devuelve un objeto (() : CartState => ({})), 
// Vue garantiza que cada instancia de la tienda tenga su propio estado y no esté compartido 
// entre diferentes usuarios o sesiones

export const useCartStore = defineStore({
    id: "cart", // este es un nombre que le colocamos a la constante para identificarla y que luego se entiende
    state: () : CartState => ({
        loading: false,
        data: [],
        total: 0 ,
        booksOnCart: 0
    }),
    actions: {
        // se declara como void la funsion porque no devuelve nada
        // function para añadir un libro al carrito 
        addBookToCart(book:Book): void {
            this.data.push(book)
            this.booksOnCart++
            this.total += book.price
        },
        // function para remover un libro al carrito
        removeBookFromCart(book: Book): void {
            this.data = this.data.filter(item => item.id !== book.id)
            this.booksOnCart--
            this.total -= book.price
        },
        // function para limpiar el carrito
        clearCart():void {
            this.data = []
        },
        // function para obtener la cantidad de libros en el carrito
        getAmountOfBooksOnCart(): number {
            return this.booksOnCart
        },
        // function para obtener el precio total de loslibros en el carrito
        getTotalPrice(): number {
            return this.total
        }
    }
})