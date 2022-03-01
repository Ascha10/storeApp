import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Header from '../Components/Layout/Header/Header';
import SideBar from '../Components/Layout/SideBar/SideBar';
import Home from '../Components/Pages/Home/Home';
import Shirts from '../Components/Pages/Shirts/Shirts';
import Footer from '../Components/Layout/Footer/Footer';
import SignUp from '../Components/Pages/SignUp/SignUp';
import Login from '../Components/Pages/Login/Login';
import {AuthProvider} from '../Context/AuthProvider/AuthProvider'



export default function RouterApp() {
  return(
      <AuthProvider>
        <Router>
            <Header/>
            <SideBar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/Shirts" element={<Shirts/>}/>
                <Route exact path="/SignUp" element={<SignUp/>}/>
                <Route exact path="/Login" element={<Login/>}/>
                {/* <Route exact path="*" element={<NotFound/>}/> */}
            </Routes>
            <Footer/>
        </Router>
      </AuthProvider>
  )
}
