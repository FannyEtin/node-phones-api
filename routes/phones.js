const express = require("express");
const axios = require("axios");
const router = express.Router();

const url = "http://fs1.co.il/bus/phones/list.php";

async function fetchPhones() {
    const response = await axios.get(url);
    return response.data;
}

router.get('/', async (req, res) => {
    try{
        const phones = await fetchPhones();
        res.json(phones);
    } catch (error){
        console.error("Axios:", error.message);
        res.status(500).json({error: "שגיאה בשליפת הנתונים"});
    }
});

router.get('/single/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const phones = await fetchPhones();
        const phone = phones.find(p => p.id == id);

        if (phone) {
            res.json(phone);
        } else {
            res.status(404).json({ error: "לא נמצא טלפון עם מזהה כזה" });
        }
    } catch (error) {
        console.error("שגיאת Axios:", error.message);
        res.status(500).json({ error: "שגיאה בשליפת נתונים" });
    }
});

router.get('/search', async (req, res) => {
    const searchTerm = req.query.s?.toLowerCase();
    try{
        const response = await axios.get(url);
        const phones = response.data;
        const filtered = phones.filter(p => p.name?.toLowerCase().includes(searchTerm) || p.cpu?.toLowerCase().includes(searchTerm) || p.gpu?.toLowerCase().includes(searchTerm));
        res.json(filtered);
    }catch (error){
        res.status(500).send("שגיאה בשליפת נתונים");
    }
});

module.exports = router;