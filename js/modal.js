class Modal {
    constructor () {
        this.opened = false;
        this.cursorInModal = false;
    }

    open(event) {
        event.preventDefault();
        let element = $(event.target);
        this.id = element.data('id');

        // $(this.id).removeClass('d-none');
        $(this.id).fadeIn('slow');
        $('body').addClass('no-scroll');

        this.opened = true;
    }

    close(event) {
        event.preventDefault();

        $(this.id).fadeOut('slow');
        $('body').removeClass('no-scroll');

        this.false = true;
    }
}


$(function () {
    let modal = new Modal();

    $(document).on('click','.toggle-book-modal', (event) => {
        modal.open(event);
    });

    $(document).on('click','.close-book-modal', (event) => {
        modal.close(event);
    });

    //flag da li je cursor misa u modalu
    $(document).on('mouseenter','.book-modal-content', () => { modal.cursorInModal = true; });
    $(document).on('mouseleave','.book-modal-content', () => { modal.cursorInModal = false; });

    $(document).on('click', '.book-modal', (event) => {
        if (modal.opened && modal.cursorInModal == false) {
            modal.close(event);
        }
    });

    $(document).on('keyup', (event) => { 
        if (event.key == "Escape" && modal.opened) { 
            modal.close(event);
        } 
    }); 
});