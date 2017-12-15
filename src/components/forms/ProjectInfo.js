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

export default class ProjectInfo extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  static propTypes = {
    projectInfo: PropTypes.shape({
      isCommercial: PropTypes.bool.isRequired,
      incentivePrograms: PropTypes.objectOf(PropTypes.bool).isRequired,
      sRECMarketSector: PropTypes.number,
      mACRSTaxRate: PropTypes.number
    })
  }

  handleChange(e) {
    const { name, value } = e.target
    const { category } = e.target.dataset
    const projectInfo = { ...this.props.projectInfo }
    category
      ? (projectInfo[category][name] = value)
      : (projectInfo[name] = value)

    this.props.handleChange(projectInfo)
  }

  handleClick(s) {
    const { name, category } = s
    const projectInfo = { ...this.props.projectInfo }
    category
      ? (projectInfo[category][name] = !projectInfo[category][name])
      : (projectInfo[name] = !projectInfo[name])
    console.log(JSON.stringify(projectInfo, null, 2))
    this.props.handleChange({ projectInfo })
  }

  render() {
    return (
      <FormContainer>
        <h2>Project Settings</h2>
        {Object.keys(this.props.projectInfo).map(
          category =>
            typeof this.props.projectInfo[category] !== "object" ? (
              <InputGroup key={category}>
                {typeof this.props.projectInfo[category] === "boolean" ? (
                  <Checkbox
                    name={category}
                    label={camelToTitle(category)}
                    handleClick={this.handleClick}
                    checked={this.props.projectInfo[category]}
                  />
                ) : (
                  <Fragment>
                    <label htmlFor={category}>{camelToTitle(category)}</label>
                    <input
                      type="text"
                      name={category}
                      onChange={this.handleChange}
                      value={this.props.projectInfo[category]}
                    />
                  </Fragment>
                )}
              </InputGroup>
            ) : (
              <Fragment key={category}>
                <h3>{camelToTitle(category)}</h3>
                {Object.keys(this.props.projectInfo[category]).map(field => (
                  <InputGroup key={field}>
                    <Checkbox
                      category={category}
                      name={field}
                      label={camelToTitle(field)}
                      handleClick={this.handleClick}
                      checked={this.props.projectInfo[category][field]}
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
