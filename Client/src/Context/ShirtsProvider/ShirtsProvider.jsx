import { createContext, useEffect, useState } from 'react';
import { getShirts } from '../../Services/shirtsService';

export const shirtContext = createContext();

export function ShirtsProvider({children}) {
    const [shirtsApi,setShirtsApi] = useState([]);

	useEffect(() => {
		getShirts()
			.then((data) => {
				setShirtsApi(data)
			})
			.catch((err) => {
				console.log(err);
			})
	},[])

  return(
    <shirtContext.Provider value={{shirtsApi,setShirtsApi}}>
	  {children}
    </shirtContext.Provider> 
 
  )
}
