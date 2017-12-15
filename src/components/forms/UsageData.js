import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import FormContainer from "../FormContainer"
import styled from "styled-components"

import { camelToTitle } from "../../functions/library"
import Checkbox from "../Checkbox"

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

export default class UsageData extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  static propTypes = {
    usageData: PropTypes.arrayOf(PropTypes.number)
  }

  handleChange(e) {
    console.log(e)
    const { name, value } = e.target
    const { category } = e.target.dataset
    const usageData = { ...this.props.usageData }
    category ? (usageData[category][name] = value) : (usageData[name] = value)

    this.props.handleChange({ usageData })
  }

  handleClick(s) {
    const { name, category } = s
    const usageData = { ...this.props.usageData }
    category
      ? (usageData[category][name] = !usageData[category][name])
      : (usageData[name] = !usageData[name])
    console.log(JSON.stringify(usageData, null, 2))
    this.props.handleChange({ usageData })
  }

  render() {
    return (
      <FormContainer>
        <h2>Project Settings</h2>
        {Object.keys(this.props.usageData).map(
          category =>
            typeof this.props.usageData[category] !== "object" ? (
              <InputGroup key={category}>
                {typeof this.props.usageData[category] === "boolean" ? (
                  <Checkbox
                    name={category}
                    label={camelToTitle(category)}
                    handleClick={this.handleClick}
                    checked={this.props.usageData[category]}
                  />
                ) : (
                  <Fragment>
                    <label htmlFor={category}>{camelToTitle(category)}</label>
                    <input
                      type="text"
                      name={category}
                      onChange={this.handleChange}
                      value={this.props.usageData[category]}
                    />
                  </Fragment>
                )}
              </InputGroup>
            ) : (
              <Fragment key={category}>
                <h3>{camelToTitle(category)}</h3>
                {Object.keys(this.props.usageData[category]).map(field => (
                  <InputGroup key={field}>
                    <Checkbox
                      category={category}
                      name={field}
                      label={camelToTitle(field)}
                      handleClick={this.handleClick}
                      checked={this.props.usageData[category][field]}
                    />
                  </InputGroup>
                ))}
              </Fragment>
            )
        )}
      </FormContainer>
    )
  }
}
