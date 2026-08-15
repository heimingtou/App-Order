
import Bill from "../../component/Bill/Bill";
import Menu_item from "../../component/menu_item/menu_item";
import './menu_page.css'
import { useEffect, useReducer, useState } from "react";
import { CgMenuBoxed } from "react-icons/cg";

type DrinkProp = {
    pr_id: number;
    name: string;
    price: number;
    image: string;
    trang: boolean;
};
type CategoryProp = {
    id_loai: number;
    ten_loai: string;
    danh_sach_san_pham: DrinkProp[];
};
export type BillProp = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
};
export type Action =
    | { type: 'Add'; payload: BillProp }
    | { type: 'Sub'; payload: BillProp }
    | { type: 'Clear'; payload: BillProp }
    | { type: 'Handle'; payload: BillProp }
    | { type: 'AddToBill'; payload: BillProp };
export default function Menu_page(){
    const[text, setText]= useState('');
    const [menu, setMenu]= useState<CategoryProp[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const[chose,setChose]=useState(true);
    function BillReducer(state:BillProp[], action:Action){
        switch(action.type){
            case 'Add':{
                const existing=state.findIndex(item=>item.id===action.payload.id);
                if(existing>=0){
                    return state.map((item)=>item.id===action.payload.id ?{...item,quantity:item.quantity+1}:item)
                    }
                else{
                    return(
                        [...state,action.payload]
                        )
                    }
                }
                case 'Sub':{
                     const existing=state.findIndex(item=>item.id===action.payload.id);
                    if(existing>=0){
                        const currentItem= state[existing];
                        if(currentItem.quantity>1)
                        {return state.map((item)=>item.id===action.payload.id?{...item,quantity:item.quantity-1}:item)}
                        else{
                            return state.filter(item =>item.id!= action.payload.id);
                        }
                    }
                    return state
                }
                case 'Handle':{
                     const existing=state.findIndex(item=>item.id===action.payload.id);
                    if(existing>=0){
                        // const currentItem= state[existing];
                        if(action.payload.quantity>0)
                        {return state.map((item)=>item.id===action.payload.id?{...item,quantity:action.payload.quantity}:item)}
                        else{
                            return state.filter(item =>item.id!= action.payload.id);
                        }
                    }
                    return state
                }
                case 'AddToBill':{
                    return(
                            [...state,action.payload]
                        )
                }
                case 'Clear':
                    return [];
                default: return state
            }
        }
        const [LBill, dispatch]= useReducer(BillReducer, []);
        useEffect(()=>{
            (async ()=>{
                try{
                    const token = localStorage.getItem('token');
                    const headers: Record<string, string> = {};
                    if (token) headers['Authorization'] = `Bearer ${token}`;
                    const res = await fetch('http://localhost:3000/products', { headers });
                    const data = await res.json().catch(()=>null);
                    if (!res.ok) {
                        console.error('Fetch products failed', res.status, data);
                        setMenu([]);
                        setLoading(false);
                        return;
                    }
                    if (!Array.isArray(data)) {
                        console.error('Products response is not an array', data);
                        setMenu([]);
                    } else {
                        setMenu(data);
                        console.log('hoan tat');
                    }
                    setLoading(false);
                }catch(err){
                    console.error("Loi khi fetch: ",err);
                    setMenu([]);
                    setLoading(false);
                }
            })()
        },[])
        if (loading) {
        return <div className="loading">Đang tải danh sách thực đơn...</div>;
        }
    const MenuDrink=()=>{
        console.log(LBill)
        return(
            menu.map((categories)=>{
                const filteredProducts = categories.danh_sach_san_pham.filter((product) =>
                product.name.toLowerCase().includes(text.toLowerCase())
            );
            if (filteredProducts.length === 0) {
                return null;
            }
            return(
                <div id={categories.ten_loai} key={categories.id_loai} className="catagories_contain">
                    
                    <h2>{categories.ten_loai}</h2>
                    <div className="menuContain">
                        {
                            filteredProducts.map((product)=>(
                                <Menu_item key={product.pr_id} drink={product} listBill={LBill} dispatch={dispatch} ></Menu_item>
                            ))
                        }
                    </div>
                </div>
            )
                
            })
        )
    }
    const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    }
    const totalBill=LBill.reduce((total,item)=> total+(item.price*item.quantity),0);
    return(
        <div className="ContainMenu">
            <div className="BlurBackground">
                <nav className="nav-contain">
                <button className="btn-nav" onClick={()=>goTo("Cà phê")}>Cà Phê</button>
                <button className="btn-nav"  onClick={()=>goTo("Trà")}>Trà</button>
                <button className="btn-nav"  onClick={()=>goTo("Sinh tố & Nước ép")}>Sinh tố</button>
                <button className="btn-nav"  onClick={()=>goTo("Đồ ăn vặt")}>Ăn vặt</button>
                </nav>

                <div className="Search-Contain">
                    <input type="text" placeholder="Tìm Kiếm" onChange={(e)=>{setText(e.target.value)}}></input>
                </div>

                <button className="btn-shop" onClick={()=>setChose(!chose)}> {chose ?<p className="btn-shop-text"><span>Total Bill:</span> <span>{totalBill}</span></p> : <CgMenuBoxed size={30} />}</button>
                {chose? MenuDrink(): <Bill listBill={LBill} dispatch={dispatch} total={totalBill} setChose={setChose}></Bill>}
            </div>
        </div>
    )
}