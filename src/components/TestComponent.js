import React, { Component } from "react"
import styled from "styled-components"

import FormContainer from "./FormContainer"

const InputGroup = styled.div`
  display: flex;
  flex-direction: ${props => (props.row ? "row" : "column")};
  justify-content: ${props => (props.row ? "flex-start" : "flex-end")};
  padding: 0.5rem;
  max-width: 100%;
  grid-column: ${props => (props.span ? props.span : "1")};
  & label {
    font-size: 1rem;
  }
  & input {
    padding: 0.25rem;
    width: 8ch;
  }
`

export default class TestComponent extends Component {
  state = {
    checked: false
  }
  toggle = e => {
    console.log(e)
    this.setState(({ checked }) => ({ checked: !checked }))
  }

  render() {
    return (
      <FormContainer cols={2}>
        <h2>Test Component</h2>
        <InputGroup row>
          <label htmlFor="">Hello</label>
          <input type="text" />
        </InputGroup>
      </FormContainer>
    )
  }
}
