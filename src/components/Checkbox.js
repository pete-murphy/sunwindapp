import React, { Component, Fragment } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  transition: 0.2s all;
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  opacity: ${props => (props.disabled ? "0.5" : "1")};
`

const SVG = styled.svg`
  width: 1rem;
  height: 1rem;
  stroke-width: 1px;
  stroke: var(--night);
  fill: transparent;
  margin-right: 0.5rem;
  & circle {
    clip-path: url(#clipPath);
    ${"" /* stroke-dashoffset: ${props =>
      props.checked ? "0" : `${Math.ceil(10 * Math.sqrt(2))}`};
    stroke-dasharray: ${Math.ceil(10 * Math.sqrt(2))}; */} transition: 0.2s all;
    stroke-width: ${props => (props.checked ? "20" : "0")};
    stroke: var(--peachDark);
  }
`

const CheckboxSVG = props => (
  <SVG checked={props.checked} viewbox="0 0 20 20">
    <defs>
      <clipPath id="clipPath">
        <rect x="3" y="3" width="14" height="14" />
      </clipPath>
    </defs>
    {/* <line x1="10" y1="10" x2="0" y2="20" />
    <line x1="10" y1="10" x2="0" y2="0" />
    <line x1="10" y1="10" x2="20" y2="20" />
    <line x1="10" y1="10" x2="20" y2="0" /> */}
    <circle cx="10" cy="10" r="10" />
    <rect x="0" y="0" width="20" height="20" />
  </SVG>
)

export default class Checkbox extends Component {
  render() {
    const { onClick, checked, label, disabled } = this.props
    return (
      <Container disabled={disabled} onClick={!disabled ? onClick : undefined}>
        <CheckboxSVG checked={checked} />
        <label>{label}</label>
      </Container>
    )
  }
}
