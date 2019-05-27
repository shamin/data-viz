import React from "react"
import PropTypes from "prop-types"

const header = ["Timestamp", "Game", "Revenue", "Impressions"]

function Table(props) {
  return(
    <table>
      <thead>
        <tr>
          {header.map((h)=><th key={h}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {props.data.map((d)=>(
          <tr key={d.timestamp}>
            <td>{d.timestamp}</td>
            <td>{d.game}</td> 
            <td>{d.revenue}</td>
            <td>{d.impressions}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.array
}

export default Table

