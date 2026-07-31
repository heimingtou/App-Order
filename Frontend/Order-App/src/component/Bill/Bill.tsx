import "./Bill.css"
import Menu_item from "../menu_item/menu_item";
import Action from "../../page/menu_page"; // Nhập Action từ trang Menu_page (chỉnh lại đường dẫn ../ cho phù hợp)

type BillProp = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

type listBillProp = {
    listBill: BillProp[];
    dispatch: React.Dispatch<Action>; // Nhận dispatch để truyền tiếp vào Menu_item
    total:number
}

export default function Bill({ listBill, dispatch, total }: listBillProp) {
    return (
        <div className="TotalBill_contain">
            <h2>Hóa đơn của bạn</h2>
            <div className="bill-container">
            {/* Sử dụng đúng 1 cặp ngoặc nhọn và dùng từ khóa return trong map */}
            {listBill.map((item) => {
                // Chuyển đổi dữ liệu của BillProp sang định dạng DrinkProp mà Menu_item yêu cầu
                const drinkData = {
                    pr_id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    trang: true
                };

                return (
                    <Menu_item
                        key={item.id} 
                        drink={drinkData} 
                        listBill={listBill} 
                        dispatch={dispatch} 
                        
                    />
                );
            })}
            </div>
            <button className="btn-Call"> gọi món</button>
            <div className="TotalBill">
                 <hr/>
                 <div className="text-total">
                    <h3> Total Bill :</h3>
                 <h3>{total}</h3>
                 </div>
                 
            </div>
           
        </div>
    );
}