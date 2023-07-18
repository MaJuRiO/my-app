import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("account");
        const { Fname, Lname, Email,Location_detail, Location_province, Location_amphure, Location_tambon, zip_code, CA} = req.body;

        const HB_rate = 30
        const status = "Unknow"
        const post = await db.collection("Profile_user_Homecharger").insertOne({
            Fname,
            Lname,
            Email,
            text_address:`${Location_detail},${Location_province},${Location_amphure},${Location_tambon},${zip_code}`,
            ownerAddress:`${CA}`,
            HB_rate,
            status,
        });
        res.status(200).send('Charger added successfully');
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};