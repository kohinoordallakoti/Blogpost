import express from "express";
import { createContact, getContacts, deleteContact } from "../authcontroller/contactAuth.js";

const router = express.Router();

router.post("/create", createContact);

router.get("/get", getContacts);

router.delete("/delete/:id", deleteContact);

export default router;

