import { useEffect, useState } from "react"
import "./menu_manage.css"
import { data } from "react-router-dom"

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
                
            </table>
        )
    }
    return(
        <div className="ManageContainer  bg-linear-to-r from-indigo-200 via-red-200 to-yellow-100">
            {frameItem()}
        </div>
    )
}