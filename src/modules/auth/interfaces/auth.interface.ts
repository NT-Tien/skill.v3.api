import { PayloadTokenDto } from "./dto/payload-token.dto";
import { RegisterDataDto } from "./dto/register-data.dto";

export interface AuthInterface {
    // Register a new account for user
    register(data: RegisterDataDto): Promise<any>;
    // Login with email and password
    login(email: string, password: string): Promise<any>;
    // Generate a new token
    generateToken(payload: PayloadTokenDto): Promise<string>;
    // Verify a token
    verifyToken(token: string): Promise<boolean>;
    // Verify a token for admin
    verifyAdminToken(token: string): Promise<boolean>;
    // Verify a token from firebase
    verifyFirebaseToken(token: string): Promise<any>;
    // Get PayloadToken from token
    decodeToken(token: string): Promise<PayloadTokenDto>;
}