import axios from "axios";

// 获取用户信息
export async function getUserInfo(userId: string) {
  try {
    const response = await axios.get('/user', {
      params: {
        ID: userId
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}

// 获取用户账户信息
export async function getUserAccount(userId: string) {
  try {
    const response = await axios.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user account:", error);
    throw error;
  }
}

// 获取用户权限信息
export async function getUserPermissions(userId: string) {
  try {
    const response = await axios.get(`/user/${userId}/permissions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user permissions:", error);
    throw error;
  }
}

// 获取用户信息和权限信息
export async function fetchUserData(userId: string) {
  try {
    const [account, permissions] = await Promise.all([
      getUserAccount(userId),
      getUserPermissions(userId)
    ]);
    return { account, permissions };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  } finally {
    console.log("Request completed");
  }
}