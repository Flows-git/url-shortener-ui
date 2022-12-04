export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (typeof body.user === "string" && body.user.length) {
    return $fetch(`urls/${body.user}`, {
      baseURL: `http://localhost:8080/api/v1/`,
      method: "GET",
    });
  }
  throw new Error()
});
