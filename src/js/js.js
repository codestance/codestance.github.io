$(document).ready(function(){
    $('.menu-button').on('click', function(){
        $(':nth-child(3)',this).toggleClass('open');
    })
    $(window).on('scroll',getPotencial)
})

function getPotencial(){
    let step = window.pageYOffset*0.3<window.innerHeight-100?window.pageYOffset*0.3:window.innerHeight-100;    
    return $('.astronaut-box').css('transform','translateY(-'+ step + 'px)');
}