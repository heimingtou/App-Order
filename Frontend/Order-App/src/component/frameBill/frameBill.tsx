import { useState } from "react"
import BillItem_admin from "../Bill_of_admin/bill_admin"
import './frameBill.css'
import { BiArrowBack } from "react-icons/bi"
type billIdProp={
    id: number,
    status: boolean
    time: Date,
    total: number,
}
type  frameBillProp={
    item: billIdProp
}
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
export default function FrameBill({item}:frameBillProp){
    const [bill,setBill]= useState<BillProp>()
    const [chose, setChose]=useState(false);
    const Bill=()=>{
        return(
            <div className="Contain-Bill-Popup">
                <div className="Bill_contain" key={bill?.p_bill_id} >
                <h1>Poem Coffee</h1>
                {bill && <BillItem_admin listItem={bill} />}
                <button onClick={()=>setChose(false)}> <BiArrowBack color="black"/> </button>
            </div>
            </div>
            
        )
    }
    const UpdateStatus=async()=>{
    try{
        const token=localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/bill/${item.id}/status`, {
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
            setChosePay(false)
    }catch (error: Error) {
            console.error('Lỗi khi cập nhật:', error.message);
            alert(`Lỗi: ${error.message}`);
        }
   }
    const [chosePay, setChosePay]=useState(false)
   const popup=()=>{
    return(
        <div className="Contain-Popup">
            <div className="Cotain-popup">
            <h2 className="titlePopup">Xác nhận thanh toán</h2>
            <hr/>
            <p>Bạn chắc chắn xác nhận thanh toán hóa đơn {item.id}</p>
            <div className="btn-contain">
                <button className="cancel" onClick={()=>setChosePay(false)} >Hủy</button>
                <button className="accept" onClick={UpdateStatus}>Xác nhận</button>
            </div>
        </div>
        </div>
        
    )
    
   }
    const handleBill=(billID:number)=>{
            if (!billID) {
            alert("Đang tải danh sách ID hoặc không có hóa đơn nào, vui lòng đợi chút!");
            return;
        }
             (async () => {
                try {
                    const token = localStorage.getItem('token');
                    const headers: Record<string, string> = {};
                    if (token) headers['Authorization'] = `Bearer ${token}`;
    
                    const res = await fetch(`http://localhost:3000/bill/${billID}`, { headers });
                    const data = await res.json().catch(() => null);
    
                    if (!res.ok) {
                        console.error('Fetch bills failed', res.status, data);
                        setBill(null);
                    } else {
                        // Thêm phần này để lưu dữ liệu vào state khi thành công
                        setBill(data[0] || []);
                        setChose(true);
                        console.log(data);
                    }
                } catch (err) {
                    console.log('loi khi fetch', err);
                    setBill(null);
                }
            })();
        }
    return(
        <>
        <h2>Bill {item.id}</h2>
        <button onClick={()=>handleBill(item.id)}>Xem</button>
        <button   onClick={()=>setChosePay(true)} >Thanh toan</button>
        {chosePay&&popup()}
        {chose&& Bill()}
        </>
        

    )
}