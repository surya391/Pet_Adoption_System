import { model, Schema } from "mongoose"

const tokenSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'User',
        unique: true,
    },
    token: {
        type: String, 
        required: true
    }
    },{timestamps: true})

const Token = model('Token',tokenSchema);
export default Token