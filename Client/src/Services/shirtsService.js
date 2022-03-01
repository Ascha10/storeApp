export let basicUrl = 'http://localhost:9000/api';

export const getShirts = async () => {
   try {
      return await fetch(`${basicUrl}/Shirts`)
         .then(res => res.json())

   } catch (error) {
      console.log("Error", error)
   }
}

export const getShirtById = async (id) => {
   try {
      return await fetch(`${basicUrl}/shirts/${id}`)
         .then(res => res.json())
   } catch (err) {
      console.log(err);
   }
}

export const addShirt = async (shirt) => {
   let options = {
      method: "POST",
      body: JSON.stringify(shirt),
      headers: { 'Content-Type': 'application/json' }
   }
   try {
      return await fetch(`${basicUrl}/shirts`, options)
         .then(res => res.json())
   } catch (err) {
      console.log(err);
   }
}

export const updateShirt = async (shirt, id) => {
   let options = {
      method: "PUT",
      body: JSON.stringify(shirt),
      headers: { 'Content-Type': 'application/json' }
   }
   try {
      return await fetch(`${basicUrl}/shirts/${id}`, options)
         .then(res => res.json())
   } catch (err) {
      console.log(err);
   }
}

export const deletShirt = async (id) => {
   let options = {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
   }
   try {
      return await fetch(`${basicUrl}/shirts/${id}`, options)
         .then(res => res.json())
   } catch (err) {
      console.log(err);
   }
}
