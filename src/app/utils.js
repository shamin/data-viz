import moment from "moment"

export function rangeBetween(date1, date2) {
  return function (date) {
    return moment(date).add(12, "hours").isSameOrAfter(date1) && moment(date).add(12, "hours").isSameOrBefore(date2)
  }
}
