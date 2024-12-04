export function getHashQuery(): URLSearchParams | undefined {
  const hash = window.location.hash;
  if (hash.length > 1) {
    try {
      const hashQuery = new URLSearchParams(hash.substring(1));
      return hashQuery;
    } catch (e) {
      /* ignore */
    }
  }
  return undefined;
}

export function setHashQueryParam(paramName: string, paramValue: string | null): void {
  const hashQuery = getHashQuery() ?? new URLSearchParams();
  if (paramValue) {
    hashQuery.set(paramName, paramValue);
  } else {
    hashQuery.delete(paramName);
  }
  window.location.hash = hashQuery.toString();
}
