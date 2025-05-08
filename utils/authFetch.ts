// utils/authFetch.ts
export const authFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = sessionStorage.getItem("token");

  const authHeaders = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: authHeaders,
  });

  return response;
};
