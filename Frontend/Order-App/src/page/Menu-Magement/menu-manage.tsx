import { useEffect, useState } from "react"
import "./menu_manage.css"
import { data } from "react-router-dom"
import { FaPen } from "react-icons/fa6"

type productProp={
    pr_id: number,
    name: string,
    status:boolean,
}
export default function Menu_Manage(){
    const [products, setProducts]= useState<productProp[]>([])
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await fetch('http://localhost:3000/products/menu');
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error('Không tải được menu: ', error);
                setProducts([]);
            }
        };

        fetchMenu();
    }, []); // Bổ sung dependency array để gọi 1 lần khi mount
    const frameItem=()=>{
        return(
            <table>
                <colgroup>
                    <col style={{width: "40%"}} />
                    <col style={{width: "40%"}} />
                    <col style={{width: "20%"}}/>
                </colgroup>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>STATUS</th>
                        <th>FIX</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>(
                       <tr >
                            <td>{item.name}</td>
                            <td>{item.status?"Available":"Sold out"}</td>
                            <td><button><FaPen/></button></td>
                       </tr>
                    ))}
                    
                </tbody>
            </table>
        )
    }
    const InputProduct=()=>{
        return(
            <div className="border rounded-3xl p-7 w-110 mt-8 flex flex-col gap-4">
                <div className="flex flex-col justify-start gap-1.5">
                    <label htmlFor="name" className="text-left">Name</label>
                    <input type="text" id="name" className="border w-full h-11 rounded-[10px] pl-2 text-cyan-950"/>
                </div>
                <div className="flex flex-col justify-start gap-1.5">
                    <label htmlFor="price" className="text-left">Price</label>
                    <input type="text" id="price" className="border h-11 rounded-[10px] pl-2 text-cyan-950" />
                </div>
                <div className="flex flex-col justify-start gap-1.5">
                    <label htmlFor="description" className="text-left">Description</label>
                    <input type="text" id="description" className="border h-11 rounded-[10px] pl-2 text-cyan-950" />
                </div>
                <div className="flex flex-col justify-start gap-1.5">
                    <label htmlFor="quantity" className="text-left">Quantity</label>
                <input type="text" id="quantity" className="border h-11 rounded-[10px] pl-2 text-cyan-950" />
                </div>
               
               
               
            </div>
        )
    }
    return(
        <div className="flex flex-row">
            <div className="border rounded-md w-132 pt-5 m-8">
            <h1>List product</h1>
            {frameItem()}
            </div>
            <div>
                {InputProduct()}
            </div>
        </div>
        
    )
}