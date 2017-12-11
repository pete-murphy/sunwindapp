import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

import { injectGlobal } from "styled-components"

injectGlobal`
:root {
  --night: #333;
  --haus: #f3f4f4;
  --peach: #efada0;
  --peachDark: #e37059;
  --surDark: #24828f;
  font-size: 20px;
}

input[type="checkbox"] {
  display: inline-block;
  &:checked {
    background: var(--peach);
  }
}

body {
  display: grid;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  color: var(--peachDark);
}

* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  box-sizing: border-box;
}

input {
  background: transparent;
  border: none;
  color: var(--night);
  border-bottom: 1px solid var(--night);
  font-size: 1rem;
  &:focus {
    outline: none;
  }
}
`

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
