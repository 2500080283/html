const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const PROJECTS_FILE = path.join(__dirname, 'data', 'projects.json');
const MESSAGES_FILE = path.join(__dirname, 'data', 'messages.json');

function readJson(filePath, fallback = []) {
    try {
        if (!fs.existsSync(filePath)) return fallback;
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        console.error(`Error reading ${filePath}:`, e.message);
        return fallback;
    }
}

function writeJson(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error(`Error writing ${filePath}:`, e.message);
        return false;
    }
}

// 1. Health Status
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'Ch. Prudhvi Raj Portfolio REST API',
        student: 'Ch. Prudhvi Raj (2500080283)',
        institution: 'KL University',
        port: PORT,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// 2. Fetch Projects
app.get('/api/projects', (req, res) => {
    const projects = readJson(PROJECTS_FILE, []);
    res.json({ success: true, count: projects.length, data: projects });
});

// 3. Fetch Inquiries / Messages
app.get('/api/messages', (req, res) => {
    const messages = readJson(MESSAGES_FILE, []);
    res.json({ success: true, count: messages.length, data: messages });
});

// 4. Submit Contact Message
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: 'Name, email, and message are required fields.'
        });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid email address.'
        });
    }

    const messages = readJson(MESSAGES_FILE, []);
    const newEntry = {
        id: messages.length + 1,
        name: name.trim(),
        email: email.trim(),
        subject: (subject || 'Portfolio Inquiry').trim(),
        message: message.trim(),
        receivedAt: new Date().toISOString(),
        status: 'unread'
    };

    messages.push(newEntry);
    writeJson(MESSAGES_FILE, messages);

    res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been safely delivered and recorded.',
        data: {
            id: newEntry.id,
            name: newEntry.name,
            receivedAt: newEntry.receivedAt
        }
    });
});

// Fallback to index.html for single-page routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Portfolio Server running at http://localhost:${PORT}`);
    console.log(`Student: Ch. Prudhvi Raj (2500080283) • KL University`);
});
