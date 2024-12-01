 // Datos de los productos
 const products = [

        { category: "pc-parts", price: 350, name: "Monitor Gaming 32\" 4K", image: "/images/monitor2.jpg", oldPrice: 400, details: ["Resolución: 3840x2160 (4K)", "Frecuencia: 120Hz", "Tiempo de respuesta: 2ms", "Compatible con FreeSync"], stock: 15 },
        { category: "pc-parts", price: 99, name: "SSD 256GB", image: "/images/ssd2.jpg", oldPrice: 130, details: ["Velocidad de lectura: 550 MB/s", "Durabilidad: 2 años de garantía"], stock: 8 },
        { category: "laptops", price: 1400, name: "Laptop Gaming 17\" i7", image: "/images/laptop4.jpg", oldPrice: 1600, details: ["Procesador: Intel i7 12ª Gen", "RAM: 16GB", "Tarjeta gráfica: NVIDIA RTX 3070"], stock: 4 },
        { category: "pre-built", price: 1800, name: "PC Gamer Ryzen 5 + GTX 1660", image: "/images/pc4.jpg", oldPrice: 2000, details: ["Procesador: Ryzen 5 3600", "GPU: GTX 1660", "RAM: 16GB"], stock: 3 },
        { category: "pc-parts", price: 220, name: "RAM 8GB DDR4", image: "/images/ram2.jpg", oldPrice: 250, details: ["Velocidad: 3000MHz", "Compatible con placas base DDR4"], stock: 10 },
        { category: "pc-parts", price: 200, name: "Tarjeta Gráfica GTX 1650", image: "/images/gpu2.jpg", oldPrice: 250, details: ["GPU: GTX 1650", "Memoria: 4GB"], stock: 0 },
        { category: "laptops", price: 950, name: "Laptop Ultraligera 13\" i3", image: "/images/laptop5.jpg", oldPrice: 1100, details: ["Procesador: Intel i3 10ª Gen", "RAM: 8GB", "Pantalla Full HD"], stock: 5 },
        { category: "pre-built", price: 2100, name: "PC Gaming Ryzen 7 + RTX 3080", image: "/images/pc5.jpg", oldPrice: 2500, details: ["Procesador: Ryzen 7", "GPU: RTX 3080", "RAM: 32GB"], stock: 3 },
        { category: "pc-parts", price: 280, name: "Placa Base MSI Z590", image: "/images/motherboard2.jpg", oldPrice: 350, details: ["Socket: LGA 1200", "Compatible con 10ª/11ª Gen"], stock: 2 },
        { category: "laptops", price: 1500, name: "Laptop Alienware 15\" RTX 3070", image: "/images/laptop6.jpg", oldPrice: 1800, details: ["Procesador: Intel i9 11ª Gen", "RAM: 16GB", "Tarjeta gráfica: NVIDIA RTX 3070"], stock: 6 },
        { category: "pre-built", price: 2200, name: "PC Gaming i9 + RTX 4090", image: "/images/pc6.jpg", oldPrice: 2500, details: ["Procesador: Intel i9 12ª Gen", "GPU: RTX 4090", "RAM: 64GB"], stock: 3 },
        { category: "pc-parts", price: 380, name: "Monitor Gaming 24\" 1080p", image: "/images/monitor3.jpg", oldPrice: 420, details: ["Resolución: 1920x1080 (Full HD)", "Frecuencia: 144Hz", "Tiempo de respuesta: 1ms", "Compatible con G-Sync"], stock: 7 },
        { category: "pc-parts", price: 180, name: "SSD 1TB", image: "/images/ssd3.jpg", oldPrice: 200, details: ["Velocidad de lectura: 550 MB/s", "Durabilidad: 5 años de garantía"], stock: 5 },
        { category: "laptops", price: 950, name: "Laptop Ultraligera 13\" i5", image: "/images/laptop7.jpg", oldPrice: 1100, details: ["Procesador: Intel i5 11ª Gen", "RAM: 8GB", "Pantalla Full HD"], stock: 3 },
        { category: "pre-built", price: 1600, name: "PC Gaming Ryzen 5 + GTX 1660", image: "/images/pc7.jpg", oldPrice: 1800, details: ["Procesador: Ryzen 5", "GPU: GTX 1660", "RAM: 16GB"], stock: 10 },
        { category: "pc-parts", price: 150, name: "Placa Base Gigabyte B450", image: "/images/motherboard3.jpg", oldPrice: 180, details: ["Socket: AM4", "Compatible con Ryzen 2000/3000"], stock: 12 },
        { category: "pc-parts", price: 299, name: "Monitor Curvo 27\" QHD", image: "/images/monitor4.jpg", oldPrice: 350, details: ["Resolución: 2560x1440", "Frecuencia: 165Hz", "Curvatura: 1800R"], stock: 6 },
        { category: "pc-parts", price: 270, name: "Tarjeta Gráfica RTX 2060", image: "/images/gpu3.jpg", oldPrice: 300, details: ["GPU: RTX 2060", "Memoria: 6GB"], stock: 0 },
        { category: "laptops", price: 1100, name: "Laptop Dell 15\" i7", image: "/images/laptop8.jpg", oldPrice: 1200, details: ["Procesador: Intel i7 10ª Gen", "RAM: 8GB", "Pantalla Full HD"], stock: 8 },
        { category: "pre-built", price: 2000, name: "PC Gaming Ryzen 9 + RTX 3080", image: "/images/pc8.jpg", oldPrice: 2300, details: ["Procesador: Ryzen 9", "GPU: RTX 3080", "RAM: 32GB"], stock: 6 },
        { category: "pc-parts", price: 230, name: "RAM 16GB Corsair", image: "/images/ram3.jpg", oldPrice: 270, details: ["Velocidad: 3200MHz", "Compatibilidad con XMP"], stock: 9 },
        { category: "pc-parts", price: 160, name: "SSD 512GB", image: "/images/ssd4.jpg", oldPrice: 180, details: ["Velocidad de lectura: 560 MB/s", "Durabilidad: 4 años de garantía"], stock: 4 },
        { category: "laptops", price: 1400, name: "Laptop HP 17\" i7", image: "/images/laptop9.jpg", oldPrice: 1500, details: ["Procesador: Intel i7 11ª Gen", "RAM: 16GB", "Pantalla Full HD"], stock: 7 },
        { category: "pre-built", price: 1700, name: "PC Gaming i5 + GTX 1650", image: "/images/pc9.jpg", oldPrice: 2000, details: ["Procesador: Intel i5 10ª Gen", "GPU: GTX 1650", "RAM: 16GB"], stock: 8 },
        { category: "pc-parts", price: 420, name: "Placa Base ASUS TUF", image: "/images/motherboard4.jpg", oldPrice: 450, details: ["Socket: AM4", "Compatible con Ryzen 3000/5000"], stock: 3 },
        { category: "laptops", price: 1300, name: "Laptop MSI 15\" i9", image: "/images/laptop10.jpg", oldPrice: 1450, details: ["Procesador: Intel i9 12ª Gen", "RAM: 16GB", "Pantalla Full HD"], stock: 6 },
        { category: "pre-built", price: 2300, name: "PC Gaming Ryzen 7 + RTX 3070", image: "/images/pc10.jpg", oldPrice: 2600, details: ["Procesador: Ryzen 7", "GPU: RTX 3070", "RAM: 32GB"], stock: 5 },
        { category: "pc-parts", price: 310, name: "Monitor UltraWide 29\"", image: "/images/monitor5.jpg", oldPrice: 350, details: ["Resolución: 2560x1080", "Frecuencia: 120Hz", "Pantalla curva"], stock: 6 },
        { category: "pc-parts", price: 270, name: "SSD 2TB", image: "/images/ssd5.jpg", oldPrice: 300, details: ["Velocidad de lectura: 560 MB/s", "Durabilidad: 5 años de garantía"], stock: 3 },
        { category: "laptops", price: 1300, name: "Laptop Acer 15\" Ryzen 7", image: "/images/laptop11.jpg", oldPrice: 1400, details: ["Procesador: Ryzen 7", "RAM: 16GB", "Pantalla Full HD"], stock: 9 },
        { category: "pre-built", price: 1900, name: "PC Gaming i7 + RTX 3060", image: "/images/pc11.jpg", oldPrice: 2200, details: ["Procesador: Intel i7 11ª Gen", "GPU: RTX 3060", "RAM: 32GB"], stock: 4 },
        { category: "pc-parts", price: 320, name: "Placa Base ASUS ROG Strix", image: "/images/motherboard5.jpg", oldPrice: 350, details: ["Socket: LGA 1200", "Compatible con 10ª/11ª Gen"], stock: 5 },
        { category: "pc-parts", price: 260, name: "Tarjeta Gráfica RX 5700", image: "/images/gpu4.jpg", oldPrice: 290, details: ["GPU: RX 5700", "Memoria: 8GB"], stock: 3 },
        { category: "laptops", price: 1600, name: "Laptop Razer 15\" RTX 3070", image: "/images/laptop12.jpg", oldPrice: 1800, details: ["Procesador: Intel i9 11ª Gen", "RAM: 16GB", "Tarjeta gráfica: NVIDIA RTX 3070"], stock: 5 },
        { category: "pre-built", price: 2500, name: "PC Gaming Ryzen 9 + RTX 4080", image: "/images/pc12.jpg", oldPrice: 2800, details: ["Procesador: Ryzen 9", "GPU: RTX 4080", "RAM: 64GB"], stock: 3 }
    
];

