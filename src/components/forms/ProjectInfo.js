import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import FormContainer from "../FormContainer"
import styled from "styled-components"

import { camelToTitle } from "../../functions/library"

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

  render() {
    return (
      <FormContainer>
        <h2>Project Info</h2>
        {Object.keys(this.props.projectInfo).map(category => {
          console.log(
            `Category ${category} is type ${typeof this.props.projectInfo[
              category
            ]}`
          )
          return typeof this.props.projectInfo[category] !== "object" ? (
            <InputGroup key={category}>
              <label htmlFor={category}>{camelToTitle(category)}</label>
              <input
                type="text"
                name={category}
                onChange={this.handleChange}
                value={this.props.projectInfo[category]}
              />
            </InputGroup>
          ) : (
            <Fragment>
              <h3>{camelToTitle(category)}</h3>
              {Object.keys(this.props.projectInfo[category]).map(field => (
                <InputGroup key={field}>
                  <label htmlFor={field}>{camelToTitle(field)}</label>
                  <input
                    type="text"
                    data-category={category}
                    name={field}
                    onChange={this.handleChange}
                    value={this.props.projectInfo[category][field]}
                  />
                </InputGroup>
              ))}
            </Fragment>
          )
        })}
      </FormContainer>
    )
  }
}
