import React, { Component, Fragment } from "react"

import Checkbox from "./Checkbox"

export default class TestComponent extends Component {
  state = {
    checked: false
  }
  toggle = e => {
    console.log(e)
    this.setState(({ checked }) => ({ checked: !checked }))
  }

  render() {
    return (
      <Fragment>
        <Checkbox
          checked={this.state.checked}
          onClick={this.toggle}
          label={`You are a poop?`}
          disabled={false}
        />
        <div>This is another div</div>
        <div>This is another div</div>
        <div>This is another div</div>
      </Fragment>
    )
  }
}
