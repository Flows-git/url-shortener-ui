export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (typeof body.id === "string" && body.id.length) {
    return $fetch(`statistic/${body.id}`, {
      baseURL: `http://localhost:8080/api/v1/`,
    });
  }
  throw new Error()
});
