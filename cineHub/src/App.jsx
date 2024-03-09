import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Component/Home'
import Navbar from './Component/Navbar'
import Error404 from './Component/Error404'
import SignIn from './Component/SignIn'
import Favorites from './Component/Favorites'
import Footer from './Component/Footer'
import ComingSoon from './Component/ComingSoon'
import Movie from './Component/Movie/Movie'
import NewMovie from './Component/Movie/NewMovie'
import WatchList from './Component/Movie/WatchList'
import Login from './login'
function App() {
  return (
    <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movie/:id" element={<Movie />}/>
        <Route path="/watch" element={<WatchList/>}/>
        <Route path="/cartoons" element={<NewMovie/>}/>
        <Route path="/new" element={<ComingSoon/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignIn/>}/>
        <Route path="/*" element={<Error404/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App