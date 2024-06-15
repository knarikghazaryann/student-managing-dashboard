import {pool, query} from "./index.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrate = async () => {
    const migrationFile = path.join(__dirname, '../../migrations/create_student_table.sql')
    const migrationSql = fs.readFileSync(migrationFile, 'utf-8')
    try {
        await query(migrationSql)
        console.log('Migration completed successfully!')
    } catch (e) {
        console.error('Migration failed:', e)
    } finally {
        pool.end()
    }
}

migrate()