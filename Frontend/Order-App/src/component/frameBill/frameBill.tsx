import { useState } from "react"
import BillItem_admin from "../Bill_of_admin/bill_admin"
import './frameBill.css'
import { BiArrowBack } from "react-icons/bi"
import { CiCircleAlert } from "react-icons/ci"
import { BsEyeFill } from "react-icons/bs"
import { MdPayment } from "react-icons/md"
import { GiCoffeeCup } from "react-icons/gi"
type billIdProp={
    id: string,
    status: boolean
    time: Date | string,
    total: number | string,
}
type  frameBillProp={
    item: billIdProp
    setBillID: React.Dispatch<React.SetStateAction<billIdProp[]>>;
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
    p_bill_id:string ,
    p_uid: number,
    p_total: number,
    p_time: Date,
    p_status: boolean,
    p_item: ItemProp[],
}
export default function FrameBill({item, setBillID}:frameBillProp){
    const [bill,setBill]= useState<BillProp>()
    const [chose, setChose]=useState(false);
    const Bill=()=>{
        return(
            <div className="Contain-Bill-Popup">
                <div className="Bill_contain" key={bill?.p_bill_id} >
                <h1 className="flex flex-col justify-center items-center gap-3.75 mt-1! mb-3! "> <GiCoffeeCup size={70}/> Poem Coffee</h1>
                <div className="ScrollBill">
                     {bill && <BillItem_admin listItem={bill} />}
                </div>
               
                <button className="bg-amber-400 w-fit px-4 py-1.5 mt-2 rounded-md hover:bg-amber-300" onClick={()=>setChose(false)}> <BiArrowBack color="black" size="25px"/> </button>
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
           setBillID(prev => 
        prev.map(Bitem => {
            // So sánh chính xác item.id với billId truyền vào
            if (Bitem.id === item.id) {
                // Trả về object mới đã cập nhật status
                return { ...Bitem, status: true }; 
            }
            // Các phần tử khác giữ nguyên
            return Bitem; 
        })
    );
        }catch (error) {
            const message = error instanceof Error ? error.message : 'Lỗi không xác định';
            console.error('Lỗi khi cập nhật:', message);
            alert(`Lỗi: ${message}`);
        }
   }
    const [chosePay, setChosePay]=useState(false)
   const popup=()=>{
    return(
        <div className="Contain-Popup">
            <div className="Cotain-popup">
            <h2 className="titlePopup">Xác nhận thanh toán</h2>
            <hr/>
            <p>Bạn chắc chắn xác nhận thanh toán hóa đơn {item.id? item.id.substring(0,8):''}</p>
            <div className="btn-contain">
                <button className="cancel" onClick={()=>setChosePay(false)} >Hủy</button>
                <button className="accept" onClick={UpdateStatus}>Xác nhận</button>
            </div>
        </div>
        </div>
        
    )
    
   }
    const handleBill=(billID:string)=>{
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
                        
                    } else {
                        // Thêm phần này để lưu dữ liệu vào state khi thành công
                        setBill(data[0] || []);
                        setChose(true);
                        console.log(data);
                    }
                } catch (err) {
                    console.log('loi khi fetch', err);
                   
                }
            })();
        }
    const myOrder=()=>{
        const totalValue = Number(item.total ?? 0);
        return(
            <div className="myOrder-Contain">
                <div className="TopContain">
                    <div className="idContain">
                        <p style={{
                            fontSize:'15px',
                            color:'#84888a'
                            }}>Mã hóa đơn
                        </p>
                        <p style={{
                            fontSize:'23px',
                            color:'#89d4dc',
                            marginBottom:'15px'
                            }}>#{item.id? item.id.substring(0,8):''}
                        </p>
                   
                    </div>
                    <div className="statusContain">
                        <p style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 0,
                        }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '2px',
                                color: item.status ? 'green' : '#f65a58'
                            }} className="text-base md:text-xl lg:text-xl" >
                                <CiCircleAlert />
                                {item.status ? 'Đã thanh toán' : 'Chưa thanh toán'}
                            </span>
                        </p>
                    </div>
                </div>
                
                
                <div className="contentContain">
                   
                    <p className="displayContent"><span>Total:</span><strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalValue)}</strong> </p>
                    <p className="displayContent"><span>Date: </span>{new Date(item.time).toLocaleString()}</p>
                </div>
                
                <div className="btn-bill-contain">
                    <button className="bg-blue-300 text-blue-900 hover:bg-blue-200" onClick={()=>handleBill(item.id)}> <BsEyeFill size={20}/> Xem chi tiết</button>
                    {!item.status&&<button className="bg-blue-950 text-amber-50 hover:bg-blue-900"  onClick={()=>setChosePay(true)} > <MdPayment size={20}/>  Thanh toan</button>}
                </div>
                
            </div>
        )
        
    }
    return(
        <>
        {myOrder()}
        {chosePay&&popup()}
        {chose&& Bill()}
        </>
        

    )
}