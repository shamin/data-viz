import React, {useState, useEffect} from "react"
import axios from "axios"
import { data_endpoint } from "./api"

function App() {
  const [data, setData] = useState({records: [], error: false})

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios(data_endpoint)
        setData({records: response.data, error: true})
      } catch(e) {
        setData({records: [], error: true})
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      {data.records.map((d)=><p key={d.timestamp}>{d.game}</p>)}
    </div>
  )
}

export default App
