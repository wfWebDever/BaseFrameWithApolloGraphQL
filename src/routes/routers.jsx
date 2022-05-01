import React from 'react'
import Home from '../componts/home'
import PageDemo from '../componts/pageDemo'

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'pageDemo',
    element: <PageDemo />
  }
]

export default routes
