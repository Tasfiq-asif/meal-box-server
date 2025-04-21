import { TCustomerProfile } from "./customerProfile.interface"
import CustomerProfile from "./customerProfile.model";



const profile = async (payload: TCustomerProfile): Promise<TCustomerProfile> => {
    const result = await CustomerProfile.create(payload);
    return result 
}

export const customerProfileService = {
    profile,
}