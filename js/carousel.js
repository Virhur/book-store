class Carousel {
    constructor (id) {
        //init carousel-a
        this.id = id;
        this.items = Array.from($(`${this.id} .custom-carousel-content .custom-carousel-item`));

        if (this.items.length > 0) {
            $(this.items[0]).fadeIn('slow');
            this.index = 0;
            this.itemCount = this.items.length;
            this.initDots();
            this.setRotation();
        }
    }

    getItem(index) {
        return $(this.items[index]);
    }

    getDot(index) {
        return $(this.dots[index]);
    }

    initDots () {
        //generisanje tackica
        let dotsHTML = '';
        
        for (let i = 0; i < this.itemCount; i++) {
            let active = i == 0 ? 'active' : '';
            dotsHTML += `
                <a href='#' class="custom-carousel-dot ${active}"></a>
            `
        }

        //postavljanje tackica na svoje mesto
        $(`${this.id} .custom-carousel-dots`).html(dotsHTML);

        //smestanje tackica u niz za dalju upotrebu
        this.dots = Array.from($(`${this.id} .custom-carousel-dots .custom-carousel-dot`));
    }

    setRotation() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            this.nextSlide()
        }, 3500);
    }

    nextSlide() {
        //ako je na kraju, staviti index na pocetak
        let nextIndex = this.index + 1 == this.itemCount ? 0 : this.index + 1;

        let currentItem = this.getItem(this.index);
        let nextItem = this.getItem(nextIndex);

        //fade out trenutne slike
        currentItem.fadeOut('slow');

        //mora se sacekati da se trenutna animacija zavrsi
        setTimeout(() => {
            //dodaju se ove klase da se ne pomera sarzaj ostatka strane
            currentItem.addClass('d-none');
            nextItem.removeClass('d-none');

            //fade-in nove slike
            nextItem.fadeIn('slow');

            //update-tacke
            this.getDot(this.index).removeClass('active');
            this.getDot(nextIndex).addClass('active');

            //update index-a
            this.index = nextIndex;
        }, 500);
    }

    prevSlide() {
        //ako je na pocetku, stavi na kraj
        let prevIndex = this.index - 1 < 0 ? this.itemCount - 1 : this.index - 1;

        let currentItem = this.getItem(this.index);
        let prevItem = this.getItem(prevIndex);

        //fade out trenutne slike
        currentItem.fadeOut('slow');

        //mora se sacekati da se trenutna animacija zavrsi
        setTimeout(() => {
            //dodaju se ove klase da se ne pomera sarzaj ostatka strane
            currentItem.addClass('d-none');
            prevItem.removeClass('d-none');

            //fade-in nove slike
            prevItem.fadeIn('slow');

            //update-tacke
            this.getDot(this.index).removeClass('active');
            this.getDot(prevIndex).addClass('active');

            //update index-a
            this.index = prevIndex;
        }, 500);
    }

    dotClick(index) {
        //spredavanje dogadjaja ako se pritisne na trenutnu tacku
        if (this.index != index) {
            let currentItem = this.getItem(this.index);
            let dotItem = this.getItem(index);
            
            //fade out trenutne slike
            currentItem.fadeOut('slow');

            //mora se sacekati da se trenutna animacija zavrsi
            setTimeout(() => {
                //dodaju se ove klase da se ne pomera sarzaj ostatka strane
                currentItem.addClass('d-none');
                dotItem.removeClass('d-none');

                //fade-in nove slike
                dotItem.fadeIn('slow');

                //update-tacke
                this.getDot(this.index).removeClass('active');
                this.getDot(index).addClass('active');

                //update index-a
                this.index = index;
            }, 500);

            //ponistavanje rotacije
            this.setRotation();
        }
    }
}

//registrovanje klikova na carousel
//mora se definisati van objekta
function initEvents(carouselObject) {
    $(`${carouselObject.id} .custom-carousel-prev`).click((event) => {
        carouselObject.prevSlide();

        //ponistavanje rotacije
        carouselObject.setRotation();
    });

    $(`${carouselObject.id} .custom-carousel-next`).click((event) => {
        carouselObject.nextSlide();

        //ponistavanje rotacije
        carouselObject.setRotation();
    });

    //postavljanje event klika na tackice
    for (let i = 0; i < carouselObject.itemCount; i++) {
        $(carouselObject.dots[i]).click((event) => {
            carouselObject.dotClick(i);
        });
    }
}

$(function () {
    let desktopCarousel = new Carousel('#desktop-carousel');
    initEvents(desktopCarousel);

    let mobileCarousel = new Carousel('#mobile-carousel');
    initEvents(mobileCarousel);
});