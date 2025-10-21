import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN || 'eyJhcGlLZXkiOiJza19saXZlX2U2Mjc5NDQyNWFiNzEwZGEzMDVmY2Q0ZDY3YjEzMTJhY2M4MmExZjZhZDAwNTU1ZmM0Mjc3NjM2MzMwOWU0YTMiLCJhcHBJZCI6Im1jN3FodHlmMDUiLCJyZWdpb25zIjpbInNlYTEiXX0=',
  },
});
