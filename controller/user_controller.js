// user_controller.js
const express = require('express');
//const PORT = 3000;
const cron = require('node-cron');
const router = express.Router();


// Middleware to parse JSON and urlencoded data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const service =require('../models/user_services')
const db=require('../db');


cron.schedule('0 * * * *', async () => {
    try {
        await service.checkForAlerts();
    } catch (error) {
        console.error('Error in checkForAlerts:', error);
    }
});
router.post('/manualAlerts', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        await service.checkEnvironmentalAlerts(user_id);
        res.json({ message: 'Manual environmental alerts check triggered successfully' });
    } catch (error) {
        console.error('Error in manual environmental alerts check:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/',async (req, res) => {
   const user= await service.getAlluser()
    res.send(user)
});

router.get('/:user_id',async (req, res) => {
    const userById= await service.getuserById(req.params.user_id)
    if(userById.length ==0)
    {
        res.status(404).json('no recorded with given id :'+res.params.user_id)
    }
    else
     res.send(userById)
 });

 router.delete('/:user_id',async (req, res) => {
    const affectedRows= await service.deleteuser(req.params.user_id)
    if(affectedRows ==0)
    {
        res.status(404).json('no recorded with given id :')
    }
    else
   { console.log(Delete_user)
     res.send('Delete user has the number'+res.params.user_id);
   }
 });    
 router.post('/addInterest/:user_id', async (req, res) => {
    const { user_id } = req.params; // Extract user_id from the URL params
    const { name, threshold } = req.body;

    // Validate that required fields are present
    if (!name || !threshold) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await service.addInterest(user_id, name, threshold);
        res.status(201).json({ message: 'Interest added successfully', interestId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
 router.put('/update/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const location = req.body.location;

    const updatedData = await service.Updateuser(user_id, name, email, password, location);

    res.send('Update success');
});

router.post('/add', async (req, res) => {
    const { name, email, password, location } = req.body;

    // Validate that required fields are present
    if (!name || !email || !password || !location) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await service.addUser(name, email, password, location);
        res.status(201).json({ message: 'User added successfully', userId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate that required fields are present
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await service.getUserByEmail(email);

        // Check if the user exists and the password is correct
        if (user && user.password === password) {
            res.json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
