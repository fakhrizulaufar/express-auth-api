- Express Auth API (JWT + Middleware)
- Deskripsi

REST API menggunakan Express dengan fitur Authentication, Authorization, JWT, Middleware, Products, dan Gudang.

- Tech Stack
Express.js
JWT
bcryptjs
cookie-parser
dotenv
helmet
express-rate-limit

- Authentication Flow
User login
Server generate JWT
Token disimpan di HttpOnly Cookie
Middleware membaca token
Role dicek untuk akses tertentu

- Analisis JWT vs Session
Analogi JWT

JWT itu seperti tiket konser.
Saat login, user diberikan tiket (token).
Setiap masuk ke area tertentu (API), user cukup menunjukkan tiket tersebut tanpa perlu dicek ulang ke database.

Kelebihan JWT
Stateless → tidak perlu menyimpan session di server, sehingga lebih scalable
Kekurangan JWT
Sulit untuk revoke token sebelum expired (misalnya jika user logout)

- Cara Menjalankan
npm install
npm run dev

- Endpoint
POST /api/register
POST /api/login
GET /api/products
POST /api/products (admin)
GET /api/gudang
GET /api/profile

- Author
Nama: Fakhri Zul Aufar