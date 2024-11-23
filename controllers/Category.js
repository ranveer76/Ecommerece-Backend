const Category=require("../models/Category")

exports.getAll=async(req,res)=>{
    try {
        const result=await Category.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching categories"})
    }
}

exports.create=async(req,res)=>{
    try {
        const result=await Category.create(req.body)
        res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error creating category"})
    }
}

exports.update=async(req,res)=>{
    try {
        const result = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(result)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating category"})
    }
}