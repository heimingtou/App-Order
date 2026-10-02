# Order App

Đây là một ứng dụng web quản lý đặt món và thanh toán cho nhà hàng/quán ăn, được xây dựng theo kiến trúc Full-Stack gồm:

- Frontend: React + Vite + TypeScript
- Backend: NestJS + TypeORM + PostgreSQL
- Authentication: JWT
- Realtime: Socket.IO

## 1. Tổng quan

Dự án bao gồm hai phần chính:

- `Frontend/Order-App`: giao diện người dùng để đăng nhập, xem menu, đặt món và quản lý hóa đơn
- `Backend/order-app`: API quản lý người dùng, sản phẩm, danh mục, bàn, hóa đơn và log hệ thống

Ứng dụng hỗ trợ hai vai trò chính:

- Customer: đăng nhập, xem menu, đặt món
- Admin: quản lý hóa đơn, sản phẩm, danh mục và thao tác quản trị

## 2. Công nghệ sử dụng

### Frontend
- React 19
- Vite
- TypeScript
- React Router
- Socket.IO Client
- Tailwind CSS

### Backend
- NestJS
- PostgreSQL
- TypeORM
- Passport + JWT
- Socket.IO
- Class Validator / Class Transformer

## 3. Cấu trúc dự án

```text
App-Order/
├── Backend/
│   └── order-app/
│       ├── src/
│       ├── test/
│       ├── .env
│       ├── package.json
│       └── ...
├── Frontend/
│   └── Order-App/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── ...
├── Readme.md
├── package.json
└── ...
```

## 4. Tính năng chính

- Đăng nhập và phân quyền theo role
- Xem menu và danh mục sản phẩm
- Quản lý bàn và đơn hàng
- Tạo / xem hóa đơn
- Quản lý sản phẩm và danh mục
- Theo dõi audit log
- Giao diện dành riêng cho admin và khách hàng

## 5. Yêu cầu môi trường

Trước khi chạy dự án, hãy đảm bảo máy của bạn đã cài:

- Node.js >= 18
- npm hoặc yarn
- PostgreSQL
- Git

## 6. Cài đặt và chạy dự án

### Bước 1: Cài đặt dependencies

#### Backend
```bash
cd Backend/order-app
npm install
```

#### Frontend
```bash
cd Frontend/Order-App
npm install
```

### Bước 2: Cấu hình môi trường

Backend có file `.env` trong thư mục `Backend/order-app`. Cần đảm bảo các biến môi trường sau được khai báo đúng:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=Order
```

Nếu dự án đang dùng secret JWT thì cần kiểm tra và đồng bộ trong `auth.module.ts`, `jwt.strategy.ts` và các module dùng JWT.

### Bước 3: Chạy backend

```bash
cd Backend/order-app
npm run start:dev
```

Backend mặc định chạy ở:

- http://localhost:3000

### Bước 4: Chạy frontend

```bash
cd Frontend/Order-App
npm run dev
```

Frontend thường chạy ở:

- http://localhost:5173

## 7. Tài khoản mẫu

Dự án hiện đang kiểm tra quyền dựa trên trường `role` và login theo `username` + `pass` trong bảng `users`.

### Tài khoản người dùng
- Username: `nguyenvanA`
- Password: `Na_456`

### Tài khoản admin
- Username: `admin`
- Password: `Ad_123`

## 8. Các lệnh hữu ích

### Backend
```bash
npm run build
npm run start
npm run start:dev
npm run test
npm run lint
```

### Frontend
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 9. Hướng dẫn sử dụng

### Với khách hàng
1. Đăng nhập vào hệ thống
2. Vào mục menu
3. Chọn món và thực hiện đặt hàng
4. Theo dõi hóa đơn cần thanh toán

### Với admin
1. Đăng nhập bằng tài khoản admin
2. Quản lý sản phẩm, danh mục và hóa đơn
3. Theo dõi dữ liệu và log hệ thống

## 10. Lưu ý

- Cần đảm bảo PostgreSQL đang chạy trước khi khởi động backend.
- Nếu gặp lỗi về JWT hoặc database connection, hãy kiểm tra lại file `.env` và secret key trong backend.
- Nên chạy migration hoặc tạo database tương ứng với tên `DB_NAME` trước khi bắt đầu.

## 11. Kết luận

Project này là một nền tảng quản lý đơn hàng nhà hàng cơ bản nhưng đầy đủ, thích hợp để mở rộng thêm các tính năng như thanh toán online, quản lý nhân viên, báo cáo doanh thu và tích hợp real-time order updates.
