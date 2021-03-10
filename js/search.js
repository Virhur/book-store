function cyrilic2latin(text) {
    return text
        .replace(/а/g, "a") 
        .replace(/б/g, "b") 
        .replace(/в/g, "v") 
        .replace(/г/g, "g") 
        .replace(/д/g, "d") 
        .replace(/ђ/g, "đ") 
        .replace(/е/g, "e") 
        .replace(/ж/g, "ž") 
        .replace(/з/g, "z") 
        .replace(/и/g, "i") 
        .replace(/ј/g, "j") 
        .replace(/к/g, "k") 
        .replace(/л/g, "l") 
        .replace(/љ/g, "lj") 
        .replace(/м/g, "m") 
        .replace(/н/g, "n") 
        .replace(/њ/g, "nj") 
        .replace(/о/g, "o") 
        .replace(/п/g, "p") 
        .replace(/р/g, "r") 
        .replace(/с/g, "s") 
        .replace(/т/g, "t") 
        .replace(/ћ/g, "ć") 
        .replace(/у/g, "u") 
        .replace(/ф/g, "f") 
        .replace(/х/g, "h") 
        .replace(/ц/g, "c") 
        .replace(/ч/g, "č") 
        .replace(/џ/g, "dž") 
        .replace(/ш/g, "š") 
        .replace(/А/g, "A") 
        .replace(/Б/g, "B") 
        .replace(/В/g, "V") 
        .replace(/Г/g, "G") 
        .replace(/Д/g, "D") 
        .replace(/Ђ/g, "Đ") 
        .replace(/Е/g, "E") 
        .replace(/Ж/g, "Ž") 
        .replace(/З/g, "Z") 
        .replace(/И/g, "I") 
        .replace(/Ј/g, "J") 
        .replace(/К/g, "K") 
        .replace(/Л/g, "L") 
        .replace(/Љ/g, "Lj") 
        .replace(/М/g, "M") 
        .replace(/Н/g, "N") 
        .replace(/Њ/g, "Nj") 
        .replace(/О/g, "O") 
        .replace(/П/g, "P") 
        .replace(/Р/g, "R") 
        .replace(/С/g, "S") 
        .replace(/Т/g, "T") 
        .replace(/Ћ/g, "Ć") 
        .replace(/У/g, "U") 
        .replace(/Ф/g, "F") 
        .replace(/Х/g, "H") 
        .replace(/Ц/g, "C") 
        .replace(/Ч/g, "Č") 
        .replace(/Џ/g, "Dž") 
        .replace(/Ш/g, "Š");
}

class Search {
    constructor (books) {
        this.title = null;
        this.categories = [];
        this.priceFrom = null;
        this.priceTo = null;
        this.sortBy = null;
        this.books = books.data;
        this.mainBooks = books.data;
    }

    init(title, categories, priceFrom, priceTo, sortBy) {
        this.title = cyrilic2latin(title.trim());
        this.categories = categories;
        this.priceFrom = parseInt(priceFrom);
        this.priceTo = parseInt(priceTo);
        this.sortBy = sortBy;
    
        this.run();
        this.setFilters();
    }

    setFilters() {
        window.localStorage.setItem('search_filters', JSON.stringify(this));
    }

    getFilters() {
        let data = JSON.parse(window.localStorage.getItem('search_filters'));
        let books = [];
        
        if (data != null) {
            data.books.forEach(item => {
                books.push(new Book(item));
            });
            data.books = books;
        } else {
            books = null;
        }

        return data;
    }

    resetFilters(books) {
        window.localStorage.removeItem('search_filters');

        $('#title').val('');
        $('#price-from').val(null);
        $('#price-to').val(null);
        $('#sort').val('0');
        let chbxs = document.getElementsByName('categories');
    
        for (let i=0; i < chbxs.length; i++) {
            chbxs[i].checked = false;
        }

        this.mainBooks = this.mainBooks.sort((x, y) => x.id - y.id);

        $('#knjige').fadeOut('slow'); 
        setTimeout(() => {
            document.getElementById('knjige').innerHTML = "";
            books.loadBooks(this.mainBooks);
            books.loadModals(this.mainBooks);
            $('#knjige').fadeIn('slow');
        }, 500);
    }

