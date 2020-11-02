export function clearTokens() {
  localStorage.clear('access_token');
  localStorage.clear('refresh_token');
}
