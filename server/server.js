const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authe');
const taskRoutes = require('./routes/tasks');
const cors = require('cors');

// Enable CORS for all origins (dev use)
// Load environment variables

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
