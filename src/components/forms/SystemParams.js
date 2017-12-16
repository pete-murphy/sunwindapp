import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import styled from "styled-components"

import TrashBin from "../TrashBin"
import Duplicate from "../Duplicate"
import Submit from "../Submit"
import { camelToTitle, format, parse } from "../../functions/library"
import FormContainer from "../FormContainer"

const Img = styled.img`
  align-self: center;
  justify-self: center;
  width: 2rem;
  height: 2rem;
`

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8ch, 1fr));
  grid-gap: 1rem;
`
const InputGroup = styled.div`
  display: flex;
  flex-direction: ${props => (props.row ? "row" : "column")};
  justify-content: ${props => (props.row ? "flex-start" : "flex-end")};
  padding: 0.5rem;
  grid-column: span ${props => (props.span ? props.span : "1")};
  & label {
    font-size: 0.8rem;
  }
`

const ControllerRow = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  & > * {
    margin: 0.5rem;
  }
`

export default class SystemParams extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.addArray = this.addArray.bind(this)
    this.removeArray = this.removeArray.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    system: PropTypes.shape({
      arrays: PropTypes.arrayOf(
        PropTypes.shape({
          moduleAmount: PropTypes.number.isRequired,
          moduleCapacity: PropTypes.number.isRequired,
          tilt: PropTypes.number.isRequired,
          azimuth: PropTypes.number.isRequired,
          arrayType: PropTypes.number.isRequired,
          costPerWatt: PropTypes.number.isRequired,
          losses: PropTypes.number.isRequired,
          output: PropTypes.array
        })
      ),
      defaultSettings: PropTypes.shape({
        moduleType: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired
      })
    })
  }

  handleChange(e) {
    e.preventDefault()
    const { name, value } = e.target
    const { array } = e.target.dataset
    const system = { ...this.props.system }
    system.arrays[array][name] = parse(value)

    this.props.handleChange({ system })
  }

  addArray(e) {
    e.preventDefault()
    this.props.addArray()
  }

  removeArray(e) {
    e.preventDefault()
    this.props.removeArray()
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSubmit()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormContainer header="System Parameters">
          <p>
            These are used to calculate the system generated output for the
            first year, per{" "}
            <a href="https://developer.nrel.gov/docs/solar/pvwatts-v5/">
              PV Watts (Version 5) API
            </a>. If you would like to bypass this step and enter your own first
            year production value, please <Link to="/">skip</Link> to the next
            section.
          </p>
          {this.props.system.arrays.map(array => {
            console.log(array)
            console.log(JSON.stringify(Object.keys(array), null, 2))
          })}
          {this.props.system.arrays.map((array, i) => (
            <InputRow key={i}>
              {Object.keys(array).map(
                name =>
                  name !== "output" && (
                    <InputGroup key={name}>
                      <label htmlFor={name}>{camelToTitle(name)}</label>
                      <input
                        onChange={this.handleChange}
                        type="text"
                        name={name}
                        data-array={i}
                        value={
                          name === "costPerWatt"
                            ? format("$0.00")(array[name])
                            : format(",")(array[name])
                        }
                      />
                    </InputGroup>
                  )
              )}
            </InputRow>
          ))}
          <ControllerRow>
            <TrashBin
              disabled={this.props.system.arrays.length === 1}
              onClick={this.removeArray}
            />
            <Duplicate onClick={this.addArray} />
            <Submit />
          </ControllerRow>
        </FormContainer>
      </form>
    )
  }
}
