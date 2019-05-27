import React from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

const width = 500
const height = 300
const margin = {
  left: 50,
  right: 20,
  top: 20,
  bottom: 20
}

class Chart extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      chart: null
    }
  }

  componentDidMount(){
    this.renderChart()
  }

  renderChart() {
    const { data } = this.props
    this.xScale = d3.scaleTime().domain([d3.min(data, d => new Date(d.timestamp)), d3.max(data, d => new Date(d.timestamp))]).range([0 + margin.left, width - margin.right])
    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.revenue)])
      .range([height - margin.top, 0 + margin.bottom])

    this.xAxis = d3.axisBottom(this.xScale)
    this.yAxis = d3.axisLeft(this.yScale)

    this.line = d3.line()
      .x(d => this.xScale(new Date(d.timestamp)))
      .y(d => this.yScale(d.revenue))
    
    this.setState({
      chart: this.line(data)
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.data !==this.props.data){
      this.renderChart()
    }
    d3.select(this.refs.xAxis).call(this.xAxis)
    d3.select(this.refs.yAxis).call(this.yAxis)
  }

  render() {
    return(
      <svg width={width} height={height}>
        <path d={this.state.chart} fill='none' stroke="red"></path>
        <g>
          <g ref="xAxis" transform={`translate(0, ${height-margin.bottom})`}></g>
          <g ref="yAxis" transform={`translate(${margin.left}, 0)`}></g>
        </g>
      </svg>
    )
  }
}

Chart.propTypes = {
  data: PropTypes.array
}

export default Chart

