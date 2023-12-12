
import Employee from './Employee';

interface Record {
  _id: string;
  duration: number;
  date: Date;
  employee: Employee;
}

export default Record;
