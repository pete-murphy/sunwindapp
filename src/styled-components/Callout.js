import React from "react"
import styled from "styled-components"

const Callout = styled.div`
  background-color: var(--peach);
  position: relative;
  padding: 10px;
  border-radius: 3px;
  min-height: 50px;
  margin: 25px;
  &::before {
    content: "";
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
    position: absolute;
    left: 45%;
    bottom: -20px;
    border-top: 10px solid var(--peach);
  }
`
