import { Redis } from '@upstash/redis';
// dotenv is loaded via --import or index.ts, no need here
import { UserProfile, Announcement, ClickEvent } from '../utils/types.js'; // .js extension

const REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!REDIS_REST_URL || !REDIS_REST_TOKEN) {
  console.error('UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is not set in environment variables.');
  throw new Error('Upstash Redis credentials are required.');
}

export const redis = new Redis({
  url: REDIS_REST_URL,
  token: REDIS_REST_TOKEN,
});

// Helper functions for common Redis operations

/**
 * Stores a user profile.
 * Key format: user:<telegramId>
 */
export const setUserProfile = async (profile: UserProfile): Promise<void> => {
  if (!profile.telegramId) {
    throw new Error('UserProfile must have a telegramId to be stored.');
  }
  // Convert BigInt to string for JSON serialization
  const profileToStore = { ...profile, telegramId: profile.telegramId.toString() };
  await redis.set(`user:${profile.telegramId}`, JSON.stringify(profileToStore));
};

/**
 * Retrieves a user profile by Telegram ID.
 */
export const getUserProfile = async (telegramId: bigint): Promise<UserProfile | null> => {
  const data = await redis.get<string>(`user:${telegramId}`);
  if (!data) return null;
  const profile = JSON.parse(data) as UserProfile;
  // Convert telegramId string back to BigInt
  return { ...profile, telegramId: BigInt(profile.telegramId.toString()) };
};

/**
 * Stores an announcement.
 * Key format: announcement:<id>
 */
export const setAnnouncement = async (announcement: Announcement): Promise<void> => {
  if (!announcement.id) {
    throw new Error('Announcement must have an ID to be stored.');
  }
  // Convert BigInt to string for JSON serialization
  const announcementToStore = { ...announcement, adminTelegramId: announcement.adminTelegramId.toString() };
  await redis.set(`announcement:${announcement.id}`, JSON.stringify(announcementToStore));
};

/**
 * Retrieves an announcement by ID.
 */
export const getAnnouncement = async (id: string): Promise<Announcement | null> => {
  const data = await redis.get<string>(`announcement:${id}`);
  if (!data) return null;
  const announcement = JSON.parse(data) as Announcement;
  // Convert adminTelegramId string back to BigInt
  return { ...announcement, adminTelegramId: BigInt(announcement.adminTelegramId.toString()) };
};

/**
 * Stores a click event.
 * Key format: click:<id>
 */
export const setClickEvent = async (click: ClickEvent): Promise<void> => {
  if (!click.id) {
    throw new Error('ClickEvent must have an ID to be stored.');
  }
  await redis.set(`click:${click.id}`, JSON.stringify(click));
};