import {useContext} from 'react';
import { shirtContext } from '../../../Context/ShirtsProvider/ShirtsProvider';
import ShirtCard from './ShirtCard';

export default function ShoeCards() {
    const {shirtsApi} = useContext(shirtContext);
    
  return(
       <section className='main'>
            {shirtsApi.map((shirtItem) => 
               <ShirtCard shirtInfo={shirtItem} key={shirtItem._id}/>
            )} 
       </section>
  )
}


