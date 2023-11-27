import mongoose , {Schema , Document} from 'mongoose'
import UserModel from './UserSchema';

const EmployeeModel = UserModel.discriminator('Employee', new mongoose.Schema({
    records: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Records'
    }]
}));

export default EmployeeModel;