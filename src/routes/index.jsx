import React from 'react'
import Home from '../componts/home'
import PageDemo from '../componts/pageDemo'
import Login from '../componts/login'

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'page',
        element: <PageDemo />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <div>404</div>
  }
]

const privateRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <div>404</div>
  }
]

export { routes, privateRoutes }
