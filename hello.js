addEventListener("fetch", (event) => {
  console.log(event)
  const response = new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
  event.respondWith(response);
});
