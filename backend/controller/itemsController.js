const { find } = require('../models/itemModel')
const Item=require('../models/itemModel')

//get all items
const getItems = async(req,res)=>{
    const items=await Item.find()
    res.status(200).json({
        success:true,
        items: items.map((item)=>({
            name: item.name,
            qty: item.qty,
            id:item._id,
        }))
       
    })
}
//get single item
const getItem = async(req,res)=>{
    try{
        const item=await Item.findById(req.params.id)
        if(!item){
        res.status(404).json({
            success: false,
            message: 'Item not found'
        })
    }else{
        res.status(200).json({
            success: true,
            item,
        })
    }
    }
    catch(error){
        res.status(400).json({
          success: false,
          message: 'INVALID ID'
        
        })
}
}
//delete single item
const deleteItem=async(req,res)=>{
    try{
        const item=await Item.findById(req.params.id)
        if(!item){
        res.status(404).json({
            success: false,
            message: 'Item not found'
        })
    }else{
        await item.remove()
        res.status(200).json({
            success: true,
            message:'Item Deleted'
        })
      }
    }
    catch(error){
        res.status(400).json({
          success: false,
          message: 'INVALID ID'
        
        })
   }
}
//update single items
const updateItem = async(req,res)=>{
    try{
        const item = await Item.findById(req.params.id)
        if(!item){
        res.status(404).json({
            success: false,
            message: 'Item not found'
        })
    }else{
       const updatedItem = await Item.findByIdAndUpdate(
           req.params.id,
           req.body,
           {new: true}
       )
        res.status(200).json({
            success: true,
            updatedItem:{
                name: updatedItem.name,
                qty: updatedItem.qty,
                id: updatedItem._id
            }
        })
    }
    }
    catch(error){
        res.status(400).json({
          success: false,
          message: 'INVALID ID'
        })
}
}

//create items
const createItem=async (req,res)=>{
  try {
      const item = await Item.create(req.body)
      res.status(201).json({
          success:true,
          item:{name: item.name,
            qty: item.qty,
            id:item._id,}
      })
  } catch (error) {
      res.status(400).json({
          success:false,
          message:error.message
      })
  }

}
module.exports ={
    getItems,
    createItem,
    getItem,
    deleteItem,
    updateItem,
}

