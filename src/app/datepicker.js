import React,  {useState} from "react"
import PropTypes from "prop-types"
import moment from "moment"
import "react-dates/lib/css/_datepicker.css"
import { DateRangePicker } from "react-dates"

function DatePicker(props) {
  const [date, setDate] = useState({startDate: null, endDate: null})
  const [focused, setFocused] = useState(null)

  function onDatesChange({ startDate, endDate }) {
    setDate({startDate, endDate})
    if((startDate && endDate) && (startDate.isValid() && endDate.isValid())) {
      props.onDateSelected({startDate, endDate})
    }
  }
  return (
    <div className="date-picker">
      <DateRangePicker
        startDate={date.startDate}
        endDate={date.endDate}
        startDateId="start_date"
        endDateId="end_date"
        onDatesChange={onDatesChange}
        focusedInput={focused}
        onFocusChange={(focused) =>
          setFocused(focused)
        }
        isOutsideRange={day => (moment().diff(day) < 0)}
      />
    </div>
  )
}

DatePicker.propTypes = {
  onDateSelected: PropTypes.func
}

export default DatePicker
