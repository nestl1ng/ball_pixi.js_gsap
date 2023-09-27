import Image from 'next/image'
import styles from './page.module.css'
import BallImg from './assets/ball.png'
import { gsap } from "gsap/dist/gsap";

import * as PIXI from 'pixi.js';

export default function Home() {
  const app = new PIXI.Application();


  //document.body.appendChild(app.view);
  return (
    <main className={styles.main}>
      <Image
        src={BallImg}
        width={20}
        height={20}
        alt="ball"
      />
    </main>
  )
}
