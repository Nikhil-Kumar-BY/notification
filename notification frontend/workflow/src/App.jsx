import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Homepage from "./Components/Homepage";
import Login from './Components/login';
import Navbar from './Components/Navbar';


function App() {
  return (
    <BrowserRouter>
   {/* <Navbar/> */}
    <Routes>
       <Route path="/" element={<Homepage/>}/>
       <Route path="/signin" element={ <Login/>}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
