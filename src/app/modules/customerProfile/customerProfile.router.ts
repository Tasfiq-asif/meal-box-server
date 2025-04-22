import  express  from 'express';
import { ProfileController } from './customerProfile.controller';

const router = express.Router();


router.post(
  "/customer",ProfileController.profile
);
router.get(
  "/customer/:customerId",ProfileController.getcustomerprofile
);

export const CustomerProfileRouter = router;