import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Checkbox from "./Checkbox"
import { camelToTitle } from "../functions/library"

const Form = styled.form`
  color: inherit;
`

const Fieldset = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12ch, 1fr));
  grid-gap: 20px;
  padding: 1rem;
  margin: 0.5rem;
`

const Legend = styled.div`
  & h2 {
    width: 100%;
    display: flex;
    align-items: center;
    &:after {
      height: 0.5ex;
      margin-left: 0.5rem;
      content: "";
      flex: 1 auto;
      border: none;
      border-bottom: 1px solid var(--peachDark);
    }
  }
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: ${props => (props.row ? "row" : "column")};
  justify-content: ${props => (props.row ? "flex-start" : "flex-end")};
  padding: 0.5rem;
  grid-column: span ${props => (props.span ? props.span : "1")};
  & label {
    font-size: 0.75rem;
  }
`

const Input = styled.input``

const ToggleUnits = styled.input`
  background-color: ${props => (props.kWh ? "var(--pear)" : "var(--sur)")};
`

export default class ClientForm extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  static propTypes = {
    name: PropTypes.shape({
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired
    }).isRequired, // Is this "isRequired" redundant if inner properties are required?
    address: PropTypes.shape({
      line1: PropTypes.string.isRequired,
      line2: PropTypes.string,
      town: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired
    }).isRequired,
    financialInfo: PropTypes.shape({
      isCommercial: PropTypes.bool.isRequired,
      sRECMarketSector: PropTypes.number.isRequired,
      taxRate: PropTypes.number.isRequired
    }).isRequired,
    usageData: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    incentivePrograms: PropTypes.shape({
      fITC: PropTypes.bool.isRequired,
      sMART: PropTypes.bool.isRequired,
      sREC: PropTypes.bool.isRequired,
      mACRS: PropTypes.bool.isRequired,
      nantucketSolar: PropTypes.bool.isRequired,
      netMetering: PropTypes.bool.isRequired
    }).isRequired,
    handleChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    name: {
      first: "Jane",
      last: "Doe"
    }
  }

  handleChange(e) {
    const { category } = e.target.dataset
    const { name, value } = e.target
    this.props.handleChange(value, name, category)
  }

  handleToggle(e) {
    const { category } = e.target.dataset
    const { name } = e.target
    this.props.handleToggle(name, category)
  }

  state = {
    ballparkUsageData: false,
    usageDataInKWh: true
  }

  // componentDidUpdate() {
  //   console.log(JSON.stringify(this.props, null, 2))
  // }
  render() {
    return (
      <Form>
        <h1>Customer Info</h1>
        {Object.keys(this.props).map(
          category =>
            category === "usageData" ? (
              <Fragment>
                <Legend>
                  <h2>{camelToTitle(category)}</h2>
                </Legend>
                <Fieldset>
                  <Checkbox
                    type="button"
                    on={this.state.ballparkUsageData}
                    label="Ballpark Usage Data?"
                    onClick={() =>
                      this.setState(({ ballparkUsageData }) => ({
                        ballparkUsageData: !ballparkUsageData
                      }))
                    }
                  />
                  <InputGroup>
                    <label>Arbitrary Usage Value</label>
                    <Input
                      type="text"
                      label={this.state.usageValue}
                      onChange={this.handleUsageChange}
                    />
                  </InputGroup>
                  <ToggleUnits
                    type="button"
                    value={
                      (this.state.usageDataInKWh ? "kWh" : "Dollars") +
                      (this.state.ballparkUsageData ? " per Year" : "")
                    }
                    kWh={this.state.usageDataInKWh}
                    onClick={() =>
                      this.setState(({ usageDataInKWh }) => ({
                        usageDataInKWh: !usageDataInKWh
                      }))
                    }
                  />
                </Fieldset>
              </Fragment>
            ) : (
              typeof this.props[category] !== "function" && (
                <Fragment key={category}>
                  <Legend>
                    <h2>{camelToTitle(category)}</h2>
                  </Legend>
                  <Fieldset>
                    {Object.keys(this.props[category]).map(
                      param =>
                        typeof this.props[category][param] !== "boolean" ? (
                          <InputGroup key={param}>
                            <label htmlFor={param}>{camelToTitle(param)}</label>
                            <Input
                              type="text"
                              data-category={category}
                              name={param}
                              value={this.props[category][param]}
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        ) : (
                          <InputGroup key={param} row>
                            <Checkbox
                              type="button"
                              data-category={category}
                              name={param}
                              on={this.props[category][param]}
                              onClick={this.handleToggle}
                              value={camelToTitle(param)}
                            />
                          </InputGroup>
                        )
                    )}
                  </Fieldset>
                </Fragment>
              )
            )
        )}
      </Form>
    )
  }
}
