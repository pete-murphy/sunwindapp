import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  & > * {
    max-width: 50%;
  }
`

const Secondary = styled.div``

export default class FormContainer extends Component {
  render() {
    return (
      <Container>
        <Secondary>{this.props.children}</Secondary>
      </Container>
    )
  }
}
