import React, { Component } from "react"
import { arc, pie } from "d3-shape"
import { scaleOrdinal } from "d3-scale"
import { select } from "d3-selection"

export default class Donut extends Component {
  constructor() {
    super()
    this.createDonutChart = this.createDonutChart.bind(this)
  }

  componentDidMount() {
    this.createDonutChart()
  }

  componentDidUpdate() {
    this.createDonutChart()
  }

  createDonutChart() {
    const { energyProduced, energyUsed, diameter } = this.props
    const radius = diameter / 2

    const node = this.node,
      w = diameter,
      h = diameter

    const calcDataset = (n, d) => [n, d - n]

    const data = calcDataset(energyProduced, energyUsed)

    const g = select(node)
      .append("g")
      .attr("transform", `translate(${w / 2}, ${h / 2})`)

    const colors = ["tomato", "transparent"]

    const z = scaleOrdinal().range(colors)

    const path = arc()
      .outerRadius(radius)
      .innerRadius(radius / 2)

    const p = pie()
      .sort(null)
      .value(d => d)

    const a = g
      .selectAll(".arc")
      .data(p(data))
      .enter()
      .append("g")
      .attr("class", "arc")

    a
      .append("path")
      .attr("d", path)
      .data(data)
      .style("fill", d => z(d))
  }

  render() {
    const { diameter } = this.props
    return (
      <svg
        ref={node => (this.node = node)}
        width={diameter}
        height={diameter}
      />
    )
  }
}
