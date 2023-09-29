import * as PIXI from 'pixi.js';
import {gsap} from "gsap/dist/gsap";

export default class CanvasBall {

    static get instance() {
        if (!this._instance) {
            this._instance = new CanvasBall();
        }
        return this._instance;
    }

    static _instance = null;

    constructor() {
        this.app = new PIXI.Application({width: 808, height: 808});
        this.frame;
        this.ball;

        // ball.paintCanvas();
        //
        // let frame = new PIXI.Graphics();
        // ball.paintFrame(frame);
        //
        // let ballSprite = PIXI.Sprite.from(BallImg.src);
        // ball.paintBall(ballSprite);
    }


    paintFrame(frame) {
        if (typeof this.app !== 'undefined') {
            this.frame = frame;
            this.frame.beginFill(0x666666);
            this.frame.drawRect(0, 0, 800, 800);
            this.frame.position.set(4, 4);
            this.app.stage.addChild(this.frame);
        }
    }

    paintBall(ball) {
        if (typeof this.frame !== 'undefined') {
            this.ball = ball;
            this.ball.width = 50;
            this.ball.height = 50;
            this.ball.x = 0;
            this.ball.y = 750;

            this.frame.eventMode = 'static';
            this.frame.cursor = 'pointer';
            this.frame.addChild(this.ball);
        }
    }
}