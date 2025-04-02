import axios from "axios";

// 搜索图书
export async function searchBooks(query: string) {
  try {
    const response = await axios.get('/library/search/books', {
      params: {
        q: query
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
}

// 搜索用户
export async function searchUsers(query: string) {
  try {
    const response = await axios.get('/library/search/users', {
      params: {
        q: query
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
}

// 搜索位置
export async function searchLocations(query: string) {
  try {
    const response = await axios.get('/map/search', {
      params: {
        q: query
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error searching locations:", error);
    throw error;
  }
}