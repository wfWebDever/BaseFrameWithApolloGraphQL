import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes/routers'
import 'antd/dist/antd.css'
import './App.css'

function App() {
  // TODO
  return <div className="App">{useRoutes(routes)}</div>
}

export default App
