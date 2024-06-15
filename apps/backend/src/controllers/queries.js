export const getAllStudentsQuery = 'SELECT * FROM student ORDER BY id'

export const createStudentQuery = `
        INSERT INTO student (first_name, last_name, email, password, age, country, city) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id 
   `
export const findStudentQuery = 'SELECT * FROM student WHERE email = $1'

export const searchStudentsQuery = 'SELECT * FROM student WHERE first_name = $1 OR last_name = $2 ORDER BY id'