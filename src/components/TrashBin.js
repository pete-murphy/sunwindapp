import React, { Component } from "react"
import styled from "styled-components"

const SVG = styled.svg`
  margin-right: 0.5rem;
  width: 2rem;
  height: 2rem;
  align-self: center;
  justify-self: center;
  transition: 0.2s all;
  stroke: currentColor;
  stroke-width: 2px;
  fill: none;
  stroke-miterlimit: 10;
  stroke-linecap: round;
`

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid currentColor;
  background: var(--peach);
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  opacity: ${props => (props.disabled ? "0.5" : "1")};
  display: flex;
  align-items: center;
  font-size: 0.8rem;
`

export default class TrashBin extends Component {
  render() {
    return (
      <Button disabled={this.props.disabled} onClick={this.props.onClick}>
        <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M7.94 7h15.5v17a3 3 0 0 1-3 3h-9.5a3 3 0 0 1-3-3V7z" />
          <path d="M6 7h19.38" />
          <path d="M14.78 4h1.81a2 2 0 0 1 2 2v1h-5.81V6a2 2 0 0 1 2-2z" />
          <path d="M19.53 12.19v10M11.84 12.19v10M15.69 11.5v12" />
        </SVG>
        Remove Last
      </Button>
    )
  }
}
