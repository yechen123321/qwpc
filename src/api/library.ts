import axios from "axios";

// 获取图书列表
export async function getBookList() {
  try {
    const response = await axios.get('/library/books');
    return response.data;
  } catch (error) {
    console.error("Error fetching book list:", error);
    throw error;
  }
}

// 获取图书详细信息
export async function getBookDetails(bookId: string) {
  try {
    const response = await axios.get(`/library/book/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
}

// 借阅图书
export async function borrowBook(bookId: string, userId: string) {
  try {
    const response = await axios.post(`/library/book/${bookId}/borrow`, {
      userId: userId
    });
    return response.data;
  } catch (error) {
    console.error("Error borrowing book:", error);
    throw error;
  }
}

// 归还图书
export async function returnBook(bookId: string, userId: string) {
  try {
    const response = await axios.post(`/library/book/${bookId}/return`, {
      userId: userId
    });
    return response.data;
  } catch (error) {
    console.error("Error returning book:", error);
    throw error;
  }
}

// 获取用户的借阅记录
export async function getUserBorrowHistory(userId: string) {
  try {
    const response = await axios.get(`/library/user/${userId}/borrow-history`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user borrow history:", error);
    throw error;
  }
}