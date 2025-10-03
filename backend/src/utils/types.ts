// Shared types for the backend

// Interface for a User profile stored in Upstash Redis
export interface UserProfile {
  id: string; // Unique ID (UUID) for the user
  telegramId: bigint;
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  profileImageUrl?: string; // URL from Cloudinary or Telegram
  portfolioLinks: string[]; // Array of URLs
  skillsTags: string[]; // Array of strings
  contactUrl?: string;
  isActive: boolean; // For soft delete/ban
  isTopCreator: boolean; // For highlighting
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  // Properties to link to Telegram Channel messages (if using channel for content)
  // For now, we'll store actual content in Redis directly for simplicity and search
  // If we later switch to channel for text content, these would store message IDs
  // e.g., telegramChannelBioMessageId?: number;
  //      telegramChannelPortfolioMessageId?: number;
}

// Interface for an Announcement stored in Upstash Redis
export interface Announcement {
  id: string; // Unique ID (UUID)
  adminTelegramId: bigint;
  title: string;
  body: string;
  link?: string;
  createdAt: string; // ISO date string
}

// Interface for Click analytics stored in Upstash Redis
export interface ClickEvent {
  id: string; // Unique ID (UUID)
  userId: string; // ID of the designer (UserProfile.id)
  eventType: string; // e.g., "message_click"
  source?: string; // e.g., "mini_app_card", "profile_page"
  createdAt: string; // ISO date string
}

// For JWT payloads
export interface AuthTokenPayload {
  userId: string;
  telegramId: bigint;
  isAdmin: boolean;
}