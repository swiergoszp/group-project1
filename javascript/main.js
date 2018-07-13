$(document).ready(function() {
    
    // sets up click event for adding book to personal library
    $(".get-book-button").on("click" , function() {
        
        // the class here changes to whichever slide is in the main position
        var book = $(".swiper-slide-active").val().trim();
        console.log(book);

    });

    // sets up click event for adding book to wishlist
    $(".wishlist-button").on("click" , function() {
        
        // the class here changes to whichever slide is in the main position
        var book = $(".swiper-slide-active").text();
        console.log(book);

    });


});