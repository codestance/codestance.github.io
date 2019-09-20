$(document).ready(function(){
    // $('.menu-button').on('click', function(){
    //     $(':nth-child(3)',this).toggleClass('open');
    // });
    // $('.nav-link').on('click',function(){
    //     $('.navbar-collapse').collapse('hide');
    //     $('.menu-button').children(2).removeClass('open');
    // });
    createCanvas();
    setInterval(shine,1000);
    // $(window).on('scroll',getPotencial);
    // $(window).on('resize', getPotencial);
    $(window).on('resize', createCanvas);
});

// function getPotencial(){
//     let h = $('.wrapper').height();
//     let step = $(window).scrollTop()*0.3<h ? $(window).scrollTop()*0.3 : h; 
//     if(step==h) $('.astronaut-text').removeClass('d-none');   
//     return $('.astronaut-box').css('transform','translateY(-'+ step + 'px)');
// }

const canvas = $('<canvas></canvas>').addClass('canvas-stars');
$('.home').append(canvas);
const ctx = canvas[0].getContext("2d");
function createCanvas(){
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    canvas[0].height=canvas[0].clientHeight;
    canvas[0].width=canvas[0].clientWidth;
    for(let i=0; i<120; i++){
        new Circle();       
    }
}
function getBackgroundColor() {
    return 'rgb('+[
        Math.round(Math.random()*0xFF),
        Math.round(Math.random()*0xFF),
        Math.round(Math.random()*0xFF)
    ].join()+')';
}
const stars=[];
function shine(){
    for(let i=0; i<3;i++){
        let star = stars[~~(Math.random()*stars.length)];
        ctx.beginPath();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.arc(star[0], star[1], star[2], 0, 2 * Math.PI);
        ctx.fill();
        setTimeout(function(){
            ctx.beginPath();
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle=star[3];
            ctx.arc(star[0], star[1], star[2], 0, 2 * Math.PI);
            ctx.fill();
        },500);
    }
}
const Circle = function(){
    let h = window.innerHeight;
    let w = window.innerWidth;
    let rad = Math.floor(Math.random()*3)+3;
    let x=Math.random()*(w-rad*2)+rad;
    let y=Math.random()*(h-rad*2)+rad;
    let colorC = getBackgroundColor();
    ctx.beginPath();
    ctx.fillStyle=colorC;
    ctx.globalAlpha = 0.9;
    stars.push([x,y,rad,colorC]);
    ctx.arc(x, y, rad, 0, 2 * Math.PI);
    ctx.fill();
};