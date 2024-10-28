require('dotenv').config();

const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000; 


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: 'Ellisor01!',
    database: process.env.DB_NAME
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('connected to database'); 
});



// POST route to add accessory
app.post('/add-accessory', (req, res) => {
    console.log('Received data:', req.body);  // Log incoming data to check

    const { accessory_name, health, defense, posture, reiatsu, meter_gain, reiatsu_regen, reduced_meter_drain, hierro_pen } = req.body;

    const query = `INSERT INTO accessories (accessory_name, health, defense, posture, reiatsu, meter_gain, reiatsu_regen, reduced_meter_drain, hierro_pen) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [accessory_name, health, defense, posture, reiatsu, meter_gain, reiatsu_regen, reduced_meter_drain, hierro_pen], (err, results) => {
        if (err) {
            console.error('Could not execute query', err); 
            return res.status(500).json({ message: 'Error adding accessory', error: err });
        } else {
            console.log('ACCESSORY ADDED');
            return res.status(200).sendFile(path.join(__dirname, 'views', 'success.html'));
        }
    });
});


// GET route to fetch and display all accessories
app.get('/accessories', (req, res) => {
    const query = `SELECT * FROM accessories`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching accessories:', err);
            res.status(500).send('Error fetching accessories');
        } else {
            let html = `
                <html>
                <head>
                    <title>Accessories</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        table, th, td {
                            border: 1px solid black;
                        }
                        th, td {
                            padding: 15px;
                            text-align: left; 
                        }
                        th {
                            background-color: #f2f2f2; 
                        }
                    </style>
                </head>
                <body>
                    <h1>Accessories List</h1>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Health</th>
                            <th>Defense</th>
                            <th>Posture</th>
                            <th>Reiatsu</th>
                            <th>Meter Gain</th>
                            <th>Reiatsu Regen</th>
                            <th>Reduced Meter Drain</th>
                            <th>Hierro Pen</th>
                        </tr>`;

            // Loop through the results and add each accessory as a row in the table
            results.forEach(accessory => {
                html += `
                    <tr>
                        <td>${accessory.id}</td>
                        <td>${accessory.accessory_name}</td>
                        <td>${accessory.health}</td>
                        <td>${accessory.defense}</td>
                        <td>${accessory.posture}</td>
                        <td>${accessory.reiatsu}</td>
                        <td>${accessory.meter_gain}</td>
                        <td>${accessory.reiatsu_regen}</td>
                        <td>${accessory.reduced_meter_drain}</td>
                        <td>${accessory.hierro_pen}</td>
                    </tr>`;
            });

            html += `
                    </table>
                    <br>
                    <a href="/">Add another accessory?</a>
                </body>
                </html>`;
            
            res.send(html);
        }
    });
});

// GET route to serve the HTML form on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'views','add_accessory.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

