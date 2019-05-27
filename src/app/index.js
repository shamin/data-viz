import React, {useState, useEffect} from "react"
import { Heading, Text, Combobox } from "evergreen-ui"
import axios from "axios"
import { data_endpoint } from "./api"
import { rangeBetween } from "./utils"
import Datepicker from "./datepicker"
import Chart from "./chart"
import Table from "./datatable"

function App() {
  const [data, setData] = useState({records: [], error: false})
  const [dates, setDates] = useState({startDate: null, endDate: null})
  const [game, setGame] = useState("Callbreak Multiplier")

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const response = await axios(data_endpoint)
      setData({records: response.data, error: false})
    } catch(e) {
      setData({records: [], error: true})
    }
  }

  function getFilteredData({records}) {
    const {startDate, endDate} = dates
    let newRecords = [...records]
    if(game !== "Both")
      newRecords = records.filter((d)=>(d.game === game))
    if((startDate && endDate) && (startDate.isValid() && endDate.isValid())) {
      const range = rangeBetween(startDate, endDate)
      return newRecords.filter((d)=>range(d.timestamp))
    }
    return newRecords
  }

  const records = getFilteredData(data)

  return (
    <div className="app">
      <Heading size={800} marginTop="default" textAlign="center" marginBottom="20">Welcome to Data Viz</Heading>
      { data.error ? <div className="visualizations">Some error occured</div> :
        (<>
          <Datepicker 
            onDateSelected={(dates)=>{setDates(dates)}}
          />
          <div className="visualizations">
            <div className="dropdown">
              <Text size={500}>Select Game</Text>
              <Combobox
                items={["Callbreak Multiplier", "World Cricket Championship", "Both"]}
                width={250}
                defaultSelectedItem={"Callbreak Multiplier"}
                onChange={selected => {setGame(selected)}}
              />
            </div>
          </div>
          {
            records.length > 0 ?
              (<div className="visualizations">
                <Heading size={500} marginTop="default" textAlign="center" marginBottom="20">Chart View</Heading>
                <Chart data={records}></Chart>
                <Heading size={500} marginTop="default" textAlign="center" marginBottom="20">Table View</Heading>
                <Table data={records}></Table>
              </div>)
              :
              <div className="visualizations">No data available for the date range</div>
          }
        </>)
      }
    </div>
  )
}

export default App
