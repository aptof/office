export function getInitials(name: string): string {
  // Split the name by spaces into an array of words
  const words = name.trim().split(/\s+/);

  // Map each word to its first letter and convert to uppercase, then join them
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join('');

  return initials;
}

export interface RouteLink {
  route: string;
  label: string;
}
