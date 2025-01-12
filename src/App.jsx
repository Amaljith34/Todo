import React from 'react'
import Todo from './todo/component/Todo.jsx'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Todos from './todo/component/Todos.jsx'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Todo />} />
      <Route path='/todos' element={<Todos />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
