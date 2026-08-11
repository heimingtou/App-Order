import { useEffect, useState } from "react";
import './Bill_admin.css'
import BillItem_admin from "../../component/Bill_of_admin/bill_admin";
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
export default function Bill_admin(){
    const [bill, setBill] = useState<BillProp[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem('token');
                const headers: Record<string, string> = {};
                if (token) headers['Authorization'] = `Bearer ${token}`;

                const res = await fetch('http://localhost:3000/bill', { headers });
                const data = await res.json().catch(() => null);

                if (!res.ok) {
                    console.error('Fetch bills failed', res.status, data);
                    setBill([]);
                } else {
                    // Thêm phần này để lưu dữ liệu vào state khi thành công
                    setBill(data || []);
                    console.log(data);
                }
            } catch (err) {
                console.log('loi khi fetch', err);
                setBill([]);
            }
        })(); // <-- Thêm cặp ngoặc tròn này để thực thi hàm bất đồng bộ ngay lập tức
    }, []); // <-- Thêm mảng dependency rỗng để chỉ gọi 1 lần khi component mount
    const Bill=()=>{
        return(
          bill.filter((item)=>!item.p_status).map((item)=>(
            <div className="Bill_contain" key={item.p_bill_id} >
                <h1>Poem Coffee</h1>
                 <BillItem_admin  listItem={item} setBill={setBill} ></BillItem_admin>
            </div>
           
          ))
        )
    }
    return (
        <div className="ContainMenu">
            <div className="Bill_admin">
                {Bill()}
            </div>
        </div>
    );
}