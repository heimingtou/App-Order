import { useEffect, useState, useCallback } from "react" // <-- Thêm useCallback
import "./menu_manage.css"
import { BsPencilFill } from "react-icons/bs"

type productProp={
    id: number,
    name: string,
    status:boolean,
}
type InputProp={
    id: number,
    name:string,
    price: number,
    description:string,
    quantity: number
}
export default function Menu_Manage(){
    const [products, setProducts]= useState<productProp[]>([])
    const [IfProduct, setIf]=useState<InputProp>()

    // [SỬA 1]: Đưa fetchMenu ra ngoài, dùng useCallback
    const fetchMenu = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:3000/products/menu');
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Không tải được menu: ', error);
            setProducts([]);
        }
    }, []);

    useEffect(() => {
        fetchMenu();
    }, [fetchMenu]);

    async function UpdateInfo(id:number){
        if (!IfProduct) return;
        try{
            const res=await fetch(`http://localhost:3000/products/${id}`,{
                method: 'PATCH',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    name:IfProduct.name,
                    price: Number(IfProduct.price), // Ép kiểu số
                    description:IfProduct.description,
                    quantity: Number(IfProduct.quantity) // Ép kiểu số
                }),
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Cập nhật thất bại (${res.status}): ${errorText}`);
            }
            alert('Cập nhật thành công!');
            
            // [SỬA 2]: Gọi lại fetchMenu để load lại database
            await fetchMenu();
            
            return await res.json();
        }catch(error){
            console.error('Không cập nhật được:', error);
            throw error;
        }
    }

    async function GetInput(id:number):Promise<InputProp | undefined>{
        try{
            const res= await fetch(`http://localhost:3000/products/${id}`);
            if(!res.ok){ 
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data:InputProp= await res.json();
            setIf(data);
        }catch (error) {
            console.error('Không tải được chi tiết: ', error);
        }
    }

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>(
                       <tr key={item.id} >
                            {/* [SỬA 3]: Style td bằng Tailwind */}
                            <td className="px-4 py-3 text-slate-800 font-medium">{item.name}</td>
                            <td className="px-4 py-3">
                                <span className={`border rounded-2xl px-3 py-1 text-xs font-semibold ${item.status ? "bg-green-200 text-green-800":"bg-red-500 text-white"}`}>
                                    {item.status ? "Available" : "Sold out"}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <button onClick={()=>GetInput(item.id)} className="w-full h-full flex justify-center items-center text-slate-600 hover:text-indigo-600"> 
                                    <BsPencilFill/> 
                                </button>
                            </td>
                       </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    const InputProduct=()=>{
        return(
            <div className="border rounded-3xl p-7 w-fit mt-8 flex flex-col gap-4 ">
                <div className="title">
                    <h1 className="text-xl font-bold">Product Details</h1>
                </div>
                <div className="text-[20px] flex flex-col gap-4">
                    <div className="flex flex-col justify-start gap-1.5">
                        <label htmlFor="name" className="text-left text-sm font-medium">Name</label>
                        <input type="text" id="name" value={IfProduct?.name || ''} className="border w-full h-11 rounded-[10px] pl-2 text-cyan-950 text-base" onChange={handleInputChange}/>
                    </div>
                    <div className="flex flex-col justify-start gap-1.5">
                        <label htmlFor="price" className="text-left text-sm font-medium">Price</label>
                        <input type="number" id="price" value={IfProduct?.price ?? ''} className="border h-11 rounded-[10px] pl-2 text-cyan-950 text-base" onChange={handleInputChange}/>
                    </div>
                    <div className="flex flex-col justify-start gap-1.5">
                        <label htmlFor="description" className="text-left text-sm font-medium" >Description</label>
                        <textarea 
                            id="description" 
                            rows={3}
                            className="border rounded-[10px] p-2 text-cyan-950 text-base whitespace-normal break-words resize-y" 
                            value={IfProduct?.description || ''} 
                            onChange={handleInputChange}/>
                    </div>
                    <div className="flex flex-col justify-start gap-1.5">
                        <label htmlFor="quantity" className="text-left text-sm font-medium">Quantity</label>
                        <input type="number" id="quantity" value={IfProduct?.quantity ?? ''} className="border h-11 rounded-[10px] pl-2 text-cyan-950 text-base" onChange={handleInputChange}/>
                    </div>   
                </div>
                <div>
                    <button className="w-20 h-12 bg-green-700 hover:bg-green-800 rounded-2xl text-amber-50 font-medium" onClick={()=>IfProduct?.id && UpdateInfo(IfProduct.id)}>Apply</button>
                </div>
            </div>
        )
    }

    // [SỬA 4]: Ép kiểu số an toàn khi user gõ vào input số
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const isNumberField = id === 'price' || id === 'quantity' || id === 'id';
        
        setIf((prev) => prev ? {
            ...prev,
            [id]: isNumberField ? Number(value) : value,
        } : undefined);
    };

    return(
        <div className="flex flex-row gap-6 p-4">
            <div className="border rounded-md w-md pt-5 px-4 m-8 ">
                <h1 className="text-lg font-bold mb-4">List product</h1>
                {frameItem()}
            </div>
            <div>
                {InputProduct()}
            </div>
        </div>
    )
}