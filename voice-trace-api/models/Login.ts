import mongoose , {Schema , Document} from 'mongoose'

const LoginSchema = new Schema({
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
})

export interface ILogin extends Document {
    email: string;
    password: string;
    role: string;
  }
  
const LoginModel = mongoose.model<ILogin>('Login', LoginSchema);
export default LoginModel;