$(function(){
    createCanvas();
    flyAstronaut();
    setInterval(shine,1000);
    $(window).on('resize', createCanvas);
    $(window).on('resize', flyAstronaut);
    $(document).scroll(function () {
        $('.navigation').toggleClass('scrolled', $(this).scrollTop() > $(window).height()-150);
    });
    $('.nav-link').on('click', function(){
        $('.navbar-collapse').removeClass('show');
    })
});

function setAstronaut(planet){
    $('.astronaut').css('top', planet.y - $('.home').css('padding-bottom') + 'px');
    $('.astronaut').css('left', planet.x -  $('.astronaut').width()/2 +'px');
    $('.astronaut').css('opacity', 1);
    return {
        y: $('.astronaut').offset().top,
        x: $('.astronaut').offset().left
    }
}

function flyAstronaut(){
    let planet = {
        y: $('.planet').offset().top,
        x: $('.planet').offset().left + $('.planet').width()/2
    }
    let astronaut = setAstronaut(planet);
    let moon = {
        y: $('.moon').offset().top + $('.moon').height()/2,
        x: $('.moon').offset().left + $('.moon').width()/2 -  $('.astronaut').width()/2
    }
    // console.log('astronaut: ', astronaut, 'moon: ', moon)
    let routeX = Math.abs(moon.x - astronaut.x);
    let routeY = Math.abs(moon.y- astronaut.y);
    const initFoot = astronaut.y + $('.astronaut').height();
    let angle = 0;
    let foot = initFoot;
    let stepX;
    let stepY;
    function fly(){
        if (moon.y > foot){
            stepY = moon.y/ routeY * $(window).scrollTop()
            stepX = foot/routeY * routeX;
            foot = stepY + initFoot;
        } else {
            angle=360;
            $('.potential-typing').addClass('typing');
        }
        if (moon.x < astronaut.x){
            stepX = -stepX;
        }
        // console.log('stepY: ', stepY, 'stepX: ', stepX, 'foot: ', foot);
        $('.astronaut').css('transform', 'translate('+stepX +'px,'+ stepY + 'px) rotate(' + angle + 'deg)');
        angle = (foot / routeY *360) % 360;
    }
    $(window).on('scroll', fly);
}
const canvas = $('<canvas></canvas>').addClass('canvas-stars').attr('aria-hidden','true');
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
    let x=Math.random()*(w-rad*2)+rad;
    let y=Math.random()*(h-rad*2)+rad;
    let colorC = "rgb(255,255,255)";
    ctx.beginPath();
    ctx.fillStyle=colorC;
    ctx.globalAlpha = 0.9;
    stars.push([x,y,rad,colorC]);
    ctx.arc(x, y, rad, 0, 2 * Math.PI);
    ctx.fill();
};