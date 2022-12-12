import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Navbar/Home';
import About from './Navbar/About'
import Signup from './Navbar/Signup'
import Login from './Navbar/Login'
import Single from './Single';
import Navbar from './Navbar/Navbar';
function App() {
  const [user, setUser] = useState(null)
  const [dogHouses, setDogHouses] = useState([])
  
  
  const [id, setId] = useState(0)

  useEffect(() => {
    fetch('https://dog-house-production.up.railway.app/me')
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user))
        }
      })
  }, [])

  useEffect(() => {
    fetch('https://dog-house-production.up.railway.app/dog_houses')
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        setDogHouses(data)
      })
  }, [])
  function click(id) {
    //return(id)
    // fetch(`/dog_houses/${id}`)
    //   .then(response => response.json()
    //   )
    //   .then((data) => {
    //     //console.log(data)
    //     setHouse(data)
    //   })
    setId(id)
    
  }
  console.log(id)
  
  //console.log(house)
  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route exact path='/' element={<Home dogHouses={dogHouses} click={click} user={user} />} />      
        <Route path={`/dog_houses/${id}`} element={<Single  user={user} id={id}/>} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login onLogin={setUser} />} />
        <Route path='/signup' element={<Signup onLogin={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

