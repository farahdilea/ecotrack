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

module.exports.addUser = async (name, email, password, location) => {
    const [result] = await db.query("INSERT INTO user (name, email, password, location) VALUES (?, ?, ?, ?)", [name, email, password, location])
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

module.exports.checkEnvironmentalAlerts = async () => {
    try {
        console.log('Checking environmental alerts for all users.');

        // Get all users and their alert thresholds
        const [interests] = await db.query("SELECT * FROM interests");

        // Iterate over each user
        for (const interest of interests) {
            const { user_id, name, threshold } = interest;

            // Log the SQL query
            console.log('SQL Query:', "SELECT * FROM posts WHERE user_id = ? AND temp < ?", [user_id, threshold]);

            // Get all environmental data below the user's threshold
            const [belowThresholdData] = await db.query("SELECT * FROM posts WHERE user_id = ? AND temp < ?", [user_id, threshold]);

            // Log the belowThresholdData array
            console.log('belowThresholdData:', belowThresholdData);

            if (belowThresholdData.length > 0) {
                // Generate environmental alert for the user
                const alertMessage = `Environmental Alert: User ${user_id} (${name}) - Data below threshold (${threshold})`;
                console.log(alertMessage);

                // Insert all data below threshold into the environmental_alerts table
                for (const data of belowThresholdData) {
                    await db.query(
                        "INSERT INTO environmental_alerts (user_id, name, threshold, alert_message, alert_data) VALUES (?, ?, ?, ?, ?)",
                        [user_id, name, threshold, alertMessage, JSON.stringify(data)]
                    );
                }

                console.log('Alerts inserted successfully.');

                // You can send a notification or take any other action here
                // For example, you might want to send an email or push notification to the user
            } else {
                console.log('No data below threshold found for User', user_id);
            }
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
