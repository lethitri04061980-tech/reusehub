# ReUse Map

Nền tảng cộng đồng tiếng Việt để đăng tin đồ thất lạc, đồ nhặt được và trao tặng đồ dùng còn tốt.

## Công nghệ
- Next.js App Router
- Neon PostgreSQL qua biến môi trường DATABASE_URL
- Vercel production deployment

## Tính năng
- Tìm kiếm và lọc tin theo từ khóa và loại tin
- Tạo tin mất đồ, nhặt được và trao tặng
- API đọc/ghi dữ liệu PostgreSQL với kiểm tra đầu vào
- Giao diện responsive

## Chạy local
```bash
npm install
npm run dev
```
Thiết lập DATABASE_URL trong .env.local trước khi dùng API.

Lưu ý an toàn: không đăng thông tin nhạy cảm; bàn giao đồ tại nơi công cộng.
