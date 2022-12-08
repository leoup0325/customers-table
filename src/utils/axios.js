export const parseAxiosError = (error, t) => {
  if (!error) return null;
  if (error.response) {
    // Request made and server responded
    return JSON.stringify(error.response.data);
  } else if (error.request) {
    return t("error.server");
  } else {
    // Something happened in setting up the request that triggered an Error
    return t("error.unknown");
  }
};
