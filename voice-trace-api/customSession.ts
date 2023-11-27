import { SessionData } from 'express-session';

interface CustomSession extends SessionData {
  email?: string;
}

export default CustomSession;
