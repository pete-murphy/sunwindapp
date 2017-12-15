import React, { Component } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 100%;
  width: 100%;
  flex-direction: column;
`

const Header = styled.h2`
  font-weight: 800;
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

export default class FormContainer extends Component {
  render() {
    return (
      <Container>
        <Header>{this.props.header}</Header>
        <Grid cols={this.props.cols}>{this.props.children}</Grid>
      </Container>
    )
  }
}
