import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import {
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

const convertToDollars = (kWh, rate) => kWh * (rate / 100)
const convertToKWh = (dollars, rate) => dollars / (rate / 100)

export default class UsageData extends Component {
  constructor() {
    super()

    this.state = {
      dollarsAsUnits: false,
      useDefaults: false,
      monthlyAvg: 0,
      rate: 18
    }

    this.handleChange = this.handleChange.bind(this)
    this.toggleUseDefaults = this.toggleUseDefaults.bind(this)
    this.toggleDollars = this.toggleDollars.bind(this)
    this.handleMonthlyAvgChange = this.handleMonthlyAvgChange.bind(this)
  }

  static propTypes = {
    usageData: PropTypes.arrayOf(PropTypes.number)
  }

  handleChange(e) {
    const { name, value } = e.target
    const usageData = [...this.props.usageData]
    usageData[name] = this.state.dollarsAsUnits
      ? convertToKWh(parse(value), this.state.rate)
      : parse(value)
    this.props.handleChange({ usageData })
  }

  toggleUseDefaults() {
    this.setState(({ useDefaults }) => ({ useDefaults: !useDefaults }))
  }

  toggleDollars() {
    this.setState(({ dollarsAsUnits }) => ({ dollarsAsUnits: !dollarsAsUnits }))
  }

  handleMonthlyAvgChange(e) {
    const { value } = e.target
    const { rate, dollarsAsUnits } = this.state
    const monthlyAvg = parse(value)
    this.setState(() => ({ monthlyAvg }))
    const usageData = dollarsAsUnits
      ? generateLoadData(convertToKWh(monthlyAvg, rate))
      : generateLoadData(monthlyAvg)
    this.props.handleChange({ usageData })
  }

  componentDidUpdate() {
    console.log(JSON.stringify(this.state, null, 2))
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
        <InputRow>
          <InputGroup>
            <Checkbox
              label="Dollars as units?"
              checked={this.state.dollarsAsUnits}
              handleClick={this.toggleDollars}
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
                value={
                  this.state.dollarsAsUnits
                    ? format("$")(this.state.monthlyAvg)
                    : format(",")(this.state.monthlyAvg)
                }
              />
            </InputGroup>
          </InputRow>
        )}
        {this.state.dollarsAsUnits && (
          <InputRow>
            <InputGroup>
              <label htmlFor="rate">Utility Rate</label>
              <input
                type="text"
                name="rate"
                onChange={({ target }) =>
                  this.setState(({ rate }) => ({ rate: parse(target.value) }))
                }
                value={format("$0.00")(this.state.rate)}
              />
            </InputGroup>
          </InputRow>
        )}
        {Object.keys(this.props.usageData).map(month => (
          <InputGroup key={month}>
            <label htmlFor={month}>{numToMon(month)}</label>
            <input
              disabled={this.state.useDefaults || this.state.dollarsAsUnits}
              type="text"
              name={month}
              onChange={this.handleChange}
              value={
                this.state.dollarsAsUnits
                  ? format("$")(
                      convertToDollars(
                        this.props.usageData[month],
                        this.state.rate
                      )
                    )
                  : format(",")(this.props.usageData[month])
              }
            />
          </InputGroup>
        ))}
      </FormContainer>
    )
  }
}
