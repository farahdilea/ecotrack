const db = require('../db');

module.exports.getAlluser = async () => {
    const [rows] = await db.query("SELECT * FROM user ")
        .catch(err => console.log(err));

    return rows;
};

module.exports.getuserById = async (user_id) => {
    const [rows] = await db.query("SELECT * FROM user WHERE user_id=" + user_id)
        .catch(err => console.log(err));

    return rows;
};

module.exports.deleteuser = async (user_id) => {
    const [rows] = await db.query("DELETE FROM user WHERE user_id=" + user_id)
        .catch(err => console.log(err));

    return rows.affectedRows;
};

module.exports.Updateuser = async (user_id, name, email, password, location) => {
    const [rows] = await db.query("UPDATE user SET name=?, email=?, password=?, location=? WHERE user_id=?", [name, email, password, location, user_id])
        .catch(err => console.log(err));

    return rows;
};

module.exports.addUser = async (name, email, password, location, type) => {
    const [result] = await db.query("INSERT INTO user (name, email, password, location, type) VALUES (?, ?, ?, ?, ?)", [name, email, password, location,type])
        .catch(err => {
            console.error(err);
            throw err;
        });

    return result;
};
module.exports.addInterest = async (user_id, name, threshold) => {
    try {
        const [result] = await db.query("INSERT INTO interests (user_id, name, threshold) VALUES (?, ?, ?)", [user_id, name, threshold]);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getUserByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM user WHERE email=?", [email])
        .catch(err => {
            console.error(err);
            throw err;
        });
        

    return rows[0]; // Assuming email is unique, so there should be at most one user
};

module.exports.checkEnvironmentalAlerts = async (userId) => {
    try {
        console.log(`Checking environmental alerts for a specific user (user_id=${userId}).`);

        // Get the user's interest and threshold
        const [userInterest] = await db.query("SELECT user_id, name, threshold FROM interests WHERE user_id = ?", [userId]);

        if (!userInterest || userInterest.length === 0) {
            console.log('No user interest found.');
            return;
        }

        const { user_id, name: interestName, threshold } = userInterest[0];

        // Initialize processed post IDs for the current user
        const processedPostIds = new Set();

        // Log the SQL query
        const sqlQuery = `SELECT user_id, ${interestName} FROM posts WHERE ?? < ?`;
        console.log('SQL Query:', sqlQuery);

        // Get posts with values below the user's threshold based on the name column
        const [belowThresholdData] = await db.query(sqlQuery, [`${interestName}`, threshold]);

        // Log the belowThresholdData array
        console.log('belowThresholdData:', belowThresholdData);

        // Filter out already processed post IDs
        const newBelowThresholdData = belowThresholdData.filter(data => !processedPostIds.has(data.post_id));

        if (newBelowThresholdData.length > 0) {
            // Generate environmental alert for the user's interest
            const alertMessage = `Environmental Alert: User ${user_id} - Interest ${interestName} - Data below threshold (${threshold})`;

            // Insert new data below threshold into the environmental_alerts table
            for (const data of newBelowThresholdData) {
                await db.query(
                    "INSERT INTO environmental_alerts (user_id, name, threshold, alert_message, alert_data) VALUES (?, ?, ?, ?, ?)",
                    [user_id, interestName, threshold, alertMessage, JSON.stringify(data)]
                );

                // Add processed post ID to the set
                processedPostIds.add(data.post_id);
            }

            console.log('Alerts inserted successfully.');

            // You can send a notification or take any other action here
            // For example, you might want to send an email or push notification to the user
        } else {
            console.log(`No new data below threshold found for User ${user_id} - Interest ${interestName} (${threshold})`);
        }
    } catch (error) {
        console.error('Error in checkEnvironmentalAlerts:', error);
        throw error;
    }
};




module.exports.getUserAlerts = async (user_id) => {
    try {
        // Get all alerts for the specified user
        const [alerts] = await db.query("SELECT * FROM environmental_alerts WHERE user_id = ?", [user_id]);

        return alerts;
    } catch (error) {
        console.error('Error retrieving user alerts:', error);
        throw error;
    }
};
