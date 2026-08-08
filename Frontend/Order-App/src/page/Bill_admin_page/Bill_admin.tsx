import { useEffect, useState } from "react";

export default function Bill_admin(){
    const [bill, setBill] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem('token');
                const headers: any = {};
                if (token) headers['Authorization'] = `Bearer ${token}`;

                const res = await fetch('http://localhost:3000/bill', { headers });
                const data = await res.json().catch(() => null);

                if (!res.ok) {
                    console.error('Fetch bills failed', res.status, data);
                    setBill([]);
                } else {
                    // Thêm phần này để lưu dữ liệu vào state khi thành công
                    setBill(data || []);
                }
            } catch (err) {
                console.log('loi khi fetch', err);
                setBill([]);
            }
        })(); // <-- Thêm cặp ngoặc tròn này để thực thi hàm bất đồng bộ ngay lập tức
    }, []); // <-- Thêm mảng dependency rỗng để chỉ gọi 1 lần khi component mount
    
    return (
        <div>
            {/* Render dữ liệu của bạn ở đây */}
        </div>
    );
}