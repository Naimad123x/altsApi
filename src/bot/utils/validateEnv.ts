export const validateEnv = () => {
  if (!process.env.TOKEN) {
    console.warn("Missing Discord bot token.");
    return false;
  }

  // if (!process.env.CLIENT_ID) {
  //   console.warn("Missing Discord bot ID.");
  //   return false;
  // }
  return true;
};