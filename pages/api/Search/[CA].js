import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("EVCharger");
        const { CA } = req.query;
        const post = await db.collection("posts").findOne({ CA: CA });
        if (post) {
            res.json(post);
        }
        else{
            const message = "Not Found"
            return res.status(500).send(message)
        }

    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};