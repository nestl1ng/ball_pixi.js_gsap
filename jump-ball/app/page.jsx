"use client"
import styles from "./page.module.css";
import Maincanvas from "../components/Maincanvas";
import store from "./store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <main className={styles.main}>
        <Maincanvas />
      </main>
    </Provider>
  );
}
