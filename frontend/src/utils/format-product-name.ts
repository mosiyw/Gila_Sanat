export default function formatProductName(name: string): string {
  // Replace all spaces with hyphens
  let formattedName = name.replace(/ /g, '-');

  return formattedName;
}
