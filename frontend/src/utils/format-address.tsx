export function formatAddress(address: string) {
  let addressString = `${address}`;
  if (addressString.length > 43) {
    addressString = addressString.substring(0, 40) + '...';
  }
  return addressString;
}
