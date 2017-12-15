import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { camelToTitle, numToMon, parse, format } from "../../functions/library"
import FormContainer from "../FormContainer"
import Checkbox from "../Checkbox"

const InputGroup = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: ${props => (props.row ? "row" : "column")};
  justify-content: ${props => (props.row ? "flex-end" : "flex-end")};
  padding: 0.5rem;
  grid-column: span ${props => (props.span ? props.span : "1")};
  & label {
    font-size: 1rem;
    padding-right: ${props => (props.row ? "1rem" : "0")};
  }
  & input {
    width: 8ch;
  }
`

export default class UsageData extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    usageData: PropTypes.arrayOf(PropTypes.number)
  }

  handleChange(e) {
    const { name, value } = e.target
    const usageData = { ...this.props.usageData }
    usageData[name] = parse(value)
    this.props.handleChange({ usageData })
  }

  render() {
    return (
      <FormContainer cols={2} header="Usage Data">
        {Object.keys(this.props.usageData).map(month => (
          <InputGroup row key={month}>
            <label htmlFor={month}>{numToMon(month)}</label>
            <input
              type="text"
              name={month}
              onChange={this.handleChange}
              value={format(",")(this.props.usageData[month])}
            />
          </InputGroup>
        ))}
      </FormContainer>
    )
  }
}
