import "./Bill.css";
import type { Dispatch } from 'react';
import type { Action, BillProp } from "../../page/Menu_page/menu_page";
import { RiDeleteBin5Fill } from "react-icons/ri";


type listBillProp = {
    listBill: BillProp[];
    dispatch: Dispatch<Action>;
    total: number;
    setChose: (status:boolean)=>void
};

export default function Bill({ listBill, dispatch, total, setChose }: listBillProp) {
    const handleCheckout = async () => {
        if (listBill.length === 0) {
            alert("Cart is Null");
            return;
        }
        const userid= localStorage.getItem('UID');
        const billData = {
            uid: userid,
            orderDetail: listBill.map((item) => ({
                pr_id: item.id,
                sl: item.quantity,
            })),
        };

        try {
            const response = await fetch('http://localhost:3000/bill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billData),
            });
            const result = await response.json();
            if (response.ok) {
                alert("Dat hang thanh cong");
                console.log("hoa don da tao: ", result);
                dispatch({
                    type: 'Clear',
                    payload: { id: 0, name: '', price: 0, quantity: 0, image: '' },
                });
                setChose(true);
            } else {
                alert(`Lỗi: ${result.message || "Không thể tạo hóa đơn"}`);
            }
        } catch (error) {
            console.error("Lỗi kết nối tới server:", error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Lỗi kết nối tới server!");
            }
        }
    };

    return (
        <div className="TotalBill_contain">
            <h2 className="!text-2xl !text-left !mx-5 ">Hóa đơn của bạn</h2>
            <hr/>
           {listBill.length!==0?
           (
            <div>
                <div className="bill-container">
                <table className="BillTable">
                    <colgroup>
                    <col style={{width:"30%"}} />
                    <col style={{width:"25%"}}/>
                    <col style={{width:"10%"}}/>
                    <col style={{width:"25%"}}/>
                     <col style={{width:"10%"}}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th> </th>
                            </tr>
                    </thead>
                    <tbody>
                    
                        {
                        listBill.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.name} </td>
                                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                                <td>{item.quantity}</td>
                                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price*item.quantity)}</td>
                                <td><button onClick={()=>{dispatch({
                    type: 'remove',
                    payload: item.id,
                });}} className="btn-itemDlt"> <RiDeleteBin5Fill className="icon" size={25} color="red"/> </button></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                <div className="Total-Text">
                <p><span><b>Total:</b></span><span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span></p>
            </div>
            </div>
            <div className="btnBill flex gap-3">
                <button className="btn-Delete text-amber-50" onClick={()=>{dispatch({
                    type: 'Clear',
                    payload: { id: 0, name: '', price: 0, quantity: 0, image: '' },
                });}} >Hủy món</button>
                <button className="btn-Call text-amber-50" onClick={handleCheckout}>Gọi món</button>
            </div>
            
            </div>
           ):<p>Giỏ hàng hiện đang trống. Hãy thêm sản phẩm để bắt đầu mua sắm </p>
           }         
        </div>
    );
}