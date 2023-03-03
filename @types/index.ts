export interface IModalProps {
  labelOk: string
  labelCancel: string
  initialText?: string
}

export interface Todo {
  id: number
  title: string
  completed: boolean
  endAt: Date
}

export interface IDelModalProps {
  todo: Todo
  callback: (todo: Todo) => void
}
