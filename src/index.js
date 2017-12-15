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
  --pear: #93daab;
  --pearDark: #2e854b;
  --sur: #96dbe4;
  --surDark: #24828f;
  font-size: 16px;
  line-height: 1.4128;
}

body {
  color: var(--night);
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
