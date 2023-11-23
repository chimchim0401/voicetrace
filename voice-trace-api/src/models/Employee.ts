import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
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
      records: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Records'
    }]

});

const EmployeeModel = mongoose.model('Employee' , EmployeeSchema);


export default EmployeeModel;

export const getEmployees = () => EmployeeModel.find();
export const getEmployeeByEmail = (email: string) => EmployeeModel.findOne({ email });
export const getEmployeeById = (id: string) => EmployeeModel.findById(id);
export const createEmployee = (values: Record<string, any>) => new EmployeeModel(values).save().then((employee) => employee.toObject());
export const deleteEmployeeById = (id: string) => EmployeeModel.findByIdAndDelete({ _id: id });
export const updateEmployeeById = (id: string, values: Record<string, any>) => EmployeeModel.findByIdAndUpdate(id, values);
