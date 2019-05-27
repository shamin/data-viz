import React from "react"
import PropTypes from "prop-types"
import {
  Table,
  Popover,
  Position,
  Menu,
  TextDropdownButton,
  Combobox,
  Text
} from "evergreen-ui"
import Pagination from "./pagination"

const Order = {
  NONE: "NONE",
  ASC: "ASC",
  DESC: "DESC"
}

const header = ["timestamp", "game", "revenue", "impressions", "ecpm"]

export default class DataTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchQuery: "",
      orderedColumn: 0,
      ordering: Order.ASC,
      selectedPage: 1,
      perPage: 5
    }
  }

  sort(data) {
    const { ordering, orderedColumn } = this.state
    if (ordering === Order.NONE) return data

    let propKey = header[orderedColumn]

    if(propKey === "ecpm")
      return [...data].sort((a, b) => {
        let aValue = (a.revenue/a.impressions) * 1000
        let bValue = (b.revenue/b.impressions) * 1000
  
        const sortTable = { true: 1, false: -1 }
  
        if (this.state.ordering === Order.ASC) {
          return aValue === bValue ? 0 : sortTable[aValue > bValue]
        }
  
        return bValue === aValue ? 0 : sortTable[bValue > aValue]
      })
    return [...data].sort((a, b) => {
      let aValue = a[propKey]
      let bValue = b[propKey]

      const sortTable = { true: 1, false: -1 }

      if (this.state.ordering === Order.ASC) {
        return aValue === bValue ? 0 : sortTable[aValue > bValue]
      }

      return bValue === aValue ? 0 : sortTable[bValue > aValue]
    })
  }

  getIconForOrder(order) {
    switch (order) {
    case Order.ASC:
      return "arrow-up"
    case Order.DESC:
      return "arrow-down"
    default:
      return "caret-down"
    }
  }

  renderHeader(text, index) {
    return (
      <Table.TextHeaderCell key={text}>
        <Popover
          position={Position.BOTTOM_LEFT}
          content={({ close }) => (
            <Menu>
              <Menu.OptionsGroup
                title="Order"
                options={[
                  { label: "Ascending", value: Order.ASC },
                  { label: "Descending", value: Order.DESC }
                ]}
                selected={
                  this.state.orderedColumn === index ? this.state.ordering : null
                }
                onChange={value => {
                  this.setState({
                    orderedColumn: index,
                    ordering: value
                  })
                  close()
                }}
              />
            </Menu>
          )}
        >
          <TextDropdownButton
            icon={
              this.state.orderedColumn === index
                ? this.getIconForOrder(this.state.ordering)
                : "caret-down"
            }
          >
            {text}
          </TextDropdownButton>
        </Popover>
      </Table.TextHeaderCell>
    )
  }

  renderRow(d, i) {
    return (
      <Table.Row key={`${d.timestamp} ${i} ${d.revenue}`}>
        <Table.TextCell>{d.timestamp}</Table.TextCell>
        <Table.TextCell>{d.game}</Table.TextCell>
        <Table.TextCell isNumber>{d.revenue}</Table.TextCell>
        <Table.TextCell isNumber>{d.impressions}</Table.TextCell>
        <Table.TextCell isNumber>{((d.revenue/d.impressions) * 1000).toFixed(3)}</Table.TextCell>
      </Table.Row>
    )
  }

  render() {
    const { data } = this.props 
    const { selectedPage, perPage } = this.state
    const dataSorted = this.sort(data).slice((selectedPage - 1) * perPage, (selectedPage * perPage))
    return (
      <div>
        <div className="dropdown">
          <Text size={500}>Items per page</Text>
          <Combobox
            items={[5, 10]}
            width={70}
            defaultSelectedItem={perPage}
            onChange={selected => {this.setState({perPage: selected, selectedPage: 1})}}
          />
        </div>
        <Table border>
          <Table.Head>
            {header.map((h, i)=>this.renderHeader(h, i))}
            <Table.HeaderCell width={48} flex="none" />
          </Table.Head>
          <Table.VirtualBody height={47*perPage}>
            {dataSorted.map((item, i) => this.renderRow(item, i))}
          </Table.VirtualBody>
        </Table>

        <Pagination selected={this.state.selectedPage} pages={Math.ceil(data.length/perPage)} onSelect={(page=>{this.setState({selectedPage: page})})}/>
      </div>
    )
  }
}

DataTable.propTypes = {
  data: PropTypes.array
}
