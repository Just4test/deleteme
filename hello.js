

addEventListener("fetch", (event) => {
  let url = new URL(event.request.url)
  console.log("URL", url)
  console.log(url.pathname+url.search)
  event.respondWith(new Response('111111111111', {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
   }))
});
