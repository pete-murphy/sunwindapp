import React, { Component } from "react"
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
    transition: 0.3s ease all;
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

    <circle cx="10" cy="10" r="10" />
    <rect x="0" y="0" width="20" height="20" />
  </SVG>
)

export default class Checkbox extends Component {
  state = { ...this.props }
  handleClick = () => {
    this.setState(({ checked }) => ({ checked: !checked }))
    this.props.handleClick(this.state)
  }

  render() {
    const { checked, label, disabled } = this.props
    return (
      <Container
        disabled={disabled}
        onClick={!disabled ? this.handleClick : undefined}
      >
        <CheckboxSVG checked={checked} />
        <label>{label}</label>
      </Container>
    )
  }
}
