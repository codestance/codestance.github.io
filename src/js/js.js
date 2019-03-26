const h = window.innerHeight;
const w = window.innerWidth;
$(document).ready(function(){
    $('.menu-button').on('click', function(){
        $(':nth-child(3)',this).toggleClass('open');
    })
    $('.nav-link').on('click',function(){
        $('.navbar-collapse').collapse('hide');
        $('.menu-button').children(2).removeClass('open');
    })
    $(window).on('scroll',getPotencial);
    createCanvas();
})

function getPotencial(){
    let step = window.pageYOffset*0.3<h-100 ? window.pageYOffset*0.3: h-100;    
    return $('.astronaut-box').css('transform','translateY(-'+ step + 'px)');
}

// function generateStars(){
//     let settings={
//         color: '#fff',
//         amounth: 100,
//         minSize: 3,
//         maxSize: 7,
//         alpha: Math.round()
//     };
// }

const canvas = $('<canvas></canvas>').addClass('canvas-stars');
const ctx = canvas[0].getContext("2d");
function createCanvas(){
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    canvas.appendTo('.home');
    canvas[0].height=canvas[0].clientHeight;
    canvas[0].width=canvas[0].clientWidth;
    for(let i=0; i<100; i++){
        new Circle();       
    }
}

function getBackgroundColor() {
    return "rgb("+[
        Math.round(Math.random()*0xFF),
        Math.round(Math.random()*0xFF),
        Math.round(Math.random()*0xFF)
    ].join()+")";
}

const Circle = function(){
    ctx.beginPath();
    ctx.fillStyle=getBackgroundColor();
    let rad = Math.floor(Math.random()*3)+2;
    let x=Math.random()*(w-rad*2)+rad;
    let y=Math.random()*(h-rad*2)+rad;
    // console.log(x,y,rad)
    ctx.arc(x, y, rad, 0, 2 * Math.PI);
    // debugger
    ctx.fill();
}