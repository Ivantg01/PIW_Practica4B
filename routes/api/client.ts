import { Handlers } from "$fresh/server.ts";

import { createClient, deleteClient, fetchClients } from "../../utils/db.ts";

export const handler: Handlers = {
  async GET(_, _ctx) {
    console.log("GET /api/client");

    try {
      const data = await fetchClients();

      return new Response(JSON.stringify(data), {
        headers: {
          "content-type": "application/json",
        },
      });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
  },
  async POST(_req, _ctx) {
    console.log("POST /api/client");

    const body = await _req.json();

    try {
      const data = await createClient({
        ...body,
        id: crypto.randomUUID(),
      });

      return new Response(JSON.stringify(data), {
        headers: {
          "content-type": "application/json",
        },
      });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
  },
  async DELETE(_req, _ctx) {
    console.log("DELETE /api/client");

    const url = new URL(_req.url);

    const id = url.searchParams.get("id");

    try {
      await deleteClient(id ?? "");

      return new Response("Deleted", {
        headers: {
          "content-type": "text/plain",
        },
      });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
  },
};
