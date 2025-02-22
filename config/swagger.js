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
  apis: ["./routes/*.js"], // Đọc API từ file router
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
