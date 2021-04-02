

addEventListener("fetch", (event) => {
  console.log(event.request.url)
  event.respondWith(new Response('111111111111', {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
   }))
});
