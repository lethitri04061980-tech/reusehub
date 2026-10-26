import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
const COOKIE = "reusemap_session";
function secret(){const s=process.env.AUTH_SECRET;if(!s)throw new Error("AUTH_SECRET chưa được cấu hình");return s}
export function signSession(user:{id:number;full_name:string;email:string;phone:string}){const payload=Buffer.from(JSON.stringify({...user,exp:Date.now()+604800000})).toString("base64url");const sig=createHmac("sha256",secret()).update(payload).digest("base64url");return payload+"."+sig}
export function verifySession(token:string){try{const [payload,sig]=token.split(".");if(!payload||!sig)return null;const expected=createHmac("sha256",secret()).update(payload).digest();const actual=Buffer.from(sig,"base64url");if(actual.length!==expected.length||!timingSafeEqual(actual,expected))return null;const data=JSON.parse(Buffer.from(payload,"base64url").toString());if(!data.exp||data.exp<Date.now())return null;return {id:Number(data.id),full_name:String(data.full_name),email:String(data.email),phone:String(data.phone)}}catch{return null}}
export async function currentUser(){const jar=await cookies();const token=jar.get(COOKIE)?.value;return token?verifySession(token):null}
export const sessionCookieName=COOKIE;
export const sessionCookieOptions={httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax" as const,path:"/",maxAge:604800};
