import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'data', 'task.json');
const registerPath = path.join(__dirname,'data','register.json')

export const ensureFileExist = () => {
    try {
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true })
            fs.writeFileSync(filePath, '[]', 'utf-8');
        }
    } catch (error) {
        console.error('error ensuring file exists', error);
    }
}
export const readTask = () => {
    try {
        ensureFileExist();
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error('error reading tasks', error)
        return [];
    }
}
export const writeTask = (tasks) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
    } catch (error) {
        console.error('error writing tasks : ', error);
    }
}

// updated function to ensure register file exists
export const ensureFileRegisterExist = () => {
    try {
        if (!fs.existsSync(registerPath)) {
            fs.mkdirSync(path.dirname(registerPath), { recursive: true })
            fs.writeFileSync(registerPath, '[]', 'utf-8');
        }
    } catch (error) {
        console.error('error ensuring file exists', error);
    }
}
export const readRegister = () => {
    try {
        ensureFileRegisterExist();
        const data = fs.readFileSync(registerPath, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error('error reading Register tasks', error)
        return [];
    }
}
export const registerUser = (data)=>{
    try {
        fs.writeFileSync(registerPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('error reading register', error)
        return [];
    }
}
