import mongoose , {Schema , Document} from 'mongoose'

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
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },

});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;