export function getErrorMessage(error, fallback = "Something went wrong.") {
  const data = error?.response?.data;
  if (typeof data === "string") return data;
  if (data?.message) return data.message;
  if (data && typeof data === "object") return Object.values(data).join(" ");
  return fallback;
}
