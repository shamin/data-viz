import React from "react"
import PropTypes from "prop-types"
import { Button } from "evergreen-ui"

function Pagination({pages, selected, onSelect}) {
  return (
    <div className="pagination">
      <Button marginRight={16} appearance="minimal" intent="none" onClick={()=>selected !== 1 && onSelect(selected-1)}>&lt;&lt;</Button>
      {[...Array(pages).keys()].map((i) =>(
        <Button key={i + 1} marginRight={16} appearance="minimal" intent="none" isActive={(selected === i + 1)} onClick={()=>onSelect(i+1)}>{i + 1}</Button>
      ))}
      <Button marginRight={16} appearance="minimal" intent="none" onClick={()=>pages !== selected && onSelect(selected+1)}>&gt;&gt;</Button>
    </div>
  )
}

Pagination.propTypes = {
  pages : PropTypes.number,
  selected : PropTypes.number,
  onSelect : PropTypes.func
}

export default Pagination
