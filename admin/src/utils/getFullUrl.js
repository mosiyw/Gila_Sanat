// getFullUrl.js

export default function getFullUrl(apiEndpoint) {
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  return `${baseUrl}${apiEndpoint}`;
}
