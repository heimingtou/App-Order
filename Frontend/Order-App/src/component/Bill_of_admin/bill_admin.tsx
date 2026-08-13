import { useState } from "react"
import './Bill_admin.css'
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
type BillItem_adminProp={
    listItem:BillProp
}
export default function BillItem_admin({listItem}:BillItem_adminProp){

   
   
    return(
        <>
            <table>
            <colgroup>
                <col style={{width:"40%"}} />
                <col style={{width:"25%"}}/>
                <col style={{width:"10%"}}/>
                <col style={{width:"25%"}}/>
            </colgroup>
            <thead>
                <tr>
                    <th>Name </th>
                    <th>Price</th>
                    <th>SL</th>
                    <th>total</th>
                </tr>
            </thead>
            <tbody>
                {
                listItem?.p_item && listItem.p_item.length > 0 ?(
                listItem.p_item.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.pr_name}</td>
                        <td>{item.pr_price}</td>
                        <td>x{item.sl}</td>
                        <td>{item.price_total}</td>
                    </tr> 
                            ))):(
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center" }}>Không có sản phẩm</td>
                        </tr>
                    )}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3} style={{textAlign:"left"}}></td>
                    <td>{listItem.p_total}</td>
                </tr>
            </tfoot>        
            </table>
            
           
        </>
        
    )
}