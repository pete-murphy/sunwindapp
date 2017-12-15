import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
`

const Grid = styled.div`
  display: grid;
  width: 50%;
  grid-template-columns: ${props =>
    props.cols ? `repeat(${props.cols}, 1fr)` : `none`};
  grid-template-rows: ${props =>
    props.rows ? `repeat(${props.rows}, 1fr)` : `none`};
  & h1,
  h2,
  h3,
  h4 {
    grid-column: ${props => (props.cols ? `span ${props.cols}` : `span 1`)};
  }
`

const Secondary = styled.div``

export default class FormContainer extends Component {
  render() {
    return (
      <Container>
        <Grid cols={this.props.cols}>{this.props.children}</Grid>
      </Container>
    )
  }
}
