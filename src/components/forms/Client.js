import React, { Component } from "react"
import PropTypes from "prop-types"
import FormContainer from "../FormContainer"

export default class Client extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
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
    handleChange: PropTypes.func.isRequired
  }

  handleChange(e) {
    const { name, value } = e.target
    const { category } = e.target.dataset
    const client = { ...this.props }
    client[category][name] = value
    this.props.handleChange(client)
  }

  render() {
    return (
      <FormContainer>
        <input
          type="text"
          category="name"
          name="last"
          onChange={this.handleChange}
          value={this.props.name.last}
        />
      </FormContainer>
    )
  }
}
