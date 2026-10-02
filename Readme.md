# 🍽️ Order App

<div align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens" alt="JWT" />
</div>

Ứng dụng quản lý đặt món và thanh toán cho nhà hàng/quán ăn, xây dựng theo kiến trúc Full-Stack hiện đại.

## 🚀 Giới thiệu

Dự án gồm 2 phần chính:

- `Frontend/Order-App`: giao diện người dùng cho đăng nhập, xem menu, đặt món và quản lý hóa đơn
- `Backend/order-app`: API quản lý người dùng, sản phẩm, danh mục, bàn, hóa đơn và log hệ thống

### 👥 Vai trò trong hệ thống

- `Customer`: đăng nhập, xem menu, đặt món
- `Admin`: quản lý hóa đơn, sản phẩm, danh mục và thao tác quản trị

---

## 🧩 Công nghệ sử dụng

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

---

## 📁 Cấu trúc dự án

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

---

## ✨ Tính năng chính

- 🔐 Đăng nhập và phân quyền theo role
- 🧾 Xem menu và danh mục sản phẩm
- 🪑 Quản lý bàn và đơn hàng
- 💳 Tạo / xem hóa đơn
- 🛒 Quản lý sản phẩm và danh mục
- 📊 Theo dõi audit log
- 🖥️ Giao diện riêng cho admin và khách hàng

---

## ⚙️ Yêu cầu môi trường

Trước khi chạy dự án, hãy đảm bảo máy của bạn đã cài:

- Node.js >= 18
- npm hoặc yarn
- PostgreSQL
- Git

---

## 🏃 Hướng dẫn cài đặt và chạy

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

---

## 👤 Tài khoản mẫu

Dự án hiện đang kiểm tra quyền dựa trên trường `role` và login theo `username` + `pass` trong bảng `users`.

### 🧑‍💼 Tài khoản người dùng
- Username: `nguyenvanA`
- Password: `Na_456`

### 🛡️ Tài khoản admin
- Username: `admin`
- Password: `Ad_123`

---

## 🧪 Các lệnh hữu ích

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

---

## 📘 Hướng dẫn sử dụng

### Với khách hàng
1. Đăng nhập vào hệ thống
2. Vào mục menu
3. Chọn món và thực hiện đặt hàng
4. Theo dõi hóa đơn cần thanh toán

### Với admin
1. Đăng nhập bằng tài khoản admin
2. Quản lý sản phẩm, danh mục và hóa đơn
3. Theo dõi dữ liệu và log hệ thống

---

## ⚠️ Lưu ý

- Cần đảm bảo PostgreSQL đang chạy trước khi khởi động backend.
- Nếu gặp lỗi về JWT hoặc database connection, hãy kiểm tra lại file `.env` và secret key trong backend.
- Nên chạy migration hoặc tạo database tương ứng với tên `DB_NAME` trước khi bắt đầu.

---

## ✅ Kết luận

Project này là một nền tảng quản lý đơn hàng nhà hàng cơ bản nhưng đầy đủ, thích hợp để mở rộng thêm các tính năng như thanh toán online, quản lý nhân viên, báo cáo doanh thu và tích hợp real-time order updates.
