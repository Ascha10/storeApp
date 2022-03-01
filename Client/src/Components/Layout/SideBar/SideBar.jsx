import { Link } from 'react-router-dom';


export default function SideBar() {

  return(
      <nav className='sideBar'>
          <Link to="/">Home</Link>
          <Link to="/Shirts">Shirts</Link>
          <Link to="/SignUp">SignUp</Link>
          <Link to="/Login">Login</Link>
      </nav>
      
  )
}
