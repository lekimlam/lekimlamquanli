export interface Account {
  id: string;
  username: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface DiscordAccount {
  id: string;
  discordId: string;
  username: string;
  discriminator: string;
  avatarUrl: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  joinedAt: string;
}
