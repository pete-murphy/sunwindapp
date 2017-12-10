import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

import { injectGlobal } from "styled-components"

injectGlobal`
:root {
  font-size: 20px;
}

body {
  display: grid;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  background-color: #333;
  color: #f3f4f4;
  font-family: "SF Mono"
}

* {
  box-sizing: border-box;
}
`

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
