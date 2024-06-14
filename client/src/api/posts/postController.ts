import { Comment } from "./commentController";
export interface Post {
  _id: string;
  title: string;
  author: string;
  body: string;
  date: Date;
  updated?: Date;
  comments: Comment[];
}

export interface ErrorMessage {
  message: string;
}

export function isErrorMessage(
  data: Post | ErrorMessage | Post[]
): data is ErrorMessage {
  return (data as ErrorMessage).message !== undefined;
}

export const getPost = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
      next: { revalidate: 30 },
    });
    const data: Post | ErrorMessage = await response.json();

    if (!response.ok) {
      if (isErrorMessage(data))
        throw new Error(`Fetching error: ${data.message}`);
      else throw new Error(`Fetching error: ${response.status}`);
    }
    if (!isErrorMessage(data)) return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return null;
};
export const addPost = async (token: string, title: string, body: string) => {
  try {
    const response = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    const data: Post | ErrorMessage = await response.json();
    if (!response.ok) {
      if (isErrorMessage(data))
        throw new Error(`Fetching error: ${data.message}`);
      else throw new Error(`Fetching error: ${response.status}`);
    }

    if (!isErrorMessage(data)) return data._id;
  } catch (error) {
    console.error(error);
  }
};
export const getPosts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/posts", {
      next: { revalidate: 30 },
    });

    const data: Post[] | ErrorMessage = await response.json();
    if (!response.ok) {
      if (isErrorMessage(data))
        throw new Error(`Fetching error: ${data.message}`);
      else throw new Error(`Fetching error: ${response.status}`);
    }
    if (!isErrorMessage(data)) return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return [];
};
export const getUserPosts = async (userID: string) => {
  try {
    const response = await fetch("http://localhost:5000/api/posts", {
      next: { revalidate: 30 },
    });

    const data: Post[] | ErrorMessage = await response.json();
    if (!response.ok) {
      if (isErrorMessage(data))
        throw new Error(`Fetching error: ${data.message}`);
      else throw new Error(`Fetching error: ${response.status}`);
    }
    if (!isErrorMessage(data))
      return data.filter((post: Post) => post.author === userID);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return [];
};

export const editPost = async (
  token: string,
  post: { _id: string; title: string; body: string }
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/posts/${post._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }
    );

    if (!response.ok) {
      const data: ErrorMessage = await response.json();
      if (isErrorMessage(data))
        throw new Error(`Fetching error: ${data.message}`);
      else throw new Error(`Fetching error: ${response.status}`);
    }

    return;
  } catch (error) {
    console.error(error);
  }
  return;
};
export const deletePost = async (token: string, id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data: ErrorMessage = await response.json();
      if (isErrorMessage(data))
        throw new Error(`Fetching error: ${data.message}`);
      else throw new Error(`Fetching error: ${response.status}`);
    }

    return;
  } catch (error) {
    console.error(error);
  }
  return;
};
