import { basicUrl } from './shirtsService'


export const getUser = async (user) => {

   let options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json'}//'Authorization': 'Bearer JWT'
      // credentials: 'include'
   }

   try {
      return await fetch(`${basicUrl}/login`,options)
         .then(res => res.json())
         
   } catch (err) {
      console.log(JSON.stringify(err))
   }
}

export const addUser = async (user) => {
   let options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
   }
   
   try {
      return await fetch(`${basicUrl}/signup`, options)
         .then(res => res.json())
   } catch (err) {
      console.log(err);
   }
}   