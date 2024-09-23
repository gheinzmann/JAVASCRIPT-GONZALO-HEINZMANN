

function mostrarNombre() {
    let nombre = document.getElementById("nombreInput").value;
    let contenedor = document.createElement("div");
    contenedor.innerHTML = "<p> BIENVENIDO " + nombre + "</p> <button id='boton-siguiente'>Siguiente</button>"
    document.body.appendChild(contenedor);
}
function aa() {alert("blabla")}

let boton2 = getElementById("boton-siguiente");

boton2.addEventListener("click", aa)

const IVA = 1.21
const productos = [
    { nombre: "FRUTALCREAM", precio: 1000 },
    { nombre: "ENSALADA DE FRUTA", precio: 2000 },
    { nombre: "PANQUEQUE", precio: 3000 }
];
function mostrarproductos() {
    console.log("Productos disponibles:");
    /*funcion each buscada en chatGPT*/
    productos.forEach(producto => {
        console.log(producto.nombre);
    });
}
function calcularIVA (precio) {
    if (parseFloat(precio)) {
        return precio * IVA;
    }
    return 0;
};
function calcularpreciofinal() {
    let productoencontrado = null;
    while (!productoencontrado) {
        let nombreproducto = prompt("Ingrese el nombre del producto");
        /*funcion find buscada en chatGPT*/
        productoencontrado = productos.find(producto => producto.nombre.toUpperCase() === nombreproducto.toUpperCase());

        if (!productoencontrado) {
            alert("Producto no encontrado, por favor intente de nuevo.");
        }
    }
    let preciosiniva = productoencontrado.precio;
    let preciofinal = calcularIVA(preciosiniva);
    console.log("El precio final de " + productoencontrado.nombre + " con IVA es: $" + preciofinal);
}
mostrarproductos()
calcularpreciofinal()

/*
-DOM
-Eventos
-LocalStorage
-NADA de prompt, alert, confirm
-Arrays de objetos y funciones de orden superior
-ENTREGAR POR GITHUB*/