import { readRegister, registerUser } from "../utils/file.util.js";
import bcrypt from 'bcrypt';

export const registerRoute = async (req, res) => {
    // Registration logic here
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const readData = await readRegister();
    const existingUser = readData.find(user => user.email === email);
    if (existingUser) {
        return res.status(404).json({ msg: 'user already registered' });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newData = {
            id: Date.now(),
            email,
            password:hashedPassword
        }
        readData.push(newData);
        await registerUser(readData);
        res.status(201).json({ message: 'User registered successfully', newData });
    }

}

export const loginRoute = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ msg: 'email and password are required to login' });
    }
    const data = await readRegister();
    const user = data.find((item) => item.email == email);
    if (!user) {
        return res.status(400).json({ msg: 'email and password are incorrect' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ msg: 'password is incorrect' });
    }
    req.session.user = { user: email }
    res.cookie('email', email, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
    res.json({ msg: "login successfull" });
}

export const logoutRoute = (req, res) => {
    res.clearCookie('username');
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.log('Error destroying session:', err);
                return res.status(500).send('Logout failed.');
            }
            res.send('Logout successful. Session destroyed.');
        });
    } else {
        res.send('No session to destroy.');
    }
}

