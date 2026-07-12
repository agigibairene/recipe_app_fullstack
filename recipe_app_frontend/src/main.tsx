import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup.tsx';
import Login from './components/Login.tsx';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store}>
     <RouterProvider  router={routes}/>
   </Provider>
  </StrictMode>,
)
