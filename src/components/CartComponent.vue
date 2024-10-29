<script setup lang="ts">
import { useCartStore } from '@/stores/CartStore';
import { XCircleIcon } from '@heroicons/vue/24/outline';
import { reactive } from 'vue';

// se instancia el cartStore y se hace reactivo porque va a cambiar a lo largo de la ejecucion 

const cartStore = useCartStore();
const cart = reactive(cartStore); 
//reactive: Convierte cartStore en un objeto reactivo (con el nombre cart) 
//para que cualquier cambio en el estado de la tienda se refleje automáticamente en el componente.

</script>

<template>
    <div class="cart-content">
        <div v-show="cart.booksOnCart === 0" class="empty-cart">
            <h2 class="text-2xl">No hay nada por aca!</h2>
            <FaceFrownIcon class="h-10 w-10 "></FaceFrownIcon>
        </div>
        <!--Carrito vacío (v-show="cart.booksOnCart === 0"): Muestra un mensaje y un ícono de "cara triste" 
        si booksOnCart es 0, indicando que el carrito está vacío.-->

        <div v-for="book in cart.data" :key="book.id" class="cart-item">
            <div class="cart-item__image">
                <img :src="book.coverImg" v-bind:alt="book.title">
            </div>
            <div class="cart-item__item">
                <p class="font-semibold">{{ book.title }}</p>
                <p class="font-thin">{{ book.author }}</p>
                <p>$ {{ book.price }}.00</p>
            </div>
            <!--Libros en el carrito (v-for="book in cart.data"): Renderiza una lista de libros, 
            iterando a través del array cart.data. 
            Cada libro se representa con su imagen, título, autor y precio.-->

            <div @click="cart.removeBookFromCart(book)" class="cart-item__remove">
                <XCircleIcon class="w-6 h-6 " />
            </div>
            <!--Eliminar libro (@click="cart.removeBookFromCart(book)"): Al hacer clic en el icono XCircleIcon, 
            se llama a la función removeBookFromCart, eliminando el libro específico del carrito.-->
        </div>

        <div v-show="cart.booksOnCart !== 0" class="checkout">
            <h1 class="total text-3xl">$ {{ cart.getTotalPrice() }}.00</h1>
            <button v-bind:disabled="cart.booksOnCart === 0">Ir al Check Out</button>
        </div>
        <!--Resumen de precios y botón de "Check Out":
        Muestra el precio total (cart.getTotalPrice()).
        El botón "Ir al Check Out" está desactivado si booksOnCart es 0 (:disabled="cart.booksOnCart === 0"), 
        impidiendo el checkout si el carrito está vacío.-->
    </div>
    
</template>

<style scoped>
.cart-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    height: 100%;
    max-height: 100%;
    overflow: auto;
    width: 100%;
    padding: 16px
}

.empty-cart {
    margin: auto;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center
}

.cart-item {
    margin: 4px 0;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    padding: 8px 16px;
    background: #fff;
}

.cart-item__image img {
    height: 80px;
}

.cart-item__item {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.checkout {
    position: absolute;
    width: 100%;
    bottom: 0;
    right: 0;
    height: 100px;
    padding: 16px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.checkout button {
    height: 50px;
    width: 250px;
    border-radius: 5px;
    border: 2px solid var(--primary);
    color: var(--primary);
    padding: 8px 16px;
}

.checkout button:hover {
    background: var(--primary);
    color: #fff;
}
</style>