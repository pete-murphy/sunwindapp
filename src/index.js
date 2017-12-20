import React from "react"
import ReactDOM from "react-dom"
import { darken } from "polished"
import { injectGlobal } from "styled-components"

import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

const night = "#333",
  haus = "#f3f4f4",
  peach = "#efada0",
  pear = "#93daab",
  peachDark = darken(0.2, "#efada0") // #e37059;

injectGlobal`
:root {
  --night: ${night};
  --haus: ${haus};
  --peach: ${peach};
  --peachDark: ${peachDark};
  --pear: ${pear};
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
