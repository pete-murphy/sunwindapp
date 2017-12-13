import React, { Component, Fragment } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
`

const SVG = styled.svg`
  width: 1rem;
  height: 1rem;
  stroke-width: 1px;
  stroke: var(--night);
  fill: transparent;
  margin-right: 0.5rem;
  & line {
    stroke-dashoffset: ${props =>
      props.checked ? "0" : `${Math.ceil(10 * Math.sqrt(2))}`};
    stroke-dasharray: ${Math.ceil(10 * Math.sqrt(2))};
    transition: 0.2s ease all;
    stroke-width: 16px;
    stroke: var(--peachDark);
  }
`

const CheckboxSVG = props => (
  <SVG checked={props.checked} viewbox="0 0 24 24">
    <line x1="10" y1="10" x2="0" y2="20" />
    <line x1="10" y1="10" x2="0" y2="0" />
    <line x1="10" y1="10" x2="20" y2="20" />
    <line x1="10" y1="10" x2="20" y2="0" />
    <rect x="1" y="1" width="18" height="18" />
    )}
  </SVG>
)

export default class Checkbox extends Component {
  render() {
    const { onClick, checked, label } = this.props
    return (
      <Container onClick={onClick}>
        <CheckboxSVG checked={checked} />
        <label>{label}</label>
      </Container>
    )
  }
}
