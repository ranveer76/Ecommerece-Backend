const Brand=require("../models/Brand")

exports.getAll=async(req,res)=>{
    try {
        const result=await Brand.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching brands"})
    }
}

exports.create=async(req,res)=>{
    try {
        const result=await Brand.create(req.body)
        res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error creating brand"})
    }
}

exports.update=async(req,res)=>{
    try {
        const result = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(result)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating brand"})
    }
}