import React ,{ useState } from 'react'
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Users from './Users'
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateUsers from './CreateUsers'
import UpdateUser from './UpdateUser'
import ReadUser from './ReadUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Users/>}></Route> 
      <Route path='/create' element={<CreateUsers/>}></Route>
      <Route path='/update/:id' element={<UpdateUser/>}></Route>//for update user we use id
      <Route path='/read/:id' element={<ReadUser/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
