$(document).ready(function(){
    // $('.menu-button').on('click', function(){
    //     $(':nth-child(3)',this).toggleClass('open');
    // });
    // $('.nav-link').on('click',function(){
    //     $('.navbar-collapse').collapse('hide');
    //     $('.menu-button').children(2).removeClass('open');
    // });
    createCanvas();
    flyAstronaut();
    setInterval(shine,1000);
    // $(window).on('scroll', Astronaut);
    $(window).on('resize', createCanvas);
    $(window).on('resize', flyAstronaut)
});
// class Point{
//     constructor(o){
//         this.x=o.offset().left;
//         this.y=o.offset().top + o.height();
//     }
//     get newLocation(){
//         return this.newLocation();
//     }
//     newLocation(stepX, stepY, angle){
//         this.stepY = stepY;
//         // this.css('transform', 'translate('+stepX +'px,'+ stepY + 'px) rotate(' + angle + 'deg)');
//         return {x:stepX, y: this.stepY};
//     }
//     howFar(){
//         return this.stepY - this.y;
//     }
// } 
// let astronaut = new Point($('.astronaut'));
// let moon = new Point($('.moon'));
// let routeX = -Math.abs(moon.x - astronaut.x);
// let routeY = Math.abs(moon.y- astronaut.y);
// let stepY = $(window).scrollTop();
// let stepX = stepY/routeY * routeX;
// let angle = (astronaut.howFar() - astronaut.y) / routeY * 360;

// while(astronaut.howFar()<0){
//     astronaut.newLocation(stepX, stepY, angle);
// }

let planet = {
    y: $('.planet').offset().top,
    x: $('.planet').offset().left + $('.planet').width()/2
}
function setAstronaut(planet){
    $('.astronaut').css('top', planet.y + 'px');
    $('.astronaut').css('left', planet.x -  $('.astronaut').width()/2 +'px');
    $('.astronaut').css('opacity', 1);
    return {
        y: $('.astronaut').offset().top,
        x: $('.astronaut').offset().left
    }
}
let astronaut = setAstronaut(planet)
let moon = {
    y: $('.moon').offset().top + $('.moon').height()/2,
    x: $('.moon').offset().left + $('.moon').width()/2 -  $('.astronaut').width()/2
}
console.log('document height', $(document).height())
let routeX = Math.abs(moon.x - astronaut.x);
let routeY = Math.abs(moon.y- astronaut.y);
console.log('astronaut: ', astronaut, 'moon: ', moon)
function flyAstronaut(){
    const initFoot = astronaut.y + $('.astronaut').height();
    let angle = 0;
    let foot = initFoot;
    let stepY;
    function fly(){
        if (moon.y > foot){
            stepY = moon.y/ routeY * $(window).scrollTop()
            stepX = foot/routeY * routeX;
            foot = stepY + initFoot;
            console.log('stepY: ', stepY, 'stepX: ', stepX, 'foot: ', foot);
        } else {
            $('.potential-typing').addClass('typing');
            console.log('koniec')
            return;
        }
        $('.astronaut').css('transform', 'translate('+stepX +'px,'+ stepY + 'px) rotate(' + angle + 'deg)');
        angle = (foot / routeY *360) % 360;
    }
    $(window).on('scroll', fly);
}

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
// function getBackgroundColor() {
//     return 'rgb('+[
//         Math.round(Math.random()*0xFF),
//         Math.round(Math.random()*0xFF),
//         Math.round(Math.random()*0xFF)
//     ].join()+')';
// }
const stars=[];
function shine(){
    for(let i=0; i<3;i++){
        let star = stars[~~(Math.random()*stars.length)];
        ctx.beginPath();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.arc(star[0], star[1], star[2]+1, 0, 2 * Math.PI);
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
    let rad = Math.floor(Math.random()*2)+2;
    // let innerRad = Math.ceil((rad-1)/2);
    let x=Math.random()*(w-rad*2)+rad;
    // let innerX = Math.ceil(x/2);
    let y=Math.random()*(h-rad*2)+rad;
    // let innerY = Math.ceil(y/2);
    // let radgrad = ctx.createRadialGradient(innerX, innerY, innerRad, x, y, rad);
    // radgrad.addColorStop(0,'white');
    // radgrad.addColorStop(0.8, 'snow');
    // radgrad.addColorStop(1, 'azure');
    // let colorC = getBackgroundColor();
    let colorC = "rgb(240,240,240)";
    ctx.beginPath();
    ctx.fillStyle=colorC;
    // ctx.fillStyle = radgrad;
    ctx.globalAlpha = 0.9;
    stars.push([x,y,rad,colorC]);
    ctx.arc(x, y, rad, 0, 2 * Math.PI);
    ctx.fill();
};