export interface SignupData {
  name: string;
  number: number;
  password: string;
}

export interface LoginData {
  number: number;
  password: string;
}

export interface IRate {
  shopId: any;
  goldH: number;
  goldG: number;
  silver: number;
  cbSilver: number;
  expireAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  shopId: any;
  name: string;
  folderPath: string;
  thumbnail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IShop {
  name: string;
  address: string;
  folderPath: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMedia {
  shopId: any;
  name: string;
  categoryId: any;
  fileId: string;
  saved: boolean;
  publicUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ISaved {
  userId: any;
  mediaId: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAuth {
  shopId: any;
  isAdmin: boolean;
  name: string;
  number: number;
  password: string;
  otpValidation: boolean;
  resetSessionExpiry: Date;
  otpHash: string;
  otpExpiry: Date;
  accessToken: string;
  createdAt?: Date;
  updatedAt?: Date;
}
