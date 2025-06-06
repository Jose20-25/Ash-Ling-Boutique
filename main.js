// Tarjetas de categorías
const categorias = [
    { nombre: 'Carteras', carpeta: 'carteras', icono: 'iconos/cartera.png', descripcion: 'Encuentra carteras elegantes, casuales y mini para cada ocasión.' },
    { nombre: 'Ropa', carpeta: 'ropa', icono: 'iconos/ropa.png', descripcion: 'Vestidos, blusas y pantalones con estilo y calidad boutique.' },
    { nombre: 'Perfumes', carpeta: 'perfumes', icono: 'iconos/perfume.png', descripcion: 'Fragancias exclusivas para resaltar tu personalidad.' },
    { nombre: 'Joyas', carpeta: 'joyas', icono: 'iconos/joyas.png', descripcion: 'Collares, pulseras y aretes que complementan tu look.' }
];

const categoriasAside = document.querySelector('.categorias-tarjetas');
categoriasAside.innerHTML = categorias.map(cat => `
    <div class="tarjeta-categoria" onclick="mostrarProductos('${cat.carpeta}')">
        <img src="${cat.icono}" alt="${cat.nombre}" class="icono-categoria">
        <h4>${cat.nombre}</h4>
        <p>${cat.descripcion}</p>
    </div>
`).join('');

// Mostrar solo la sección seleccionada
definirMenu();

function definirMenu() {
    const menuOpciones = [
        { id: 'nav-inicio', seccion: 'seccion-inicio' },
        { id: 'nav-carteras', seccion: 'seccion-carteras' },
        { id: 'nav-perfumes', seccion: 'seccion-perfumes' },
        { id: 'nav-joyas', seccion: 'seccion-joyas' },
        { id: 'nav-ropa', seccion: 'seccion-ropa' },
        { id: 'nav-redes', seccion: 'seccion-redes' },
        { id: 'nav-compras', seccion: 'seccion-compras' }
    ];
    menuOpciones.forEach(op => {
        const el = document.getElementById(op.id);
        if (el) el.onclick = () => mostrarSeccion(op.seccion);
    });
}

