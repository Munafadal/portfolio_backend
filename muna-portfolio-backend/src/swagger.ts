import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const routeDocGlobs = [
  path.join(process.cwd(), "src", "routes", "*.ts"),
  path.join(process.cwd(), "dist", "routes", "*.js"),
];

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Muna Portfolio API",
      version: "1.0.0",
      description: "API documentation for the portfolio backend",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: routeDocGlobs,
});
