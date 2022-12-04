import { URL } from '~~/interfaces/URL';

export default defineEventHandler(async (event) => {
  const body = await readBody<URL>(event);
  if (typeof body.user === "string" && body.user.length && typeof body.url === "string" && body.url.length) {
    return $fetch(`urls/${body.user}`, {
      baseURL: `http://localhost:8080/api/v1/`,
      method: "POST",
      body: body.url,
    });
  };
  throw new Error("User or URL not set")
});
