"use client";
import store from "../store";
import styles from "../page.module.css";
import { Provider } from "react-redux";
import Cubecanvas from "../../components/Cubecanvas";
import { App } from "../_app";

export default function box() {
  return (
    <Provider store={store}>
        <div className={styles.main}>
          <Cubecanvas />
        </div>
    </Provider>
  );
}
