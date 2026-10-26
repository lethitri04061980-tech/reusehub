import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import { signSession, sessionCookieName, sessionCookieOptions } from "../../../../lib/auth";
export const runtime = "nodejs";
const scrypt = promisify(scryptCallback);
function db(){if(!process.env.DATABASE_URL)throw new Error("DATABASE_URL missing");return neon(process.env.DATABASE_URL)}
export async function POST(req:Request){try{const b=await req.json();const email=String(b.email||"").trim().toLowerCase(),password=String(b.password||"");if(!email||!password)return NextResponse.json({error:"Nhập Gmail và mật khẩu."},{status:400});const sql=db();const rows=await sql`SELECT id,full_name,email,phone,password_hash FROM public.users WHERE email=${email} LIMIT 1`;if(!rows.length)return NextResponse.json({error:"Gmail hoặc mật khẩu không chính xác."},{status:401});const row=rows[0] as {id:number;full_name:string;email:string;phone:string;password_hash:string};const [salt,stored]=row.password_hash.split(":");const hash=await scrypt(password,salt,64) as Buffer;const actual=hash.toString("hex");if(actual.length!==stored.length||!Buffer.from(actual).equals(Buffer.from(stored)))return NextResponse.json({error:"Gmail hoặc mật khẩu không chính xác."},{status:401});const user={id:Number(row.id),full_name:row.full_name,email:row.email,phone:row.phone};const res=NextResponse.json({user});res.cookies.set(sessionCookieName,signSession(user),sessionCookieOptions);return res}catch(e){console.error("login failed",e);return NextResponse.json({error:"Chưa thể đăng nhập. Vui lòng thử lại."},{status:500})}}
