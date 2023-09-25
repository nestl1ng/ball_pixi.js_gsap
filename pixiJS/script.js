let app = new PIXI.Application({ width: 808, height: 808 });
document.body.appendChild(app.view);

let frame = new PIXI.Graphics();
frame.beginFill(0x666666);
frame.drawRect(0, 0, 800, 800);
frame.position.set(4, 4);
app.stage.addChild(frame);

let ball = PIXI.Sprite.from('assets/ball.png');
ball.width=50;
ball.height=50;
ball.x=0;
ball.y=750;

frame.eventMode = 'static';
frame.cursor = 'pointer';


frame.on('mousedown', ()=>{
    gsap.to(ball, { duration: 2.5, ease: "circ", x: ball.x+50,y:ball.y-100});
    setTimeout(()=>{
        gsap.to(ball, { duration: 2.5, ease: "bounce.out", y:750});
    },500)
});

frame.addChild(ball);


