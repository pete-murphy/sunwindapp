import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import {
  camelToTitle,
  numToMon,
  parse,
  format,
  generateLoadData
} from "../../functions/library"
import FormContainer from "../FormContainer"
import Checkbox from "../Checkbox"

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8ch, 1fr));
  grid-gap: 1rem;
  grid-column: 1 / -1;
`

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
    width: 12ch;
  }
`

export default class UsageData extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.toggleUseDefaults = this.toggleUseDefaults.bind(this)
    this.handleMonthlyAvgChange = this.handleMonthlyAvgChange.bind(this)
  }

  state = {
    useDefaults: false,
    monthlyAvg: 0
  }

  static propTypes = {
    usageData: PropTypes.arrayOf(PropTypes.number)
  }

  handleChange(e) {
    const { name, value } = e.target
    const usageData = [...this.props.usageData]
    usageData[name] = parse(value)
    this.props.handleChange({ usageData })
  }

  toggleUseDefaults() {
    this.setState(({ useDefaults }) => ({ useDefaults: !useDefaults }))
  }

  handleMonthlyAvgChange(e) {
    const { value } = e.target
    this.setState(({ monthlyAvg }) => ({ monthlyAvg: parse(value) }))
    const usageData = generateLoadData(parse(value))
    this.props.handleChange({ usageData })
  }

  render() {
    return (
      <FormContainer cols={4} header="Usage Data">
        <InputRow>
          <InputGroup>
            <Checkbox
              label="Use default data based on monthly average?"
              checked={this.state.useDefaults}
              handleClick={this.toggleUseDefaults}
            />
          </InputGroup>
        </InputRow>
        {this.state.useDefaults && (
          <InputRow>
            <InputGroup>
              <label htmlFor="monthlyAvg">Monthly Average</label>
              <input
                type="text"
                name="monthlyAvg"
                onChange={this.handleMonthlyAvgChange}
                value={format(",")(this.state.monthlyAvg)}
              />
            </InputGroup>
          </InputRow>
        )}
        {Object.keys(this.props.usageData).map(month => (
          <InputGroup key={month}>
            <label htmlFor={month}>{numToMon(month)}</label>
            <input
              disabled={this.state.useDefaults}
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
