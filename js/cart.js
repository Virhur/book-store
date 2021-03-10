class Cart {
    constructor () {
        this.cart = JSON.parse(localStorage.getItem('cart'));

        if (this.cart === null)
            this.cart = [];

        this.loadCart();
        this.onCartPage = false;
        this.totalPrice = 0;
    }

    setToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.loadCart();

        if (this.onCartPage)
            this.loadCartPage();
    }

    getTotalCount() {
        let count = 0;

        this.cart.forEach(item => {
            count += item.count;
        });

        return count;
    }

    getTotalPrice() {
        let total = this.totalPrice.toLocaleString();
        $('#total-price').html(total);
    }

    loadCartPage() {
        if (this.cart.length !== 0) {
            $('#cart-has-no-items').addClass('d-none');
            $('.cart-has-items').removeClass('d-none');

            this.totalPrice = 0;
            let html = '';
            let htmlMobile = '';

            this.cart.forEach(item => {
                let book = books.getBookById(item.id);
                if (book != null) {
                    html += book.getCartRowHTML(item.count);
                    htmlMobile += book.getCartRowHTMLMobile(item.count);
                }
                    
                this.totalPrice += item.count * book.price;
            });

            $('#cart-content').html(html);
            $("#cart-content-mobile").html(htmlMobile);
            this.getTotalPrice();
        } else {
            $('#cart-has-no-items').removeClass('d-none');
            $('.cart-has-items').addClass('d-none');
        }

        this.onCartPage = true;
    }

    loadCart() {
        if (this.cart.length !== 0) {
            $('#korpa-empty').addClass('d-none');

            let html = '';

            this.cart.forEach(item => {
                let book = books.getBookById(item.id);
                if (book != null)
                    html += book.getCartHTML(item.count);
            })

            $('#korpa-items').html(html);
        } else {
            $('#korpa-empty').removeClass('d-none');
            $('#korpa-items').html('');
        }

        let count = this.getTotalCount();
        $('#total-count').html(`(${count})`);
    }

    addToCart(id) {
        if (this.getById(id) === null) {
            this.cart.push({
                id: id,
                count: 1
            });
            this.setToLocalStorage();
            this.showNotification();
        } else {
            let confirmed = confirm("Izabrani artikal je već u korpi. Da li želite da povećate količinu?");

            if (confirmed) {
                this.incrementCartItem(id);
                this.showNotification();
            }
        }
    }

    showNotification() {
        new Noty({
            text: 'Artikal dodat u korpu.',
        }).show();
    }

    incrementCartItem(id) {
        this.cart.forEach(item => {
            if (item.id == id) {
                item.count++;
            }
        })
        this.setToLocalStorage();
    }

    decrementCartItem(id) {
        this.cart.forEach((item, index) => {
            if (item.id == id) {
                item.count--;

                if (item.count === 0) {
                    this.cart.splice(index, 1);
                }
            }
        })
        this.setToLocalStorage();
    }

    removeCartItem(id) {
        this.cart.forEach((item, index) => {
            if (item.id == id) {
                this.cart.splice(index, 1);
            }
        })
        this.setToLocalStorage();
    }

    getById(id) {
        let count = this.cart.length; 

        for (let i = 0; i < count; i++) {
            if (this.cart[i].id === id)
                return this.cart[i];
        }
        
        return null;
    }
}

let cart;

$(function () {
    cart = new Cart();

    $(document).on('click', '.add-to-cart', (event) => {
        let element = $(event.target);
        let id = element.data('id');

        cart.addToCart(id);
    });

    $(document).on('click','.increment-cart-item', (event) => {
        event.stopPropagation();
        let element = $(event.target);
        let id = element.data('id');

        cart.incrementCartItem(id);
    });

    $(document).on('click','.decrement-cart-item', (event) => {
        event.stopPropagation();
        let element = $(event.target);
        let id = element.data('id');

        cart.decrementCartItem(id);
    });

    $(document).on('click','.remove-from-cart', (event) => {
        event.stopPropagation();
        let element = $(event.target);
        let id = element.data('id');

        cart.removeCartItem(id);
    });
})