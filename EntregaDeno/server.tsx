import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";
// @deno-types="https://denopkg.com/soremwar/deno_types/react/v16.13.1/react.d.ts"
import React from "https://jspm.dev/react@17.0.2";
// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server";

const app = createApp();
let arrColor = []


app.handle("/", async (req) => {
  const u = new URL("http://localhost:8050"+req.url);
  arrColor.push(u.searchParams.get('color'))
  let listColors = arrColor.map((element) =>
    <li style={{color:`${element}`,background: 'black'}}>{element}</li>
  );
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
        <html>
            <head>
                <meta charSet="utf-8"/>
                <title>servest</title>
            </head>
            <body>
              <form>
                    <h1>Ingrese Color:</h1>
                    <div className="mb-4">
                            Color
                        <input type="text" name="color"></input>
                        <button type="submit">Ingresar Color</button>
                    </div>
              </form>
              <ul>
                  {listColors}
              </ul>      
            </body>
        </html>                    
    ),
  });
});
app.listen({port: 8050});