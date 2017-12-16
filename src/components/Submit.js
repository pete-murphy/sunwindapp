import React, { Component } from "react"
import styled from "styled-components"

const SVG = styled.svg`
  width: 2rem;
  height: 2rem;
  align-self: center;
  justify-self: center;
  transition: 0.2s all;
  stroke: var(--night);
  stroke-width: 2px;
  fill: none;
  stroke-miterlimit: 10;
  stroke-linecap: round;
  & circle {
    fill: var(--night);
    stroke-width: 0;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid var(--night);
  background: var(--pear);
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  opacity: ${props => (props.disabled ? "0.5" : "1")};
  display: flex;
  align-items: center;
`

export default class Submit extends Component {
  render() {
    return (
      <Button disabled={this.props.disabled} onClick={this.props.onClick}>
        <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <rect x="8.08" y="5.64" width="16" height="22" rx="3" ry="3" />
          <rect x="11.58" y="8.45" width="9" height="4.85" rx="2" ry="2" />
          <circle cx="14.58" cy="15.96" r="1" />
          <circle cx="17.58" cy="15.96" r="1" />
          <circle cx="11.58" cy="15.96" r="1" />
          <circle cx="20.58" cy="15.96" r="1" />
          <circle cx="14.58" cy="18.58" r="1" />
          <circle cx="17.58" cy="18.58" r="1" />
          <circle cx="11.58" cy="18.58" r="1" />
          <circle cx="20.58" cy="18.58" r="1" />
          <circle cx="14.58" cy="21.21" r="1" />
          <circle cx="17.58" cy="21.21" r="1" />
          <circle cx="11.58" cy="21.21" r="1" />
          <circle cx="14.58" cy="23.83" r="1" />
          <circle cx="17.58" cy="23.83" r="1" />
          <circle cx="11.58" cy="23.83" r="1" />
          <path d="M20.58 21.21v2.62" />{" "}
        </SVG>
        <label>Calculate System Performance</label>
      </Button>
    )
  }
}
