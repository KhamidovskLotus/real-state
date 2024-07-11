type User = {
  id: number;
  username: string;
  role: 'agent' | 'client';
  otp: number;
  phone: string;
  user_profile: string | null;
};
