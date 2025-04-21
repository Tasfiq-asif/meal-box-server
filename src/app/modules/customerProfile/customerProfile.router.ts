import  express  from 'express';
import { ProfileController } from './customerProfile.controller';

const router = express.Router();


router.post(
  "/customer",ProfileController.profile
);

export const CustomerProfileRouter = router;