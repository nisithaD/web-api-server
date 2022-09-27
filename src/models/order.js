const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const orderSchema=new Schema({
    user_id:{
        type:String,
        required:true
    },
    restaurant_id:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    is_completed:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const user=mongoose.model('User',userSchema);
module.exports=user;