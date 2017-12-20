import React, { Component } from "react"
import styled from "styled-components"

const SVG = styled.svg`
  margin-right: 0.5rem;
  width: 2rem;
  height: 2rem;
  align-self: center;
  justify-self: center;
  transition: 0.2s all;
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  opacity: ${props => (props.disabled ? "0.5" : "1")};
  stroke: var(--night);
  stroke-width: 2px;
  fill: none;
  stroke-miterlimit: 10;
  stroke-linecap: round;
`

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid var(--night);
  background: var(--sur);
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  opacity: ${props => (props.disabled ? "0.5" : "1")};
  display: flex;
  align-items: center;
  font-size: 0.8rem;
`

export default class Duplicate extends Component {
  render() {
    return (
      <Button disabled={this.props.disabled} onClick={this.props.onClick}>
        <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M10.68 7.5a3 3 0 0 1 2.82-2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-2 2.82" />
          <rect x="5.5" y="10.5" width="16" height="16" rx="3" ry="3" />
          <path d="M17.5 18.5h-8M13.5 14.5v8" />
        </SVG>
        Duplicate Last
      </Button>
    )
  }
}
