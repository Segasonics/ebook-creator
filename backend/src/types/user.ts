export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  isPro: boolean;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
  generateToken(id: string): string;
}
