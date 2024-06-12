export interface Post {
  _id: string;
  title: string;
  author: string;
  body: string;
  date: Date;
  updated: Date;
  message?: string;
}

export const getPost = async (token: string, id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data: Post = await response.json();
    if (data.body === undefined) {
      throw new Error(`Fetching error: ${data.message}`);
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return null;
};
export const addPost = async (
  token: string,
  title: string,
  body: string,
  author: string
) => {
  try {
    const response = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, author }),
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
export const getPosts = async (token: string) => {
  try {
    const response = await fetch("http://localhost:5000/api/posts", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data: Post[] = await response.json();
    if (data === undefined) {
      throw new Error(`Fetching error`);
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return [];
};
