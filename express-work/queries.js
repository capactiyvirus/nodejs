const Pool = require('pg').Pool
const pool = new Pool({
  user: 'fuwlklnhiecfrg',
  host: 'ec2-54-87-112-29.compute-1.amazonaws.com',
  database: 'd1k0s5qvr4hud',
  password: 'e7ef70a4b0ede709fc226d7c83c753a962ae09a22a1f8658196ad602d8e4d914',
  port: 5432,
})


const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }