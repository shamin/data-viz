import React, {useState, useEffect} from "react"
import axios from "axios"
import { data_endpoint } from "./api"
import { rangeBetween } from "./utils"
import Datepicker from "./datepicker"
import Chart from "./chart"
import Table from "./datatable"

function App() {
  const [data, setData] = useState({records: [], error: false})
  const [dates, setDates] = useState({startDate: null, endDate: null})

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const response = await axios(data_endpoint)
      setData({records: response.data, error: true})
    } catch(e) {
      setData({records: [], error: true})
    }
  }

  function getFilteredData({records}) {
    const {startDate, endDate} = dates
    if((startDate && endDate) && (startDate.isValid() && endDate.isValid())) {
      const range = rangeBetween(startDate, endDate)
      return records.filter((d)=>range(d.timestamp))
    }
    return records
  }

  const records = getFilteredData(data)

  return (
    <div className="App">
      <Datepicker 
        onDateSelected={(dates)=>{setDates(dates)}}
      />
      {
        records.length > 0 ?
          (<>
            <Chart data={records}></Chart>
            <Table data={records}></Table>
          </>)
          :
          <div>No data available for the date range</div>
      }
      
    </div>
  )
}

export default App
