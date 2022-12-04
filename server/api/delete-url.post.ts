export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (typeof body.user === "string" && body.user.length && typeof body.id === "string" && body.id.length) {
    return $fetch(`urls/${body.user}/${body.id}`, {
      baseURL: `http://localhost:8080/api/v1/`,
      method: "DELETE",
    });
  }
  throw new Error()
});
