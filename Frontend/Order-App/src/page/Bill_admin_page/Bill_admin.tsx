import { useEffect, useState } from "react";
import './Bill_admin.css'
import FrameBill from "../../component/frameBill/frameBill";
import { io } from "socket.io-client";
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
   const [chosePay,setChosePay]=useState<boolean>(true)

    const fetchBills = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers: Record<string, string> = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch('http://localhost:3000/bill/id', { headers });
            const data = await res.json().catch(() => null);

            if (!res.ok) {
                console.error('Fetch bills failed', res.status, data);
                setID([]);
                return;
            }

            setID(data || []);
            console.log('Danh sách hóa đơn mới:', data);
        } catch (err) {
            console.log('loi khi fetch', err);
            setID([]);
        }
    };

    useEffect(() => {
        const socket = io('http://localhost:3000');

        fetchBills();

        const handleNewBill = () => {
            console.log('Nhận được đơn hàng mới realtime, reload danh sách...');
            fetchBills();
        };

        socket.on('new_bill', handleNewBill);

        return () => {
            socket.off('new_bill', handleNewBill);
            socket.disconnect();
        };
    }, []);
    

    
    
    


    const BillID=()=>{
        return(
            
            <div className="BillID">
                {id.filter(id=>!id.status).map((item)=>(
                    <div className="Frame" key={item.id}>
                    <FrameBill item={item} setBillID={setID}/>
                </div>
                ))}
               
            </div>
        )
        
    }
    const BillPay=()=>{
        return(
              <div className="BillID">
                {id.filter(id=>id.status).map((item)=>(
                    <div className="Frame" key={item.id}>
                    <FrameBill item={item} setBillID={setID}/>
                </div>
                ))}
               
            </div>
        )
    }
    return (
        <div className="ContainBill flex flex-row justify-around flex-auto bg-linear-to-r from-indigo-200 via-red-200 to-yellow-100">
            <div className="Nav flex-2  bg-emerald-200 sticky! top-0 h-screen flex flex-col">
                <nav className="flex flex-col justify-start gap-1 mt-14 w-full">
                    <button className="hover:bg-blue-50 w-full h-fit text-[18px] text-blue-950 font-mono p-1.5 rounded-md  ">LIST BILL</button>
                    <button className="hover:bg-blue-50 w-full h-fit text-[18px] text-blue-950 font-mono p-1.5 ">MENU MANAGEMENT</button>
                </nav>
            </div>
            <div className="flex-8">
                <div className="btn-state">
                    <button  style={{
                        backgroundColor:!chosePay?'#eff6ff':'#ccddf5',
                        color:'#1d4ed8'
                    }}  onClick={()=>setChosePay(true)}>Đã thanh toán
                    </button>
                    <button style={{
                        backgroundColor:chosePay?'#eff6ff':'#ccddf5',
                        color:'#1d4ed8'
                    }}  onClick={()=>setChosePay(false)}>Chưa thanh toán</button>
                </div>
                {!chosePay? BillID():BillPay()}
            </div>
           
        </div>
    );
}