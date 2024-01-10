export default function getFullUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_Images_API_ENDPOINT;
  return `${baseUrl}${path}`;
}
