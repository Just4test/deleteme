import { readLines } from "https://deno.land/std/io/mod.ts";
import { parse } from "https://deno.land/std/encoding/yaml.ts";

function modify(url: URL):string
{
  let sourceURL = (url.pathname + url.search).slice(1)
  console.log('SourceURL', sourceURL)
  let source = (await (await fetch(sourceURL, {headers:{'User-Agent':'Surge'}})).text()).split('\n')
  
  let result: string[] = ['#!MANAGED-CONFIG '+source+' interval=3600 strict=true'];
  let areas: {[key:string]: string[]} = {};
  let area = '';
  areas[area] = []
  
  for(var i of source){
    i = i.trim()
    if(i.length > 2 && i[0] == '[' && i[i.length -1] == ']'){
      area = i
      areas[area] = []
    }else{
      areas[area].push(i)
    }
  }
  delete areas['']
  
  
  let modify = parse(Deno.readTextFileSync('modify.yaml')) as any
  
  let m = modify['push'] as {[key:string]: string[]}
  for(var i in m){
    areas['[' + i + ']'] = areas['[' + i + ']'].concat(m[i])
  }
  
  m = modify['unshift'] as {[key:string]: string[]}
  for(var i in m){
    areas['[' + i + ']'] = m[i].concat(areas['[' + i + ']'])
  }
  
  for(var i in areas){
    result.push(i)
    result = result.concat(areas[i])
  }
  return result.join('\n')
  
}

addEventListener("fetch", (event) => {
  event.respondWith(new Response(modify(new URL(event.request.url)), {
      headers: {
        "content-type": "text/plain; charset=UTF-8",
      },
   }))
});
