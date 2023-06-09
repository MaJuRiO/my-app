import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("EVCharger");
        const { Fname, Lname, Email, Location_province, Location_amphure, Location_tambon, zip_code, CA} = req.body;

        const HB_rate = 300

        const post = await db.collection("posts").insertOne({
            Fname,
            Lname,
            Email,
            Location_province, 
            Location_amphure, 
            Location_tambon, 
            zip_code,
            CA,
            HB_rate
        });
        res.status(200).send('Charger added successfully');
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};