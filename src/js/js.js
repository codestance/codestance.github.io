$(document).ready(function(){
    $('.menu-button').on('click', function(){
        $(':nth-child(3)',this).toggleClass('open');
    })
})