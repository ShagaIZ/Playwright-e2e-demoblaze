// utils/env.ts
import dotenv from 'dotenv';
import path from 'path';

// Можно переключать окружение через NODE_ENV
const envFile = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const BASE_URL = process.env.BASE_URL 
