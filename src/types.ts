export interface Account {
  id: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface DiscordAccount {
  id: string;
  discordId: string;
  username: string;
  password?: string;
  discriminator: string;
  avatarUrl: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  joinedAt: string;
}
