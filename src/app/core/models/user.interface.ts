export interface User {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: 'admin' | 'user' | string;
    verified: boolean;
    passwordResetVerified: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    passwordChangeAT?: string;
    wishList: string[];
    addresses:  {
        street: string;
        city: string;
        phone: string;
        _id: string;
      };
    whatsappNumber: string; 
}
