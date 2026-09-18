import "./menu_manage.css"
export default function Menu_Manage(){
    const frameItem=()=>{
        return(
            <div className="w-[10rem] h-[10rem] bg-amber-200">

            </div>
        )
    }
    return(
        <div className="ManageContainer  bg-linear-to-r from-indigo-200 via-red-200 to-yellow-100">
            {frameItem()}
        </div>
    )
}