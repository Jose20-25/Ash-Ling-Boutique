/**
 * Sistema de Carrito Global - AhsLing Boutique
 * Maneja el carrito de compras de manera unificada en todas las páginas
 */

class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.phoneNumber = '50377418024'; // Número de WhatsApp
        this.init();
    }

    // Inicializar el carrito
    init() {
        this.updateCartUI();
        this.bindEvents();
        this.createCartModal();
    }

    // Cargar carrito desde localStorage
    loadCart() {
        const savedCart = localStorage.getItem('ahsling_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Guardar carrito en localStorage
    saveCart() {
        localStorage.setItem('ahsling_cart', JSON.stringify(this.cart));
    }

    // Agregar producto al carrito
    addToCart(product) {
        // Verificar si el producto ya existe en el carrito
        const existingProduct = this.cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.updateCartUI();
        this.showAddedNotification(product);
    }

    // Remover producto del carrito
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.renderCartModal();
    }

    // Aumentar cantidad
    increaseQuantity(productId) {
        const product = this.cart.find(item => item.id === productId);
        if (product) {
            product.quantity++;
            this.saveCart();
            this.updateCartUI();
            this.renderCartModal();
        }
    }

    // Disminuir cantidad
    decreaseQuantity(productId) {
        const product = this.cart.find(item => item.id === productId);
        if (product && product.quantity > 1) {
            product.quantity--;
            this.saveCart();
            this.updateCartUI();
            this.renderCartModal();
        }
    }

    // Limpiar carrito
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        this.renderCartModal();
    }

    // Obtener total de items
    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Actualizar UI del carrito
    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.getTotalItems();
            cartCount.textContent = totalItems;
            
            if (totalItems > 0) {
                cartCount.classList.add('active');
                cartCount.style.display = 'flex';
            } else {
                cartCount.classList.remove('active');
                cartCount.style.display = totalItems === 0 ? 'none' : 'flex';
            }
        }
    }

    // Mostrar notificación de producto agregado
    showAddedNotification(product) {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div class="notification-text">
                    <strong>¡Producto agregado!</strong>
                    <span>${product.title}</span>
                </div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Agregar estilos si no existen
        if (!document.querySelector('#cart-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'cart-notification-styles';
            styles.textContent = `
                .cart-notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: linear-gradient(45deg, #28a745, #20c997);
                    color: white;
                    padding: 0;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
                    z-index: 10000;
                    animation: slideInRight 0.3s ease, fadeOutRight 0.3s ease 2.7s forwards;
                    max-width: 350px;
                    overflow: hidden;
                }

                .notification-content {
                    padding: 15px 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .notification-content i.fa-check-circle {
                    font-size: 24px;
                    color: white;
                }

                .notification-text {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .notification-text strong {
                    font-size: 14px;
                    font-weight: 600;
                }

                .notification-text span {
                    font-size: 12px;
                    opacity: 0.9;
                }

                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 5px;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }

                .notification-close:hover {
                    opacity: 1;
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes fadeOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }

                @media (max-width: 768px) {
                    .cart-notification {
                        right: 10px;
                        left: 10px;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    // Crear modal del carrito
    createCartModal() {
        // Verificar si ya existe
        if (document.getElementById('globalCartModal')) return;

        const modal = document.createElement('div');
        modal.id = 'globalCartModal';
        modal.className = 'cart-modal';
        modal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-modal-header">
                    <h2><i class="fas fa-shopping-cart"></i> Mi Carrito</h2>
                    <button class="cart-modal-close" onclick="globalCart.closeCartModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cart-modal-body" id="globalCartItems">
                    <!-- Items del carrito se cargan aquí -->
                </div>
                <div class="cart-modal-footer" id="globalCartFooter">
                    <div class="cart-total">
                        <span>Total de productos: <strong id="globalTotalItems">0</strong></span>
                    </div>
                    <div class="cart-actions">
                        <button class="btn-secondary" onclick="globalCart.clearCart()">
                            <i class="fas fa-trash"></i> Limpiar Carrito
                        </button>
                        <button class="btn-primary" onclick="globalCart.sendToWhatsApp()">
                            <i class="fab fa-whatsapp"></i> Enviar a WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Agregar estilos del modal
        if (!document.querySelector('#cart-modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'cart-modal-styles';
            styles.textContent = `
                .cart-modal {
                    display: none;
                    position: fixed;
                    z-index: 10000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(5px);
                }

                .cart-modal-content {
                    background: white;
                    margin: 5% auto;
                    padding: 0;
                    border-radius: 15px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 80vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                    animation: modalSlideIn 0.3s ease;
                }

                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-50px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .cart-modal-header {
                    padding: 25px 30px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-radius: 15px 15px 0 0;
                }

                .cart-modal-header h2 {
                    margin: 0;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .cart-modal-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 50%;
                    transition: background 0.2s;
                }

                .cart-modal-close:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .cart-modal-body {
                    padding: 20px 30px;
                    flex: 1;
                    overflow-y: auto;
                    max-height: 400px;
                }

                .cart-empty {
                    text-align: center;
                    padding: 40px 20px;
                    color: #999;
                }

                .cart-empty i {
                    font-size: 4rem;
                    margin-bottom: 20px;
                    color: #ddd;
                }

                .cart-item {
                    display: flex;
                    gap: 15px;
                    padding: 15px 0;
                    border-bottom: 1px solid #f0f0f0;
                }

                .cart-item:last-child {
                    border-bottom: none;
                }

                .cart-item-image {
                    width: 80px;
                    height: 80px;
                    border-radius: 8px;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .cart-item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .cart-item-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .cart-item-title {
                    font-weight: 600;
                    color: #333;
                    font-size: 16px;
                }

                .cart-item-code {
                    color: #667eea;
                    font-size: 14px;
                    font-weight: 500;
                }

                .cart-item-quantity {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-top: auto;
                }

                .quantity-btn {
                    width: 32px;
                    height: 32px;
                    border: 2px solid #667eea;
                    background: white;
                    color: #667eea;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-weight: 600;
                }

                .quantity-btn:hover {
                    background: #667eea;
                    color: white;
                }

                .quantity-number {
                    font-weight: 600;
                    color: #333;
                    min-width: 20px;
                    text-align: center;
                }

                .remove-item {
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: background 0.2s;
                }

                .remove-item:hover {
                    background: #c82333;
                }

                .cart-modal-footer {
                    padding: 20px 30px;
                    border-top: 1px solid #eee;
                    background: #f8f9fa;
                    border-radius: 0 0 15px 15px;
                }

                .cart-total {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 18px;
                    color: #333;
                }

                .cart-actions {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                }

                .cart-actions button {
                    flex: 1;
                    padding: 12px 20px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .btn-primary {
                    background: linear-gradient(45deg, #28a745, #20c997);
                    color: white;
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
                }

                .btn-secondary {
                    background: #6c757d;
                    color: white;
                }

                .btn-secondary:hover {
                    background: #545b62;
                    transform: translateY(-2px);
                }

                @media (max-width: 768px) {
                    .cart-modal-content {
                        margin: 2% auto;
                        width: 95%;
                        max-height: 90vh;
                    }

                    .cart-modal-header,
                    .cart-modal-body,
                    .cart-modal-footer {
                        padding: 15px 20px;
                    }

                    .cart-actions {
                        flex-direction: column;
                    }

                    .cart-item {
                        gap: 10px;
                    }

                    .cart-item-image {
                        width: 60px;
                        height: 60px;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(modal);
    }

    // Abrir modal del carrito
    openCartModal() {
        this.renderCartModal();
        document.getElementById('globalCartModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal del carrito
    closeCartModal() {
        document.getElementById('globalCartModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Renderizar contenido del modal
    renderCartModal() {
        const cartItems = document.getElementById('globalCartItems');
        const cartFooter = document.getElementById('globalCartFooter');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Tu carrito está vacío</h3>
                    <p>Agrega productos para comenzar a comprar</p>
                </div>
            `;
            cartFooter.style.display = 'none';
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-code">${item.code}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="globalCart.decreaseQuantity('${item.id}')">-</button>
                            <span class="quantity-number">${item.quantity}</span>
                            <button class="quantity-btn" onclick="globalCart.increaseQuantity('${item.id}')">+</button>
                            <button class="remove-item" onclick="globalCart.removeFromCart('${item.id}')">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            document.getElementById('globalTotalItems').textContent = this.getTotalItems();
            cartFooter.style.display = 'block';
        }
    }

    // Enviar a WhatsApp
    sendToWhatsApp() {
        if (this.cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        let message = '¡Hola! Me interesa solicitar información sobre los siguientes productos de *AhsLing Boutique*:\n\n';
        
        this.cart.forEach((item, index) => {
            message += `${index + 1}. *${item.title}*\n`;
            message += `   📦 ${item.code}\n`;
            message += `   📊 Cantidad: ${item.quantity}\n\n`;
        });
        
        message += `📋 *Total de productos:* ${this.getTotalItems()}\n\n`;
        message += 'Por favor, envíenme más información sobre:\n';
        message += '• Disponibilidad\n';
        message += '• Precios\n';
        message += '• Formas de pago\n';
        message += '• Tiempos de entrega\n\n';
        message += '¡Gracias! 😊';
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    }

    // Vincular eventos
    bindEvents() {
        // Clic en el icono del carrito
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-icon')) {
                e.preventDefault();
                this.openCartModal();
            }
        });

        // Cerrar modal al hacer clic fuera
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('globalCartModal');
            if (e.target === modal) {
                this.closeCartModal();
            }
        });

        // Tecla ESC para cerrar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCartModal();
            }
        });
    }

    // Función auxiliar para extraer información del producto desde el DOM
    extractProductInfo(element) {
        // Detectar tipo de página y extraer información según el contexto
        const card = element.closest('.cartera-card, .product-card, .perfume-card, .ropa-card, .accesorio-card');
        if (!card) return null;

        // Extraer información común
        const title = card.querySelector('.cartera-title, .product-title, .perfume-title, .ropa-title, .accesorio-title')?.textContent?.trim();
        const code = card.querySelector('.product-code')?.textContent?.trim();
        const image = card.querySelector('img')?.src;
        const description = card.querySelector('.cartera-description, .product-description, .perfume-description, .ropa-description, .accesorio-description')?.textContent?.trim();

        if (!title || !code || !image) return null;

        return {
            id: code.replace('Código: ', '').trim(),
            name: title,
            code: code.replace('Código: ', '').trim(),
            image: image,
            description: description || title,
            category: this.detectCategory(),
            price: this.getDefaultPrice()
        };
    }

    // Detectar categoría basada en la URL actual
    detectCategory() {
        const url = window.location.pathname;
        if (url.includes('carteras')) return 'Carteras';
        if (url.includes('perfumes')) return 'Perfumes';
        if (url.includes('ropa-dama')) return 'Ropa de Dama';
        if (url.includes('ropa-caballero')) return 'Ropa de Caballero';
        if (url.includes('accesorios')) return 'Accesorios';
        return 'Productos';
    }

    // Obtener precio por defecto basado en la categoría
    getDefaultPrice() {
        const category = this.detectCategory();
        switch(category) {
            case 'Carteras': return 35.00;
            case 'Perfumes': return 25.00;
            case 'Ropa de Dama': return 30.00;
            case 'Ropa de Caballero': return 35.00;
            case 'Accesorios': return 20.00;
            default: return 25.00;
        }
    }
}

// Función global para agregar al carrito (compatible con código existente)
function addToCart(element) {
    const product = globalCart.extractProductInfo(element);
    if (product) {
        globalCart.addToCart(product);
        
        // Animación en el botón
        element.style.transform = 'scale(0.95)';
        element.style.background = '#28a745';
        const originalText = element.innerHTML;
        element.innerHTML = '<i class="fas fa-check"></i> Agregado';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.background = '';
            element.innerHTML = originalText;
        }, 1500);
    }
}

// Inicializar carrito global cuando se carga la página
let globalCart;

// Función global para agregar productos al carrito (disponible antes de DOMContentLoaded)
window.addToCartGlobal = function(product) {
    if (window.globalCart) {
        window.globalCart.addToCart(product);
    } else {
        // Si el carrito aún no está inicializado, guardamos en localStorage directamente
        let cart = JSON.parse(localStorage.getItem('ahsling_cart') || '[]');
        const existingProduct = cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }
        
        localStorage.setItem('ahsling_cart', JSON.stringify(cart));
        console.log('Producto agregado al carrito:', product);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    globalCart = new ShoppingCart();
    window.globalCart = globalCart;
    
    // Agregar event listeners a botones de agregar al carrito existentes
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            addToCart(this);
        });
    });
});

// Exportar para uso global
window.addToCart = addToCart;
