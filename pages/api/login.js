import clientPromise from "../../lib/mongodb";
import bcrypt from "bcryptjs";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("account");
        const { Email, password: pass } = req.body;

        const checkUsername = await db.collection("posts").findOne({
            Email: Email,
        });

        
        if (!checkUsername) {
            const message = "User not found";
            res.json({ error: message });
            return; // Exit the function
        }

        if (bcrypt.compare(pass, checkUsername.password)) {
            const message = "login"
            res.json(message)
        }
        else{
            const message = "password not correct"
            res.json(message)
        }


    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}