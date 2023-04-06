import { USER_ENDPOINT } from "../constants/api";
import type { User, UserPost, UserAlbums, UserActivity } from "../types/user";

const fetchUser = async (
  userId: number,
  options?: RequestInit
): Promise<User> => {
  try {
    const response = await fetch(`${USER_ENDPOINT}/${userId}`, {
      method: "GET",
      ...options,
    });
    const user: User = await response.json();
    return user;
  } catch (err) {
    throw err;
  }
};

const fetchUserPosts = async (
  userId: number,
  options?: RequestInit
): Promise<UserPost[]> => {
  try {
    const response = await fetch(`${USER_ENDPOINT}/${userId}/posts`, {
      method: "GET",
      ...options,
    });
    const userPosts: UserPost[] = await response.json();
    return userPosts;
  } catch (err) {
    throw err;
  }
};

const fetchUserAlbums = async (
  userId: number,
  options?: RequestInit
): Promise<UserAlbums[]> => {
  try {
    const response = await fetch(`${USER_ENDPOINT}/${userId}/albums`, {
      method: "GET",
      ...options,
    });
    const userAlbums: UserAlbums[] = await response.json();
    return userAlbums;
  } catch (err) {
    throw err;
  }
};

/**
 * @description fetches user activity: user data, posts and albums
 */
export const fetchUserActivity = async (
  userId: number,
  options?: RequestInit
): Promise<UserActivity> => {
  try {
    const [user, albums, posts] = await Promise.all([
      fetchUser(userId, options),
      fetchUserAlbums(userId, options),
      fetchUserPosts(userId, options),
    ]);

    return {
      ...(user || {}),
      albums: albums,
      posts: posts,
    } as UserActivity;
  } catch (err) {
    throw err;
  }
};
