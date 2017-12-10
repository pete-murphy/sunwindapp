import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

import { injectGlobal } from "styled-components"

const peach = "#efada0"
const peachDark = "#e37059"
const night = "#333"
const surDark = "#24828f"
const haus = "#f3f4f4"

injectGlobal`
:root {
  font-size: 20px;
}

body {
  background: linear-gradient(-60deg, ${peachDark}, ${surDark});
  background-attachment: fixed;
  display: grid;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  color: ${haus};
}

* {
  font-family: "SF Mono";
  box-sizing: border-box;
}

input {
  background: transparent;
  border: none;
  color: ${haus};
  border-bottom: 1px solid ${haus};
  font-size: 1rem;
  &:focus {
    outline: none;
  }
}
`

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
