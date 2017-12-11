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

body {
  color: var(--peachDark);
  margin: 0;
  padding: 0;
  background: var(--haus);
  & * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    box-sizing: border-box;
  }
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

input[type="checkbox"] {
  &:checked {
    background: var(--peach);
  }
}
`

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
