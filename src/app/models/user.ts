export class User{
  user_id: number;
  username: string = "default";
  email: string;
  password: string;
  confirmPassword: string;
  totalScore: number;
  createdAt: Date;
  updatedAt: Date;
}
