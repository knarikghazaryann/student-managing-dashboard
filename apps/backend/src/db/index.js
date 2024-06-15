import pkg from 'pg'
const {Pool} = pkg

import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const query = (text, params) => pool.query(text, params)

export {query, pool}