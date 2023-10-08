import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import {Button, Stack} from 'react-bootstrap'
import { formatCurrency } from "../utilities/formatCurrency"

type cartItemProps = {
    id: number
    quantity: number
}


export function CartItem ({id, quantity}: cartItemProps){
    const {removeFromQuantity} = useShoppingCart()

    const item = storeItems.find(i => i.id === id )
    let price = item?.price as number
    let idd = item?.id as number
    if(item === null){
        return null
    }
  
        return(
            <Stack direction="horizontal" gap ={3} className="d-flex align-items-center">
                <img src={item?.imgUrl} style={{ width: "125px", height: "75px", objectFit: "cover" }} />
                <div className="me-auto ">
                    <div>
                        {item?.name}
                       {quantity>1 && (<span className="text-muted" style={{fontSize: ".65rem"}}> x{quantity}</span>)} 
                    </div>
                    <div className="text-muted" style={{ fontSize: ".75rem"}}>
                        {formatCurrency(price)}
                    </div>
                    <div className="d-flex g-3 me-auto">
                    {/* <div >
                        {formatCurrency(price * quantity)}
                    </div> */}
                    <Button variant="outline-danger" className="m-auto" size="sm" onClick={()=>removeFromQuantity(idd)}>x</Button>
                    </div>
                   
                </div>
            </Stack>
        )
    
   
}