    run() {
        this.books = this.mainBooks;

        if (this.title != null && this.title != '') {
            this.books = this.books.filter(book => book.title.toLowerCase().includes(this.title.toLowerCase()));
        }

        if (this.categories.length != 0) {
            this.books = this.books.filter(book => this.categories.includes(book.category));
        }

        if (this.priceFrom != null && !isNaN(this.priceFrom)) {
            this.books = this.books.filter(book => book.price >= this.priceFrom);
        }

        if (this.priceTo != null && !isNaN(this.priceTo)) {
            this.books = this.books.filter(book => book.price <= this.priceTo);
        }

        if (this.sortBy != null) {
            switch (this.sortBy) {
                case "1" : this.books = this.books.sort((x, y) => x.title.toLowerCase() < y.title.toLowerCase() ? -1 : 1); break;
                case "2" : this.books = this.books.sort((x, y) => x.title.toLowerCase() < y.title.toLowerCase() ? 1 : -1); break;
                case "3" : this.books = this.books.sort((x, y) => y.price - x.price); break;
                case "4" : this.books = this.books.sort((x, y) => x.price - y.price); break;
                default : this.books = this.books.sort((x, y) => x.id - y.id); break;
            }
        }
    }

    applyFilters(books) {
        const title = $('#title').val();
        const priceFrom = $('#price-from').val();
        const priceTo = $('#price-to').val();
        const sort = $('#sort').val();
        const categories = $('input[name="categories"]').filter(":checked").map(function () {
            return this.value;
        }).get();

        this.init(title, categories, priceFrom, priceTo, sort);

        $('#knjige').fadeOut('fast');
        
        setTimeout(() => {
            document.getElementById('knjige').innerHTML = "";
            books.loadBooks(this.books);
            books.loadModals(this.books);
            $('#knjige').fadeIn('fast');
        }, 250);
    }

    loadBooksAndFilters(books) {
        const savedFilters = this.getFilters();
        if (savedFilters != null) {
            $('#title').val(savedFilters.title);
            $('#price-from').val(savedFilters.priceFrom);
            $('#price-to').val(savedFilters.priceTo);
            $('#sort').val(savedFilters.sortBy);
            let chbxs = document.getElementsByName('categories');
    
            for (let i=0; i < chbxs.length; i++) {
                if (savedFilters.categories.includes(chbxs[i].value)) {
                    chbxs[i].checked = true;
                }
            }
    
            books.loadBooks(savedFilters.books);
            books.loadModals(savedFilters.books);
        } else {
            books.loadBooks(this.books);
            books.loadModals(this.books);
        }
    }
}

$(() => {
    const search = new Search(books);
    search.loadBooksAndFilters(books);
    
    $(document).on('keyup', '#title', (e) => {
        e.preventDefault();
        search.applyFilters(books);
    });

    $(document).on('click', 'input[name="categories"]', (e) => {
        search.applyFilters(books);
    });

    $(document).on('keyup', '#price-from', (e) => {
        e.preventDefault();
        search.applyFilters(books);
    });

    $(document).on('keyup', '#price-to', (e) => {
        e.preventDefault();
        search.applyFilters(books);
    });

    $(document).on('change', '#price-from', (e) => {
        e.preventDefault();
        search.applyFilters(books);
    });

    $(document).on('change', '#price-to', (e) => {
        e.preventDefault();
        search.applyFilters(books);
    });

    $(document).on('change', '#sort', (e) => {
        e.preventDefault();
        search.applyFilters(books);
    });

    $(document).on('click', '#reset-filters', (e) => {
        e.preventDefault();
        search.resetFilters(books);
    });
});