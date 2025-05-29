export type UserType = {
  id: number | string;
  name: string;
  email: string;
  username: string;
  password?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  session_id?: string;
};
