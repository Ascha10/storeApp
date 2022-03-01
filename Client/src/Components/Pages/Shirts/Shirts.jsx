import { ShirtsProvider } from '../../../Context/ShirtsProvider/ShirtsProvider';
import ShirtsCards from './ShirtsCards';

export default function Shirts() {

  return(
     <ShirtsProvider>
          <ShirtsCards/>
     </ShirtsProvider>
  )    
}
