import axios from "axios";

export const spotifyApi = async (accessToken: string, url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized access - token may have expired");
    }
    throw error;
  }
};
