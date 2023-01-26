import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => (
  <div>
    <a href="/page">Pagination Catch Demo</a>
    <Outlet />
  </div>
)

export default Home
