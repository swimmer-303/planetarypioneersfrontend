export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  // Ensure single slash between base and path
  if (!path.startsWith('/')) return `${base}/${path}`
  return `${base}${path}`
}


