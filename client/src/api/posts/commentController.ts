import { ErrorMessage, Post, isErrorMessage } from "./postController";

export interface Comment {
  _id: string;
  author: string;
  username: string;
  body: string;
  date: Date;
  updated?: Date;
}

export const editComment = async (
  token: string,
  id: string,
  commentID: String,
  comment: string,
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/posts/${id}/${commentID}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: comment }),
      },
    );

    const data: Post | ErrorMessage = await response.json();

    if (!response.ok) {
      if (isErrorMessage(data))
        throw new Error(`Fetching error: ${data.message}`);
      else throw new Error(`Fetching error: ${response.status}`);
    }
    if (!isErrorMessage(data)) return data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const deleteComment = async (
  token: string,
  id: string,
  commentID: String,
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/posts/${id}/${commentID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: commentID }),
      },
    );

    const data: Post | ErrorMessage = await response.json();

    if (!response.ok) {
      if (isErrorMessage(data))
        throw new Error(`Fetching error: ${data.message}`);
      else throw new Error(`Fetching error: ${response.status}`);
    }
    if (!isErrorMessage(data)) return data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
export const addComment = async (
  token: string,
  id: string,
  comment: string,
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/posts/${id}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: comment }),
      },
    );

    const data: Post | ErrorMessage = await response.json();

    if (!response.ok) {
      if (isErrorMessage(data))
        throw new Error(`Fetching error: ${data.message}`);
      else throw new Error(`Fetching error: ${response.status}`);
    }
    if (!isErrorMessage(data)) return data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
