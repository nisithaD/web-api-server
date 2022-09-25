const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    } ,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    favourites:{
        type:Array,
        default:[]
    },
    wishlist:{
        type:Array,
        default:[]
    },
    cart:{
        type:Array,
        default:[]
    },
    is_admin:{
        type:Boolean,
        default:false
    }

});

const user=mongoose.model('User',userSchema);
module.exports=user;