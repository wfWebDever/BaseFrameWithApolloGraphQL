// import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes/routers'
import './App.css'

const App = () => {
  // TODO
  const a = 1

  return <div className="App">{useRoutes(routes)}</div>
}

export default App
