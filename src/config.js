import { config } from 'dotenv'
config()

export const DB_HOST = process.env.DB_URL || 'mysql-lilianmarisol.alwaysdata.net'
export const DB_USER = process.env.DB_USER ||  '358294_lilian'
export const DB_PASSWORD = process.env.DB_PASSWORD ||  'FOVL000507!'
export const DB_DATABASE = process.env.DB_DATABASE || 'lilianmarisol_examencrud'
export const DB_PORT = process.env.DB_PORT || 3306