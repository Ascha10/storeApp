import { Link } from 'react-router-dom';
import useLogout from '../../Logout/useLogout';



export default function SideBar() {
  const logout = useLogout();

  return(
      <nav className='sideBar'>
          <Link to="/">Home</Link>
          <Link to="/Shirts">Shirts</Link>
          <Link to="/SignUp">SignUp</Link>
          <Link to="/Login">Login</Link>
          <button onClick={() => logout()}>Logout</button>
      </nav>
      
  )
}
