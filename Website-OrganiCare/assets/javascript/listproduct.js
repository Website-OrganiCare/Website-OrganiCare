    const cartContainer = document.querySelector('.cart-container');
    const productList = document.querySelector('.product-list');
    const cartList = document.querySelector('.cart-list');
    const cartTotalValue = document.getElementById('cart-total-value');
    const cartCountInfo = document.getElementById('cart-count-info');

    let cartItemID = 1;


    function ToggleCategory() {
        var x = document.getElementById("category-filter");
        var y = document.getElementById("category-minus");
        if (x.style.display === "none") {
            x.style.display = "block";
            y.classList.toggle("fas fa-plus", true);
        } else {
            x.style.display = "none";
        }
    }
    function ToggleCategory2() {
        var x = document.getElementById("filter-price");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    eventListeners();
        function eventListeners() {
        window.addEventListener('DOMContentLoaded', () => {
            loadJSON();
            loadCart();
        });
    //toggle navbar when toggle button iss clicked
    //document.querySelector('.navbar-toggler').addEventListener('click', function () {
    //    document.querySelector('.navbar-collapse').classList.toggle('show-navbar');
    //});
    //show-hide cart container
        document.getElementById('cart-btn').addEventListener('click', () => {
            cartContainer.classList.toggle('show-cart-container');
             });
        productList.addEventListener('click', purchaseProduct);
        cartList.addEventListener('click', deleteProduct);
}
//update cart info
        function updateCartInfo() {
            let cartInfor = findCartInfo();
            cartCountInfo.textContent = cartInfor.productCount;
            cartTotalValue.textContent = cartInfor.total + ' VNĐ';
}
updateCartInfo();
//load product item conten from JSON file
        function loadJSON() {
        fetch('data/DataProduct.json').then(response => response.json()).then(data => {
            let html = '';
            data.forEach(product => {
                html += `
                           <div class="item-product col-lg-4 col-md-6 col-xs-12">
                                <a href="01-detail.html?id={{product.id}}" title="{{product.products_name}}" class="product-thumb">
                                     <img src="${product.image}" class="item-thumb">
                                 </a>
                                 <div class="action_links">
                                      <button type="button">
                                            <i class="add-to-cart-btn fas fa-shopping-cart"></i>
                                      </button>
                                      <button type="button">
                                                <i class="wishlist fas fa-heart"></i
                                      </button>
                                 </div>
                                 <div class="item-info">
                                    <a href="01-detail.html?id=${product.id}" title="${product.products_name}" class="item-info-name block-ellipsis ">${product.products_name}</a>
                                    <p class="item-info-desc block-ellipsis">${product.description}</p>
                                    <p class="item-info-price">${product.price} VNĐ</p>
                                </div>
                            </div >
                            `;
                                    });
            productList.innerHTML = html;
        });
    }
    //purchase Product
        function purchaseProduct(e) {
            if (e.target.classList.contains('add-to-cart-btn')) {
                let product = e.target.parentElement.parentElement.parentElement;
            getProductInfor(product);
}
}
//get product infor after add to cart button clicked
        function getProductInfor(product) {
        let productInfo = {
            id: cartItemID,
            image: product.querySelector('.product-thumb img').src,
            name: product.querySelector('.item-info-name').textContent,
            category: product.querySelector('.item-info-desc').textContent,
            price: product.querySelector('.item-info-price').textContent
}
        cartItemID++;
        addToCartList(productInfo);
        saveProductInStorage(productInfo);
}
//add to cartlist the seleted product
        function addToCartList(product) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.setAttribute('data-id', `${product.id}`);
            cartItem.innerHTML = `
                <img src="${product.image}" alt="product image" />
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${product.name}</h3>
                    <span class="cart-item-category">${product.category}</span>
                    <span class="cart-item-price">${product.price}</span>
                </div>
                <button type="button" class="cart-item-del-btn">
                    <i class="fas fa-times"></i>
                </button>
    `;
            cartList.appendChild(cartItem);
}
//save product selected in cart when reload
        function saveProductInStorage(item) {
        let products = getProductFromStorage();
        products.push(item);
        localStorage.setItem('products', JSON.stringify(products));
        updateCartInfo();
}
//get all the products infor if there is any in the loacal storage
        function getProductFromStorage() {
            return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
// return empty array if there isn't any product info
}
//load carts product
        function loadCart() {
            let products = getProductFromStorage();
                if (products.length < 1) {
                    cartItemID = 1; //Không có sản phẩm nào lưu trên local 
                } else {
                    cartitemID = products[products.length - 1].id;
                    cartItemID++;
                }
//Nếu có sản phẩm thì cứ tính tiếp tới
//Có dòng sau thì nó sẽ add product dô cart theo bộ nhớ
            products.forEach(product => addToCartList(product));
            //Tính toán tiền và cập nhật cái giỏ
            updateCartInfo();
}
// Tính tổng tiền
        function findCartInfo() {
            let products = getProductFromStorage();
            let total = products.reduce((acc, product) => {
                let price = parseFloat(product.price);//loại bỏ các ký tự đô la
                return acc += price;
                }, 0);
            //Thêm hết giá của tất cả trong cart lại
            return {
                total: total.toFixed(0),
                productCount: products.length
            }
            
}
//Xóa item trong cart
        function deleteProduct(e) {
            let cartItem;
                if (e.target.tagName === "BUTTON") {
                    cartItem = e.target.parentElement;
                    cartItem.remove();
                } else if (e.target.tagName === "I") {
                    cartItem = e.target.parentElement.parentElement;
                    cartItem.remove();
                }
//Có khi bấm thì không biết sẽ bấm dô thẻ i hay button

            let products = getProductFromStorage();
            let updatedProducts = products.filter(product => {
                return product.id !== parseInt(cartItem.dataset.id);
            });
            localStorage.setItem('products', JSON.stringify
                (updatedProducts)); //cập nhật giỏ hàng trong data
            updateCartInfo();
}
