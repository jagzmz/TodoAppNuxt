export interface Todo {
  id: number
  title: string
  completed: boolean
  endAt: Date
}

export interface IModalProps {
  labelOk: string
  labelCancel: string
  todo?: Todo
}

export interface IDelModalProps {
  todo: Todo
  callback: (todo: Todo) => void
}
