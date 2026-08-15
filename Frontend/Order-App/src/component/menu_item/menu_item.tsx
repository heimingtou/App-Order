
import { FaPlus } from "react-icons/fa";
import './menu_item.css'
import { RiSubtractFill } from "react-icons/ri";
import { useEffect, useState } from "react";

type DrinkProp={
    pr_id: number;
    name: string;
    price: number;
    image: string;
    trang: boolean;
}
type BillProp={
    id:number;
    name: string;
    price: number;
    quantity:number;
    image: string;
}
type listBillProp={
    drink:DrinkProp,
    listBill: BillProp[],
    dispatch: React.Dispatch<Action>;
}
type Action=
    |{type: 'Add', payload:BillProp}
    |{type: 'Sub', payload:BillProp}
    |{type: 'Clear', payload:BillProp}
    |{type: 'Handle', payload:BillProp}
    |{type: 'AddToBill', payload:BillProp}

export default function Menu_item({drink,listBill, dispatch}:listBillProp){
    

    const existingItem = listBill.find(item => item.id === drink.pr_id);
    const quantity = existingItem ? existingItem.quantity : 0;
    const [localQty, setLocalQty]= useState(quantity);
    if(quantity!==localQty){
        console.log(quantity)
        setLocalQty(quantity);
    }
//    useEffect(() => {
//         console.log(quantity)
//         setLocalQty(quantity);
//     }, [quantity]);
    const increase=()=>{
     
        const currentBill:BillProp={
        id: drink.pr_id,
        name: drink.name,
        price: drink.price,
        quantity:quantity+1,
        image: drink.image,
    }
        setLocalQty(currentBill.quantity)
        dispatch({type: 'Add', payload:currentBill})
    }
    const decrease=()=>{
          
        const currentBill:BillProp={
        id: drink.pr_id,
        name: drink.name,
        price: drink.price,
        quantity:quantity-1,
        image: drink.image,
        }
        setLocalQty(currentBill.quantity)
        dispatch({type: 'Sub', payload:currentBill})
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);

        const newQty = isNaN(val) ? 0 : val;
       
        const currentBill:BillProp={
        id: drink.pr_id,
        name: drink.name,
        price: drink.price,
        quantity:newQty,
        image: drink.image,
    }
        dispatch({type: 'Handle', payload:currentBill})
    };
    const addProduct=()=>{
  
        const currentBill:BillProp={
        id: drink.pr_id,
        name: drink.name,
        price: drink.price,
        quantity:1,
        image: drink.image,
    }
        setLocalQty(currentBill.quantity)
        dispatch({type: 'AddToBill', payload:currentBill})
    }
      
    // Cắt bỏ dấu '/' ở đầu drink.image để nối chuỗi chính xác vào assets/
// Bỏ bớt chữ 'Image/' trong drink.image nếu database đã lưu sẵn, hoặc dùng trực tiếp tên file
// Ví dụ drink.image là "/Image/lipton.jpg" -> lấy ra phần tên file "lipton.jpg"
const fileName = drink.image.split('/').pop() || ''; 

// Trỏ thẳng từ component ra thư mục assets/Image/ cùng với tên file
const imagesUrl = new URL(`../../assets/Image/${fileName}`, import.meta.url).href;
    return(
        
        <div className="item_contain">
            <div className="image_contain">
                <img src={imagesUrl} alt={drink.name}/>      
            </div>
            <div className="text_content">
                <h2 className="nameDrink">{drink.name}</h2>
                <p><b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(drink.price)}</b></p>
            </div>
           {quantity>0? (<div className="button_contain">
                <button onClick={decrease}> <RiSubtractFill/> </button>
                <input type="number" className="input_number" id="soluong"
                value={localQty} // Dùng state nội bộ kết hợp useEffect để cập nhật tức thì khi bấm + / -
                        onChange={(e) => setLocalQty(e.target.value === '' ? 0 : parseInt(e.target.value))} // Cho phép gõ xóa tự do
                        onBlur={handleChange}></input>
                <button onClick={increase}> <FaPlus/> </button>
            </div>):( <div className="button_contain">
                <button className="add_button" onClick={addProduct}>add product</button>
            </div>)}
           
           
            
        </div>
    );
}