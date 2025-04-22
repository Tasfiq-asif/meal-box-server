import { TCustomerProfile } from "./customerProfile.interface"
import CustomerProfile from "./customerProfile.model";



const profile = async (payload: TCustomerProfile): Promise<TCustomerProfile> => {
    const result = await CustomerProfile.create(payload);
    
    return result 
}

const getprofile = async (customerId: string): Promise<TCustomerProfile | null> => {
    const result = await CustomerProfile.findOne({ customerId: customerId });
    // console.log(result,customerId)
    return result ? result.toObject() as TCustomerProfile : null;
}
 
export const customerProfileService = {
    profile,
    getprofile
}