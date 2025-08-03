const { VITE_URL_BACKEND_API } = import.meta.env;

export const environments = () => ({
  VITE_URL_BACKEND_API,
  USER_TOKEN: 'userToken',
});
