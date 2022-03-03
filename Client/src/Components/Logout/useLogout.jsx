import {authContext} from '../../Context/AuthProvider/AuthProvider'
import { useContext } from "react";
import { basicUrl } from '../../Services/shirtsService'
import { useNavigate } from 'react-router-dom';


const useLogout = () => {
    const {setAuth} = useContext(authContext); 
    const navigate = useNavigate()

    const logout = async () => {
        setAuth({});
        try {
            await fetch(`${basicUrl}/logout`);
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return logout;
}

export default useLogout