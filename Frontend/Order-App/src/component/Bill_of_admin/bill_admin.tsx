import { useState } from "react"
import './Bill_admin.css'
type ItemProp={
    id: number,
    pr_id: number,
    pr_name:string,
    pr_price:number,
    sl:number,
    price_total:number
}
type BillProp={
    p_bill_id:number ,
    p_uid: number,
    p_total: number,
    p_time: Date,
    p_status: boolean,
    p_item: ItemProp[],
}
type BillItem_adminProp={
    listItem:BillProp
    setBill: React.Dispatch<React.SetStateAction<BillProp[]>>
}
export default function BillItem_admin({listItem, setBill}:BillItem_adminProp){

   const UpdateStatus=async()=>{
    try{
        const token=localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/bill/${listItem.p_bill_id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ status:true }) // Gtrueửi dữ liệu khớp với @Body() bên backend
            });
        const data= await response.json();
        if(!response.ok){
            throw new Error(data.message || 'Cập nhật trạng thái thất bại');
        }
        console.log('Cập nhật thành công:', data);
            alert('Đổi trạng thái hóa đơn thành công!');
            setBill(prevBills => prevBills.filter(b => b.p_bill_id !== listItem.p_bill_id));
            setChose(false)
    }catch (error: Error) {
            console.error('Lỗi khi cập nhật:', error.message);
            alert(`Lỗi: ${error.message}`);
        }
   }
   const [chose, setChose]=useState(false)
   const popup=()=>{
    return(
        <div className="Contain-Popup">
            <div className="Cotain-popup">
            <h2 className="titlePopup">Xác nhận thanh toán</h2>
            <hr/>
            <p>Bạn chắc chắn xác nhận thanh toán hóa đơn{listItem.p_bill_id}</p>
            <div className="btn-contain">
                <button className="accept" onClick={UpdateStatus}>Xác nhận</button>
                <button className="cancel" onClick={()=>setChose(false)} >Hủy</button>
            </div>
        </div>
        </div>
        
    )
    
   }

    return(
        <>
            <table>
            <thead>
                <tr>
                    <th>Name </th>
                    <th>Price</th>
                    <th>SL</th>
                    <th>total</th>
                </tr>
            </thead>
            <tbody>
                {listItem.p_item.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.pr_name}</td>
                        <td>{item.pr_price}</td>
                        <td>x{item.sl}</td>
                        <td>{item.price_total}</td>
                    </tr> 
                            ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3} style={{textAlign:"left"}}></td>
                    <td>{listItem.p_total}</td>
                </tr>
            </tfoot>        
            </table>
            <button onClick={()=>setChose(true)} >Thanh toan</button>
            {chose&&popup()}
           
        </>
        
    )
}