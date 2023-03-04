import moment from 'moment'
import { Todo } from '../@types'

export const getNthDate = (n: number) => {
  const today = moment()
  const nthDay = today.add(n, 'days')
  return nthDay.toDate()
}

export const sortByTime = (a: Todo, b: Todo) => {
  return a.endAt.getTime() - b.endAt.getTime()
}
