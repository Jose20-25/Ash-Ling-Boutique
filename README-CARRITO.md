# Sistema de Carrito Unificado - AhsLing Boutique

## 📋 Descripción
Este sistema de carrito unificado permite a los usuarios agregar productos de todas las páginas de la tienda (Carteras, Ropa de Dama, Ropa de Caballero, Perfumes y Accesorios) a un carrito global que persiste entre las páginas usando localStorage.

## 🚀 Características Principales

### ✅ Carrito Global Unificado
- **Persistencia**: Los productos se mantienen en el carrito al navegar entre páginas
- **LocalStorage**: Los datos se guardan localmente en el navegador
- **Contador dinámico**: Muestra el número total de productos en todas las páginas
- **Modal responsivo**: Interfaz moderna y adaptable para todos los dispositivos

### ✅ Funcionalidades Implementadas
- ➕ **Agregar productos** al carrito desde cualquier página
- 🔢 **Modificar cantidades** directamente en el modal del carrito
- 🗑️ **Eliminar productos** individuales del carrito
- 🧹 **Limpiar carrito** completo con un solo clic
- 📱 **Envío a WhatsApp** con formato profesional del pedido
- 🔍 **Vista rápida** de productos en modal
- ❤️ **Favoritos** (funcionalidad local por página)

### ✅ Notificaciones y UX
- 🎉 **Notificaciones animadas** al agregar productos
- ⚡ **Animaciones suaves** en botones y elementos
- 📊 **Contador visible** con animaciones de escala
- 🎨 **Diseño consistente** en todas las páginas

## 📁 Archivos Principales

### `cart-global.js`
Archivo principal que contiene la clase `ShoppingCart` con toda la lógica del carrito:
- Gestión de productos (agregar, eliminar, modificar)
- Persistencia con localStorage
- Interfaz de usuario del modal
- Integración con WhatsApp
- Sistema de notificaciones

### Páginas Actualizadas
- ✅ `index.html` - Página principal
- ✅ `carteras.html` - Carteras y bolsos
- ✅ `ropa-dama.html` - Ropa femenina
- ✅ `ropa-caballero.html` - Ropa masculina
- ✅ `perfumes.html` - Fragancias
- ✅ `accesorios.html` - Accesorios y complementos (nueva página)

## 🔧 Implementación Técnica

### Estructura del Producto
```javascript
{
    id: "unique-product-id",
    title: "Nombre del Producto",
    code: "Código: ABC123",
    image: "ruta/imagen.jpg",
    description: "Descripción del producto",
    category: "Categoría",
    quantity: 1,
    addedAt: "2025-01-07T..."
}
```

### Uso del Carrito Global
```javascript
// Agregar producto (automático desde botones)
globalCart.addToCart(productObject);

// Abrir modal del carrito
globalCart.openCartModal();

// Obtener total de items
globalCart.getTotalItems();
```

### Integración en Páginas
Cada página incluye:
```html
<!-- Scripts necesarios -->
<script src="cart-global.js"></script>
<script src="script.js"></script>

<!-- Icono del carrito clickeable -->
<div class="cart-icon" onclick="globalCart?.openCartModal()" style="cursor: pointer;">
    <i class="fas fa-shopping-cart"></i>
    <span class="cart-count">0</span>
</div>
```

## 📱 Integración con WhatsApp

### Número de WhatsApp
- **Número**: +503 7794 6880 7
- **Formato**: Internacional con código de país

### Mensaje Automático
El sistema genera automáticamente un mensaje estructurado que incluye:
- 📝 Saludo personalizado
- 📦 Lista detallada de productos con códigos
- 🔢 Cantidades solicitadas
- 📊 Total de productos
- ❓ Solicitud de información sobre precios, disponibilidad y entrega

### Ejemplo de Mensaje
```
¡Hola! Me interesa solicitar información sobre los siguientes productos de *AhsLing Boutique*:

1. *Cartera Elegante Rosa*
   📦 Código: BHH027
   📊 Cantidad: 2

2. *Perfume Floral Delicado*
   📦 Código: 258872
   📊 Cantidad: 1

📋 *Total de productos:* 3

Por favor, envíenme más información sobre:
• Disponibilidad
• Precios
• Formas de pago
• Tiempos de entrega

¡Gracias! 😊
```

## 🎨 Diseño y UX

### Estilo Visual
- 🌈 **Gradientes modernos**: Azul a púrpura (#667eea → #764ba2)
- ✨ **Animaciones suaves**: Transiciones de 0.3s
- 📱 **Responsive**: Adaptable a móviles y tablets
- 🎯 **Accesibilidad**: Contraste adecuado y navegación por teclado

### Notificaciones
- 🎉 **Aparición**: Slide desde la derecha
- ⏱️ **Duración**: 3 segundos automático
- ❌ **Cierre**: Manual o automático
- 📍 **Posición**: Esquina superior derecha

### Modal del Carrito
- 🖼️ **Backdrop**: Fondo difuminado
- 📏 **Tamaño**: Responsivo (90% móvil, 600px desktop)
- 🎭 **Animación**: Slide-in con escala
- 🎨 **Header**: Gradiente con iconos Font Awesome

## 🔄 Flujo del Usuario

1. **Navegación**: Usuario navega por las páginas de productos
2. **Selección**: Hace clic en "Agregar al Carrito" en cualquier producto
3. **Notificación**: Ve confirmación visual animada
4. **Contador**: El número en el icono del carrito se actualiza
5. **Revisión**: Puede abrir el carrito haciendo clic en el icono
6. **Gestión**: Modifica cantidades o elimina productos
7. **Pedido**: Envía el pedido completo por WhatsApp
8. **Persistencia**: El carrito se mantiene al cambiar de página

## 🛡️ Características de Seguridad

- ✅ **Validación de datos**: Verificación de estructura de productos
- ✅ **Sanitización**: Limpieza de datos antes de enviar a WhatsApp
- ✅ **Error handling**: Manejo de errores graceful
- ✅ **Fallbacks**: Funcionalidad degradada si hay problemas

## 📊 Beneficios del Sistema Unificado

### Para el Usuario
- 🛒 **Experiencia fluida**: Un solo carrito para toda la tienda
- 💾 **No pierden productos**: Persistencia entre sesiones
- 📱 **Fácil contacto**: Envío directo a WhatsApp
- 🎯 **Interfaz intuitiva**: Diseño moderno y familiar

### Para el Negocio
- 📈 **Más conversiones**: Facilita el proceso de compra
- 📞 **Contacto directo**: Los clientes llegan por WhatsApp
- 📋 **Información completa**: Reciben pedidos estructurados
- 🔄 **Retención**: Los usuarios pueden volver y mantener su carrito

## 🚀 Próximas Mejoras Sugeridas

- 💰 **Precios**: Agregar sistema de precios y totales
- 🏷️ **Descuentos**: Sistema de cupones y ofertas
- 📧 **Email**: Opción de envío por correo electrónico
- 🔐 **Usuarios**: Sistema de cuentas y historial
- 🚚 **Envíos**: Calculadora de costos de envío
- 💳 **Pagos**: Integración con pasarelas de pago

---

**Desarrollado con ❤️ para AhsLing Boutique**
*Sistema implementado en enero 2025*
