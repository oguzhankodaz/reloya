import { Pool } from 'pg'
 
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port:5432,
  database:'reloya',
  password: '123123123qwe',
})
export default pool;