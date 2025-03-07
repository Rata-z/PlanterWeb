import { ErrorMessage } from "./posts/postController";

export interface Plant {
  frequencyFrom: number;
  frequencyTo: number;
  icon: string | null;
  insolation: string;
  lastWateringDate: string;
  nextWateringDate: string;
  plantId: string;
  title: string;
}

export function isErrorMessage(
  data: Plant | ErrorMessage | Plant[],
): data is ErrorMessage {
  return (data as ErrorMessage).message !== undefined;
}

export const getPlants = async (token: string) => {
  try {
    const response = await fetch(`https://planter-web.fly.dev/api/plants`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 15 },
    });
    const data: Plant[] | ErrorMessage = await response.json();
    console.log(data);
    if (!response.ok) {
      if (isErrorMessage(data))
        throw new Error(`Fetching error: ${data.message}`);
      else throw new Error(`Fetching error: ${response.status}`);
    }
    if (!isErrorMessage(data)) return data;
  } catch (e) {
    console.error("Error while fetching data: ", e);
  }
  return [];
};