function mostrarSeccion(id) {
    document.querySelectorAll('.seccion-menu').forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Renderizado de productos por sección
function renderProductos(seccion, productos, titulo) {
    const cont = document.getElementById(seccion);
    cont.innerHTML = `<h2 style='color:#eab676; font-size:2rem; margin-bottom:2rem;'>${titulo}</h2><div class='productos-lista'></div>`;
    const lista = cont.querySelector('.productos-lista');
    productos.forEach(prod => {
        lista.innerHTML += `
            <div class='producto'>
                <img src='${prod.imagen}' alt='${prod.nombre}' onerror="this.style.display='none'">
                <h3>${prod.nombre}</h3>
                <p><b>Código:</b> ${prod.codigo}</p>
                <p><b>Precio:</b> $${prod.precio}</p>
                <p>${prod.descripcion}</p>
            </div>
        `;
    });
}

// Productos de muestra por categoría
const productosCarteras = [
    { codigo: 'CAR001', nombre: 'Cartera Rosada', descripcion: 'Cartera rosada elegante y moderna, ideal para cualquier ocasión.', imagen: 'carteras/Cartera Rosada.jpg', precio: 1200 }
];
const productosRopa = [
    { codigo: 'ROP001', nombre: 'Vestido Azul', descripcion: 'Vestido azul de alta calidad, perfecto para eventos especiales.', imagen: 'ropa/Vestido Azul.jpg', precio: 1500 }
];
const productosPerfumes = [
    { codigo: 'PER001', nombre: 'Perfume Darin', descripcion: 'Perfume Darin, fragancia exclusiva y duradera.', imagen: 'perfumes/Perfume Darin.jpg', precio: 1100 }
];
const productosJoyas = [
    { codigo: 'JOY001', nombre: 'Anillo con diamante', descripcion: 'Anillo con diamante, sofisticado y brillante para ocasiones únicas.', imagen: 'joyas/anillo con diamante.jpeg', precio: 2000 }
];

// Renderizar productos en cada sección
renderProductos('seccion-carteras', productosCarteras, 'Carteras');
renderProductos('seccion-ropa', productosRopa, 'Ropa');
renderProductos('seccion-perfumes', productosPerfumes, 'Perfumes');
renderProductos('seccion-joyas', productosJoyas, 'Joyas');

// Sección inicio
const inicio = document.getElementById('seccion-inicio');
inicio.innerHTML = `<h2 style='color:#eab676; font-size:2rem; margin-bottom:2rem;'>Bienvenido a AshLing Boutique</h2><p style='font-size:1.2rem; color:#222; max-width:600px; margin:0 auto;'>Descubre nuestra tienda en línea con productos exclusivos en carteras, ropa, perfumes y joyas. Haz clic en las opciones del menú para explorar cada categoría.</p>`;

// Sección redes sociales
const redes = document.getElementById('seccion-redes');
redes.innerHTML = `<h2 style='color:#eab676; font-size:2rem; margin-bottom:2rem;'>Síguenos en redes sociales</h2><p style='font-size:1.2rem; color:#222;'>Instagram: <a href='#' style='color:#eab676;'>@ashling.boutique</a><br>Facebook: <a href='#' style='color:#eab676;'>AshLing Boutique</a></p>`;

// Sección compras
const compras = document.getElementById('seccion-compras');
compras.innerHTML = `<h2 style='color:#eab676; font-size:2rem; margin-bottom:2rem;'>Tu carrito de compras</h2><p style='font-size:1.2rem; color:#222;'>Aquí aparecerán los productos que agregues al carrito.</p>`;

// Productos de muestra por categoría
const productosPorCategoria = {
    carteras: [
        { codigo: 'CAR001', nombre: 'Cartera Rosada', descripcion: 'Cartera rosada elegante y moderna, ideal para cualquier ocasión.', imagen: 'carteras/Cartera Rosada.jpg', precio: 1200 }
    ],
    ropa: [
        { codigo: 'ROP001', nombre: 'Vestido Azul', descripcion: 'Vestido azul de alta calidad, perfecto para eventos especiales.', imagen: 'ropa/Vestido Azul.jpg', precio: 1500 }
    ],
    perfumes: [
        { codigo: 'PER001', nombre: 'Perfume Darin', descripcion: 'Perfume Darin, fragancia exclusiva y duradera.', imagen: 'perfumes/Perfume Darin.jpg', precio: 1100 }
    ],
    joyas: [
        { codigo: 'JOY001', nombre: 'Anillo con diamante', descripcion: 'Anillo con diamante, sofisticado y brillante para ocasiones únicas.', imagen: 'joyas/anillo con diamante.jpeg', precio: 2000 }
    ]
};

window.mostrarProductos = function(categoria) {
    const productos = productosPorCategoria[categoria] || [];
    const productosCentral = document.getElementById('productos-central');
    productosCentral.innerHTML = `<h2 class='bienvenida-central'>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2><div class='productos-lista'>` +
        productos.map(prod => `
            <div class='producto'>
                <img src='${prod.imagen}' alt='${prod.nombre}' onerror="this.style.display='none'">
                <h3>${prod.nombre}</h3>
                <p><b>Código:</b> ${prod.codigo}</p>
                <p><b>Precio:</b> $${prod.precio}</p>
                <p>${prod.descripcion}</p>
                <button class='btn-carrito' onclick='agregarAlCarrito(${JSON.stringify(prod)})'>Agregar al carrito</button>
            </div>
        `).join('') + '</div>';
};

window.agregarAlCarrito = function(prod) {
    carrito.push(prod);
    renderCarrito();
};

// Inicializar carrito vacío
renderCarrito();
