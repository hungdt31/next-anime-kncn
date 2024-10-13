import axios from "axios"
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_URL
});

export const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONT_END_URL
});