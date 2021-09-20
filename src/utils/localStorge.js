export function getLoginData() {
  return JSON.parse(localStorage.getItem("userData"));
}
