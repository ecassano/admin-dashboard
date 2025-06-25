export const parseDateAsLocal = (isoString: string): Date => {
  const clean = isoString.replace(/T.*$/, '')
  return new Date(`${clean}T00:00:00`)
}
