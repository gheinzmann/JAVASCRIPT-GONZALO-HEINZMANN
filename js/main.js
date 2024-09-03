let nombre = prompt("Introduce tu nombre").toUpperCase();
console.log(nombre);
let apellido = prompt("Introduce tu apellido").toUpperCase();
console.log(apellido);
let menordeedad = true;
do {
    let edad = prompt("Introduce tu edad:");
     if ((edad == "")||(edad == null)) {
        alert("Por favor, introduce una edad válida.");
      } else if (Number(edad) >= 18) {
        alert("Bienvenido a nuestro sitio web " + nombre + " " + apellido);
        menordeedad = false;
        console.log(edad)
    } else if (Number(edad) < 18) {
        alert("Disculpe, para acceder al sitio web debe ser mayor de edad.");
        break;
        /*Aca deberia poner algo para que no muestre la pagina*/
    } else {
        alert("Por favor, introduce una edad válida.");
    }
} while (menordeedad);
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