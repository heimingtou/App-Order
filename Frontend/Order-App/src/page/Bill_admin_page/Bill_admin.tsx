import { useEffect, useState } from "react";
import './Bill_admin.css'
import FrameBill from "../../component/frameBill/frameBill";
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
type billIdProp={
    id: number,
    status: boolean
    time: Date,
    total: number,
}
export default function Bill_admin(){
    const [id, setID] = useState<billIdProp[]>([]);
    const [bill, setBill] = useState<BillProp>();
    const [chose, setChose]=useState(false);

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem('token');
                const headers: Record<string, string> = {};
                if (token) headers['Authorization'] = `Bearer ${token}`;

                const res = await fetch('http://localhost:3000/bill/id', { headers });
                const data = await res.json().catch(() => null);

                if (!res.ok) {
                    console.error('Fetch bills failed', res.status, data);
                    setID([]);
                } else {
                    // Thêm phần này để lưu dữ liệu vào state khi thành công
                    setID(data || []);
                    
                    console.log(data);
                }
            } catch (err) {
                console.log('loi khi fetch', err);
                setID([]);
            }
        })(); // <-- Thêm cặp ngoặc tròn này để thực thi hàm bất đồng bộ ngay lập tức
    }, []); // <-- Thêm mảng dependency rỗng để chỉ gọi 1 lần khi component mount


    
    
    


    const BillID=()=>{
        return(
            
            <div className="BillID">
                {id.filter(id=>!id.status).map((item)=>(
                    <div className="Frame" key={item.id}>
                    <FrameBill item={item}/>
                </div>
                ))}
            </div>
        )
        
    }
    return (
        <div className="ContainBill">
            { BillID()}
        </div>
    );
}