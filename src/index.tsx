import { render } from "solid-js/web";

import "./index.css";
import App from "./App";

if (!window.indexedDB) {
  alert(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  );
  throw new Error("indexedDB not supported.");
}

render(() => <App />, document.getElementById("root") as HTMLElement);
