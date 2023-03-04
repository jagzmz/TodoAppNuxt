import moment from 'moment'

export const getNthDate = (n: number) => {
  const today = moment()
  const nthDay = today.add(n, 'days')
  return nthDay.toDate()
}
