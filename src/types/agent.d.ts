type Agent = {
  id: number;
  username: string;
  email: string;
  role: string;
  phone: number;
  isVerified:boolean;
  city: string | null;
  languages: string | null;
  user_profile?: string;
};

type AgentSaveList = {
  id: number;
  agent: Agent;
  user: number;
}
