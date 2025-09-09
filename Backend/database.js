import mongoose,{Schema} from 'mongoose'

const userSchema=new Schema({
    id:String,
    url:String,
    username:String,
    password:String
},{collection:"Password"})

const password=mongoose.model('password',userSchema)
export default password;