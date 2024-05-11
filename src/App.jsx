import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Signin from "./pages/Signin"
import SignUp from "./pages/SignUp"
import About from "./pages/About"

export default function App() {
  return (
    <BrowserRouter> 
    <Routes>
      <Route path="/" element={<Home></Home>}/>
      <Route path="/about" element={<About></About>}/>
      <Route path="/profile" element={<Profile></Profile>}/>
      <Route path="/sign-in" element={<Signin></Signin>}/>
      <Route path="/sign-up" element={<SignUp></SignUp>}/>

    </Routes>
    </BrowserRouter>
  )
}
