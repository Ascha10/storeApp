import { useContext,useState } from 'react';
import { authContext } from '../../../Context/AuthProvider/AuthProvider';
import { getUser } from '../../../Services/usersService';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const {auth,setAuth} = useContext(authContext);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate()

  let submitForm = async (e) => {
    e.preventDefault();
    setEmail(email);
    setPassword(password);

    await getUser({email,password})
    .then((data) => {
      console.log(data);
      if(data.accessToken){
        // setAuth(data.user.id,data.user.roles, data.user.accessToken);
        // setAuth({email:data.email,role:data.role,accessToken :data.accessToken});
        setAuth({accessToken : data.accessToken});
        console.log(auth);
        navigate('/');
      }

    }).catch((err) => {
      console.log(err);
    })

    console.log(email);
    console.log(password);
  }

  let emailHendler = (e) => {
    email = e.target.value;
  }
  let passwordHendler = (e) => {
    password = e.target.value;
  }

  return (
    <section>
      <h1>Login</h1>

      <form action="" onSubmit={(e) => { submitForm(e) }}>

        <label>Email</label>
        <input type="text" onChange={emailHendler} required />
        <div className='emailError'></div>

        <label>Password</label>
        <input type="password" onChange={passwordHendler} required />
        <div className='passwordError'></div>

        <button>Submit</button>
      </form>

    </section>
  )
}
