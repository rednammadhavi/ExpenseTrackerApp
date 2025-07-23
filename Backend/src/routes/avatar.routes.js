import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get("/avatar/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`https://api.multiavatar.com/${id}`, {
            headers: { Accept: "text/plain" },
        });
        res.set("Content-Type", "image/svg+xml");
        res.send(response.data);
    } catch (err) {
        res.status(500).send("Error fetching avatar");
    }
});

export { router };