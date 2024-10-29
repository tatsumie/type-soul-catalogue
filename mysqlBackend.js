require('dotenv').config();

const mysql = require('mysql');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000; 


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');
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
            return res.status(500).json({ message: 'Error adding accessory. ######################CONTACT .h12. WITH SCREENSHOT OF THIS WINDOW IF YOU ARE SEEING THIS#####################', error: err });
        } else {
            console.log('ACCESSORY ADDED');
            return res.status(200).sendFile(path.join(__dirname, 'views', 'success.html'));
        }
    });
});


// GET route to fetch and display all accessories
app.get('/accessories', (req,res)=>{
    const query = `SELECT * FROM accessories`;
    connection.query(query, (err,results) => {
        if(err){
            console.error('error fecthing accessories: ', err);
            res.status(500).send('error sending accessories');
        } else {
            res.render('accessories', { accessories: results});
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

