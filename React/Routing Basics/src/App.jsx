import { useEffect, useState } from 'react'
import './App.css'
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FriendDetails from './Components/FriendDetails';
import NotFound from './Components/NotFound';

function App() {
  return (
    <>
    <Router>
        <Routes> 
            <Route exact path="/" element = {<Home></Home>}> </Route> 
            <Route path="/home" element = {<Home></Home>}> </Route>
            <Route path="/friend/:id" element = {<FriendDetails></FriendDetails>}> </Route>
            <Route path="*" element = {<NotFound></NotFound>}> </Route>
        </Routes> 
    </Router>
    </>
  )
}

export default App
