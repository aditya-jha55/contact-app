const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { isValidObjectId } = require("mongoose");
//@descp Get all contacts
//@route GET api/contacts
//@access private

const getContacts = asyncHandler(async (req, resp) => {
    const contacts = await Contact.find({user_id: req.user.id});
    resp.status(200).json({"message":"contacts fetched", "data": contacts})
});

//@descp Create contacts
//@route POST api/contacts
//@access private

const createContact = asyncHandler( async (req, resp) => {
    console.log("Request body", req.body);
    const { name, email, phone} = req.body;
    if(!name || !email || !phone) {
        resp.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        user_id: req.user.id,
        name,
        email,
        phone
    })
    resp.status(201).json({"message":"new contact created", "data": contact})
});

//@descp Get contacts
//@route GET api/contacts/id
//@access private

const getContact = asyncHandler(async (req, resp) => {
    if(!isValidObjectId(req.params.id)){
        resp.status(404).json({"message": `Invalid id -- ${req.params.id}`})
        throw new Error("contact not found");
    }
    const contact = await Contact.findById(req.params.id);
   
    if(!contact){
        resp.status(404)
        throw new Error("contact not found");
    }
    resp.status(200).status(200).json({"message":`get contact for ${req.params.id}`, "data": contact})
})

//@descp Update contacts
//@route PUT api/contacts/id
//@access private

const updateContact = asyncHandler(async (req, resp) => {
    if(!isValidObjectId(req.params.id)){
        resp.status(404).json({"message": `Invalid id -- ${req.params.id}`})
        throw new Error("contact not found");
    }
    const contact = await Contact.findById(req.params.id);
    if(!isValidObjectId(req.params.id)){
        resp.status(404).json({"message": `Invalid id -- ${req.params.id}`})
        throw new Error("contact not found");
    }
    if(!contact){
        resp.status(404).json({"message": `id ${req.params.id} not found`})
        throw new Error("contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        );

    resp.status(200).json({"message": `update contact for ${req.params.id}`, "data": updatedContact})
})

//@descp Delete contacts
//@route DELETE api/contacts/id
//@access private

const deleteContact = asyncHandler(async (req, resp) => {
    if(!isValidObjectId(req.params.id)){
        resp.status(404).json({"message": `Invalid id -- ${req.params.id}`})
        throw new Error("contact not found");
    }
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        resp.status(404).json({"message": `Invalid id ${req.params.id}`})
        throw new Error("contact not found");
    }
    await Contact.deleteOne(req.params.is)
    resp.status(200).json({"message": `contact deleted for ${req.params.id}`})
})



module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }

