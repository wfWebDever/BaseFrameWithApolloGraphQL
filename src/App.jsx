import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes, privateRoutes } from './routes'
import './App.css'

const App = () => {
  // get the auth for the project
  const adminAuth = useRoutes(routes)
  const unLoginAuth = useRoutes(privateRoutes)
  const [loading, setLoading] = useState(true)
  const auth = 1

  useEffect(() => {
    setLoading(false)
    // TODO login
    // const userId = localStorage.getItem('userId')
    // if (userId) {
    //   setLoading(false)
    // }
  }, [])

  if (loading) {
    return <div>loading......</div>
  }

  return <div className="App">{auth ? adminAuth : unLoginAuth}</div>
}

export default App
