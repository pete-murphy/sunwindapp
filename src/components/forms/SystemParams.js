import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"

import FormContainer from "../FormContainer"

export default class SystemParams extends Component {
  render() {
    return (
      <FormContainer header="System Parameters">
        <p>
          These are used to calculate the system generated output for the first
          year, per{" "}
          <a href="https://developer.nrel.gov/docs/solar/pvwatts-v5/">
            PV Watts (Version 5) API
          </a>. If you would like to bypass this step and enter your own first
          year production value, please <Link to="/">skip</Link> to the next
          section.
        </p>
      </FormContainer>
    )
  }
}
