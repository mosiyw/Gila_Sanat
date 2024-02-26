// getFullUrl.js

export default function getFullUrl(apiEndpoint) {
  const baseUrl = import.meta.env.VITE_IMAGE_URL;
  return `${baseUrl}${apiEndpoint}`;
}
