import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import 'dotenv/config';

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN || '',
  },
});
