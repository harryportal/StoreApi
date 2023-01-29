import { getProducts } from "../openapi/getProducts";

export const swaggerDocument = {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "ECOMMERCE-API DOCS",
      description: "Documentation of E-Commerce API",
      termsOfService: "",
      contact: {
        name: "Kuye Harry",
        email: "dammykuye@gmail.com",
        url: "https://dummyurl.com",
      },
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/api/v1",
        description: "Local server",
      },
      {
        url: "https://your_production_url/api/v1",
        description: "Production Env",
      }
    ],
    paths: {
      "/api/v1/products": {
        get: getProducts,
      },
    },
  };