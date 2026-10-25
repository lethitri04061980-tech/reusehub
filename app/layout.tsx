import type { Metadata } from "next";
import "./style.css";
export const metadata: Metadata = { title: "ReUse Map — Tìm lại, trao tặng, tái sử dụng", description: "Nền tảng cộng đồng giúp tìm đồ thất lạc và trao tặng đồ dùng còn tốt." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="vi"><body>{children}</body></html>; }
