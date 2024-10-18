document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function agregarProducto(nombre, descripcion, precioMediano, precioGrande, imagen) {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.innerHTML = `
            <div class="img-producto">
                <img src="${imagen}" alt="${nombre}">
            </div>
            <div class="parrafo-producto">
                <h3>${nombre}</h3>
                <p>${descripcion}</p>
                <p>CHICO</p>
                <p>$${precioMediano}</p>
                <div class="control-cantidad">
                    <button class="minus-mediano">-</button>
                    <input class="cantidad-mediano" type="number" value="0" min="0" readonly>
                    <button class="plus-mediano">+</button>
                </div>
                <p>GRANDE</p>
                <p>$${precioGrande}</p>
                <div class="control-cantidad">
                    <button class="minus-grande">-</button>
                    <input class="cantidad-grande" type="number" value="0" min="0" readonly>
                    <button class="plus-grande">+</button>
                </div>
                <button class="agregar-carrito" data-producto="${nombre}" data-precio-mediano="${precioMediano}" data-precio-grande="${precioGrande}">Agregar al carrito</button>
            </div>
        `;
        productosContainer.appendChild(productoDiv);
        agregarEventosProducto(productoDiv);
    }

    function agregarEventosProducto(productoDiv) {
        const minusMedianoBtn = productoDiv.querySelector('.minus-mediano');
        const plusMedianoBtn = productoDiv.querySelector('.plus-mediano');
        const medianoInput = productoDiv.querySelector('.cantidad-mediano');
        const minusGrandeBtn = productoDiv.querySelector('.minus-grande');
        const plusGrandeBtn = productoDiv.querySelector('.plus-grande');
        const grandeInput = productoDiv.querySelector('.cantidad-grande');
        const agregarCarritoBtn = productoDiv.querySelector('.agregar-carrito');

        function updateCantidad(input, increment) {
            let cantidad = parseInt(input.value);
            if (isNaN(cantidad)) cantidad = 0;
            cantidad += increment;
            if (cantidad < 0) cantidad = 0;
            input.value = cantidad;
        }

        minusMedianoBtn.addEventListener('click', () => updateCantidad(medianoInput, -1));
        plusMedianoBtn.addEventListener('click', () => updateCantidad(medianoInput, 1));
        minusGrandeBtn.addEventListener('click', () => updateCantidad(grandeInput, -1));
        plusGrandeBtn.addEventListener('click', () => updateCantidad(grandeInput, 1));

        agregarCarritoBtn.addEventListener('click', () => {
            const cantidadMediano = parseInt(medianoInput.value);
            const cantidadGrande = parseInt(grandeInput.value);

            if (cantidadMediano > 0 || cantidadGrande > 0) {
                agregarAlCarrito({
                    nombre: agregarCarritoBtn.dataset.producto,
                    cantidadMediano,
                    cantidadGrande,
                    precioMediano: parseFloat(agregarCarritoBtn.dataset.precioMediano),
                    precioGrande: parseFloat(agregarCarritoBtn.dataset.precioGrande)
                });
            }
        });
    }

    function agregarAlCarrito(producto) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('Producto agregado al carrito');
    }

    agregarProducto('MIX FRUTAL', 'Cinco variedades de frutas de estación. Sin ningún agregado.', 1800, 3400, '../assets/mixfrutal.jpg');
    agregarProducto('BUDINES', 'Budines de distintas variedades.', 2000, 3200, '../assets/budines.jpg');
    agregarProducto('FRUTILLAS CON CREMA', 'Frutillas y crema chantilly.', 2700, 5400, '../assets/frutilla.jpg');
    agregarProducto('LIMONADA', 'Jugo de limonada con menta y jengibre.', 1800, 2700, '../assets/limonada.jpg');
});

document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoChicoContainer = document.getElementById('carrito-chico');
    const carritoGrandeContainer = document.getElementById('carrito-grande');
    let total = 0;
    let mensajeWhatsApp = "Hola, quisiera comprar lo siguiente:\n";

    function eliminarProducto(index, tipo) {
        if (tipo === 'chico') {
            carrito[index].cantidadMediano = 0;
        } else if (tipo === 'grande') {
            carrito[index].cantidadGrande = 0;
        }
        if (carrito[index].cantidadMediano === 0 && carrito[index].cantidadGrande === 0) {
            carrito.splice(index, 1);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
        location.reload(); 
    }

    carrito.forEach((producto, index) => {
        if (producto.cantidadMediano > 0) {
            const itemChico = document.createElement('li');
            itemChico.innerHTML = `${producto.nombre} (Chico) - Cantidad: ${producto.cantidadMediano} - Total: $${producto.cantidadMediano * producto.precioMediano} 
            <button class="btn btn-danger btn-sm eliminar-item" data-index="${index}" data-tipo="chico">X</button>`;
            carritoChicoContainer.appendChild(itemChico);
            total += producto.cantidadMediano * producto.precioMediano;
            mensajeWhatsApp += `${producto.cantidadMediano} de ${producto.nombre} (Chico) - Total: $${producto.cantidadMediano * producto.precioMediano}\n`;
        }
        if (producto.cantidadGrande > 0) {
            const itemGrande = document.createElement('li');
            itemGrande.innerHTML = `${producto.nombre} (Grande) - Cantidad: ${producto.cantidadGrande} - Total: $${producto.cantidadGrande * producto.precioGrande} 
            <button class="btn btn-danger btn-sm eliminar-item" data-index="${index}" data-tipo="grande">X</button>`;
            carritoGrandeContainer.appendChild(itemGrande);
            total += producto.cantidadGrande * producto.precioGrande;
            mensajeWhatsApp += `${producto.cantidadGrande} de ${producto.nombre} (Grande) - Total: $${producto.cantidadGrande * producto.precioGrande}\n`;
        }
    });

    mensajeWhatsApp += `\nTotal a pagar: $${total}`;

    document.getElementById('total-precio').textContent = `Total: $${total}`;

    document.querySelectorAll('.eliminar-item').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const tipo = this.getAttribute('data-tipo');
            eliminarProducto(index, tipo);
        });
    });

    document.getElementById('comprar-todo').addEventListener('click', () => {
        const urlWhatsapp = `https://wa.me/5493492644896?text=${encodeURIComponent(mensajeWhatsApp)}`;
        window.open(urlWhatsapp, '_blank');
    });
});

document.getElementById('vaciar-carrito').addEventListener('click', () => {
    localStorage.removeItem('carrito');
    document.getElementById('carrito-chico').innerHTML = '';
    document.getElementById('carrito-grande').innerHTML = '';
    document.getElementById('total-precio').textContent = 'Total: $0';

    alert('El carrito ha sido vaciado.');
});
