

addEventListener("fetch", (event) => {
  event.respondWith(new Response(await modify(new URL(event.request.url)), {
      headers: {
        "content-type": "text/plain; charset=UTF-8",
      },
   }))
});
