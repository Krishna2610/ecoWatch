import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Signin from "./pages/Signin"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import CreateListing from "./pages/CreateListing"
import UpdateListing from "./pages/UpdateListing"
import Listing from "./pages/Listing"
import Search from "./pages/Search"


export default function App() {

  
  return (

    <BrowserRouter> 
    <Header/>
    <Routes >
      
      <Route path="/" element={<Home></Home>}/>
      <Route path="/about" element={<About></About>}/>
      <Route path="/listing/:listingId" element={<Listing></Listing>}/>
      <Route path="/search" element={<Search></Search>}/>

      <Route element={<PrivateRoute></PrivateRoute>}>
      <Route path="/profile" element={<Profile></Profile>}/>
      <Route path="/create-listing" element={<CreateListing></CreateListing>}/>
      <Route path="/update-listing/:listingId" element={<UpdateListing></UpdateListing>}/>

      </Route>
      <Route path="/sign-in" element={<Signin></Signin>}/>
      <Route path="/sign-up" element={<SignUp></SignUp>}/>

    </Routes>
    </BrowserRouter>
  )
}
