const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_FILE = path.join(__dirname, 'data', 'registrations.json');

function readRegistrations() {
    try {
        if (!fs.existsSync(DATA_FILE)) return [];
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (err) {
        return [];
    }
}

function writeRegistrations(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (err) {
        return false;
    }
}

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'HTML Lab Full-Stack Backend',
        author: 'Ch. Prudhvi Raj (2500080283)',
        port: PORT
    });
});

// Get all registrations
app.get('/api/students', (req, res) => {
    const list = readRegistrations();
    res.json({ success: true, count: list.length, data: list });
});

// Register student
app.post('/api/register', (req, res) => {
    const { name, email, dob, age, gender, phone, department, skills, address, state } = req.body;

    if (!name || !email) {
        return res.status(400).json({ success: false, error: 'Name and email are required.' });
    }

    const list = readRegistrations();
    const newRecord = {
        id: String(Date.now()).slice(-6),
        name: String(name).trim(),
        email: String(email).trim(),
        dob: dob || '',
        age: Number(age) || 0,
        gender: gender || 'N/A',
        phone: phone || '',
        department: department || 'CSE',
        skills: skills || 'None',
        address: address || '',
        state: state || 'Andhra Pradesh',
        registeredAt: new Date().toISOString()
    };

    list.push(newRecord);
    writeRegistrations(list);

    res.status(201).json({
        success: true,
        message: 'Student registered successfully in backend database!',
        data: newRecord
    });
});

// Form inquiry
app.post('/api/contact', (req, res) => {
    res.json({
        success: true,
        message: 'Form data received and processed by backend server.',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`HTML Lab Full-Stack Server running at http://localhost:${PORT}`);
});
