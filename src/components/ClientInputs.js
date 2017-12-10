import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"

export default class ClientInfo extends Component {
  static propTypes = {
    name: PropTypes.shape({
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired
    }).isRequired,
    address: PropTypes.shape({
      number: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      town: PropTypes.string.isRequired
    }),
    usageData: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  }

  static defaultProps = {
    name: {
      first: "Jane",
      last: "Doe"
    }
  }

  render() {
    return (
      <Fragment>
        <h1>Customer info</h1>
        <form>
          {Object.keys(this.props).map(
            prop =>
              typeof this.props[prop] === "object" ? (
                <Fragment>
                  <h2>{prop}</h2>
                  {Object.keys(this.props[prop]).map(subProp => (
                    <Fragment>
                      <label htmlFor={subProp}>{subProp}</label>
                      <input type="text" value={this.props[prop][subProp]} />
                    </Fragment>
                  ))}
                </Fragment>
              ) : (
                <Fragment>
                  <label htmlFor={prop}>{prop}</label>
                  <input type="text" value={this.props[prop]} />
                </Fragment>
              )
          )}
        </form>

        {Object.keys(this.props).map(
          prop =>
            typeof this.props[prop] === "object" ? (
              <Fragment key={prop}>
                <div>{prop} is an object and these are its properties:</div>
                {Object.keys(this.props[prop]).map(subProp => (
                  <div>
                    {prop}[{subProp}] is type {typeof this.props[prop][subProp]}
                  </div>
                ))}
              </Fragment>
            ) : (
              <div>
                {prop} is type {typeof this.props[prop]}
              </div>
            )
        )}
      </Fragment>
    )
  }
}
