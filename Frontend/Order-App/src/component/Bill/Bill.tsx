import "./Bill.css";
import type { Dispatch } from 'react';
import Menu_item from "../menu_item/menu_item";
import type { Action, BillProp } from "../../page/Menu_page/menu_page";

type listBillProp = {
    listBill: BillProp[];
    dispatch: Dispatch<Action>;
    total: number;
};

export default function Bill({ listBill, dispatch, total }: listBillProp) {
    const handleCheckout = async () => {
        if (listBill.length === 0) {
            alert("Cart is Null");
            return;
        }

        const billData = {
            uid: 1,
            orderDetail: listBill.map((item) => ({
                pr_id: item.id,
                sl: item.quantity,
            })),
        };

        try {
            const response = await fetch('http://localhost:3000/bill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billData),
            });
            const result = await response.json();
            if (response.ok) {
                alert("Dat hang thanh cong");
                console.log("hoa don da tao: ", result);
                dispatch({
                    type: 'Clear',
                    payload: { id: 0, name: '', price: 0, quantity: 0, image: '' },
                });
            } else {
                alert(`Lỗi: ${result.message || "Không thể tạo hóa đơn"}`);
            }
        } catch (error) {
            console.error("Lỗi kết nối tới server:", error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Lỗi kết nối tới server!");
            }
        }
    };

    return (
        <div className="TotalBill_contain">
            <h2>Hóa đơn của bạn</h2>
            <div className="bill-container">
                {listBill.map((item) => {
                    const drinkData = {
                        pr_id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        trang: true,
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
            <button className="btn-Call" onClick={handleCheckout}>gọi món</button>
            <div className="TotalBill">
                <hr />
                <div className="text-total">
                    <h3>Total Bill :</h3>
                    <h3>{total}</h3>
                </div>
            </div>
        </div>
    );
}