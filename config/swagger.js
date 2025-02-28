const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bartender Social API",
      version: "1.0.0",
      description: "Tài liệu API cho ứng dụng mạng xã hội Bartender",
    },
    servers: [{ url: "http://localhost:3000", description: "Local server" }],
  },
  apis: ["./models/*.js", "./routes/*.js"], // Đọc API từ model và routes
};

const swaggerOptions = {
  defaultModelsExpandDepth: 3, // Ẩn models bên trái
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { swaggerOptions })
  );
};

module.exports = swaggerDocs;
