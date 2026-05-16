export const getCachedUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setCachedUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

