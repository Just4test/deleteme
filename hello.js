function handleRequest(request) {
  console.log(request)
  return new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
}
