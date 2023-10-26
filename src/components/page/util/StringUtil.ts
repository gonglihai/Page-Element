export function isBlank(str: string | null | undefined): boolean {
  return str == '' || str == undefined || str == null
}

export function blankToNull(str: string | null | undefined): string | null {
  return str == '' || str == undefined || str == null ? null : str
}
