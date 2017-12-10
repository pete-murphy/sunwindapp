import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Form = styled.form`
  color: inherit;
`

const Fieldset = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8ch, 1fr));
  grid-gap: 20px;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 3px;
  margin: 0.5rem;
`

const Legend = styled.div`
  & h2 {
    width: 100%;
    display: flex;
    align-items: center;
    &:after {
      margin-left: 0.5rem;
      content: "";
      flex: 1 auto;
      border: none;
      border-top: 1px solid var(--night);
    }
  }
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.5rem;
  grid-column: span ${props => (props.span ? props.span : "1")};
  & label {
    font-size: 0.75rem;
  }
`

export default class ClientForm extends Component {
  static propTypes = {
    name: PropTypes.shape({
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired
    }).isRequired, // Is this "isRequired" redundant if inner properties are required?
    address: PropTypes.shape({
      number: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      town: PropTypes.string.isRequired
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
    }).isRequired
  }

  static defaultProps = {
    name: {
      first: "Jane",
      last: "Doe"
    }
  }

  render() {
    return (
      <Form>
        <h2>Customer info</h2>
        {Object.keys(this.props).map(
          prop =>
            typeof this.props[prop] === "object" ? (
              <Fragment>
                <Legend>
                  <h2>{prop}</h2>
                </Legend>
                <Fieldset>
                  {Object.keys(this.props[prop]).map(subProp => (
                    <InputGroup>
                      <label htmlFor={subProp}>{subProp}</label>
                      <input type="text" value={this.props[prop][subProp]} />
                    </InputGroup>
                  ))}
                </Fieldset>
              </Fragment>
            ) : (
              <Fragment>
                <Legend>{prop}</Legend>
                <Fieldset>
                  <InputGroup>
                    <label htmlFor={prop}>{prop}</label>
                    <input type="text" value={this.props[prop]} />
                  </InputGroup>
                </Fieldset>
              </Fragment>
            )
        )}
      </Form>
    )
  }
}
