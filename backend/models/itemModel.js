const mongoose=require('mongoose')
const itemSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,'Item name is required'],
        },
        qty:{
            type: String,
            required: [true,'Item quentity is required'],
        },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('Item',itemSchema)