// Generar productos dinámicamente
const productsGrid = document.getElementById("products-grid");

// Función para crear los productos
function renderProducts() {
    // Limpiar el grid de productos
    productsGrid.innerHTML = '';

    // Filtrar y ordenar productos según criterios
    const filteredProducts = products.filter(product => {
        const priceRange = document.getElementById('price-range').value;
        const selectedCategory = document.getElementById('category').value;
        return product.price <= priceRange && 
               (selectedCategory === "" || product.category === selectedCategory);
    });

    filteredProducts.sort((a, b) => a.price - b.price); // Ordenar por precio ascendente

    // Crear los productos
    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.setAttribute("data-category", product.category);
        productCard.setAttribute("data-price", product.price);

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">Antes: ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span> ` : ''}Ahora: <span class="new-price">$${product.price}</span></p>
            <ul>
                ${product.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
            ${product.stock > 0 ? `<button class="btn-buy">Comprar Ahora</button>` : `<button class="btn-buy disabled">Agotado</button>`}
        `;

        productsGrid.appendChild(productCard);
    });
}

// Filtrar productos por precio y categoría
document.getElementById('price-range').addEventListener('input', function() {
    document.getElementById('price-value').textContent = "$" + this.value;
    renderProducts();
});

document.getElementById('category').addEventListener('change', function() {
    renderProducts();
});

// Inicializar la vista de productos
renderProducts();