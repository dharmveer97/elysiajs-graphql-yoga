import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import { typeDefs, resolvers } from "./utils/graphql";

// Define the app
const app = new Elysia()
  .get("/", () => "Hello Visit /graphql")
  //  GraphQL Yoga with Elysia
  .use(
    yoga({
      typeDefs,
      resolvers,
      context: {
        name: "Mobius",
      },
    }),
  )

  // Start the server on port 3000
  .listen(3000);

// Log server details
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}/graphql`,
);
