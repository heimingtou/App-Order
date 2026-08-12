import { Navigate, Outlet } from "react-router-dom";


type protectProp={
    allowRole:string,
};
export default function ProtectRole({allowRole}:protectProp){

    const roleUser= localStorage.getItem('role');
    if(roleUser!==allowRole)
    {
        return <Navigate to="/" replace/>;
    }
    return <Outlet/>
}