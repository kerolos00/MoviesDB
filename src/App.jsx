import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WOW from 'wowjs';
import './App.css';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Movies from './Components/Movies/Movies';
import Notfound from './Components/NotFound/Notfound';
import People from './Components/People/People';
import Register from './Components/Register/Register';
import Tvshow from './Components/Tvshow/Tvshow';


function App() {
  const [userData, setUserDate] = useState(null)

  useEffect(() => {
    new WOW.WOW({
      live: false
    }).init();
  }, [])

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData()
    }
  }, [])


  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken)
    setUserDate(decodedToken)
  }

  let routers = createBrowserRouter([
    {
      path: "", element: <Layout setUserDate={setUserDate} userData={userData} />, children: [
        { path: "/MoviesDB", element: <Home /> },
        { path: "movies", element: <Movies /> },
        { path: "tvshow", element: <Tvshow /> },
        { path: "MovieDetails/:id/:mediaType", element: <MovieDetails /> },
        { path: "people", element: <People /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "people", element: <People /> },
        { path: "*", element: <Notfound /> },
      ]
    }
  ])

  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
