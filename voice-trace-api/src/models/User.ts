import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      role:String,

});

const UserModel = mongoose.model('User' , UserSchema);
export default UserModel ;

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email:string)=> UserModel.findOne({email});
export const getUserById =(id:string)=> UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user)=> user.toObject());
export const deleteUserById = (id:string)=> UserModel.findByIdAndDelete({_id: id});
export const updateUserById = (id:string ,values: Record<string, any>) => UserModel.findByIdAndUpdate(id , values);

