

addEventListener("fetch", (event) => {
  console.log((new URL(event.request.url)).path)
  console.log((new URL(event.request.url)).hash)
  event.respondWith(new Response('111111111111', {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
   }))
});
