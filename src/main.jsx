import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import { routes } from './App'
import './tokens.css'
import './index.css'
import './pages.css'

// Static previews (e.g. a published artifact) are served from an unknown
// path, so route on the hash instead of the pathname there.
const hash = import.meta.env.VITE_HASH_ROUTER === '1'
const create = hash ? createHashRouter : createBrowserRouter
const router = create(routes, hash ? undefined : { basename: import.meta.env.BASE_URL })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
