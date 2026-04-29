import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// 4. Activity/Activity Logs
// Project management ka maqsad hi ye hai ke kaam track ho.

// Kya karna hai: "Recent Activity" section banayein jahan dikhe ke "Saad updated task 'Fix API' at 10:00 PM". Yeh cheez aapke project ko "VIP" level par le jati hai.


// 5. UI Refinement (The "VIP" Polish)
// Aapne Framer Motion aur Tailwind use kiya hai, ise aur improve karein:

// Skeleton Loading: Abhi hum spinner use kar rahe hain, lekin professional apps (jaise LinkedIn ya Facebook) "Skeleton Loading" (shimmer effect) use karte hain. Ye data load hone se pehle gray bars dikhata hai.