import axios from "axios"
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_URL
});

// export const streaming = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACK_END_URL
// });