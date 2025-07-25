# 🛒 Express.js Product API

A RESTful API built with **Express.js** that allows users to manage a collection of products. It supports full CRUD operations, middleware integration, authentication via API keys, error handling, and advanced features like filtering, pagination, search, and statistics.

---

## 📦 Project Structure

```
express-product-api/
│
├── server.js                   # Entry point for the server
├── routes/
│   └── products.js             # Product-related route handlers
│
├── middleware/
│   ├── logger.js               # Logs each request with timestamp and method
│   ├── auth.js                 # Middleware to check for valid API key
│   ├── validateProduct.js      # Validates incoming product data
│   └── errorHandler.js         # Global error handling middleware
│
├── errors/
│   └── NotFoundError.js        # Custom error for missing resources
│
├── .env.example                # Example environment file
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download) (v18+ recommended)
- A REST client (Postman, Insomnia, or curl)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/express-product-api.git
   cd express-product-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory
   - Copy contents from `.env.example`
   - Set your desired `API_KEY` and `PORT` (optional)

   Example:
   ```env
   API_KEY=123456
   PORT=3000
   ```

4. **Run the Server**
   ```bash
   node server.js
   ```
   The server should start at `http://localhost:3000`

---

##  Authentication

All routes under `/api/products` require an **API key**.

**Header Format:**
```
x-api-key: YOUR_API_KEY
```

If the API key is missing or invalid, the server responds with:
```json
{
  "message": "Unauthorized"
}
```

---

##  API Endpoints

###  Base URL
```
http://localhost:3000/api/products
```

---

###  GET /api/products

**Description**: Fetch all products with optional filtering and pagination.

**Query Parameters**:
| Param     | Type   | Description                    |
|-----------|--------|--------------------------------|
| category  | string | Filter products by category    |
| page      | number | Page number (default: 1)       |
| limit     | number | Results per page (default: 10) |

**Example**:
```
GET /api/products?category=electronics&page=2&limit=5
```

---

###  GET /api/products/:id

**Description**: Get a single product by its `id`.

**Response Example**:
```json
{
  "id": "abc123",
  "name": "Phone",
  "description": "Smartphone",
  "price": 500,
  "category": "electronics",
  "inStock": true
}
```

---

###  POST /api/products

**Description**: Create a new product.

**Request Body**:
```json
{
  "name": "Headphones",
  "description": "Noise-cancelling headphones",
  "price": 150,
  "category": "electronics",
  "inStock": true
}
```

**Validation Errors**:
Returns `400 Bad Request` if any field is missing or invalid.

---

###  PUT /api/products/:id

**Description**: Update an existing product by `id`.

**Request Body**: (Same structure as POST)

Returns `404 Not Found` if the product does not exist.

---

###  DELETE /api/products/:id

**Description**: Delete a product by its `id`.

Returns `204 No Content` on success.

---

###  GET /api/products/search?q=

**Description**: Search for products by name (case-insensitive).

**Example**:
```
GET /api/products/search?q=laptop
```

---

###  GET /api/products/stats

**Description**: Returns the number of products in each category.

**Example Response**:
```json
{
  "electronics": 4,
  "books": 2,
  "clothing": 5
}
```

---

##  Middleware Overview

### 1. Logger Middleware (`middleware/logger.js`)
Logs all incoming requests with timestamp, method, and URL.

### 2. Authentication Middleware (`middleware/auth.js`)
Checks for a valid `x-api-key` in request headers.

### 3. Validation Middleware (`middleware/validateProduct.js`)
Ensures product data includes:
- `name` (string)
- `price` (number)
- `category` (string)
- `inStock` (boolean)

### 4. Global Error Handler (`middleware/errorHandler.js`)
Catches and formats all uncaught errors and returns JSON with status code.

---

##  Error Handling

The app includes custom error classes for clean responses:

| Error Type         | HTTP Status | Description              |
|--------------------|-------------|--------------------------|
| NotFoundError      | 404         | Resource not found       |
| ValidationError    | 400         | Invalid request data     |
| UnauthorizedError  | 401         | Missing/invalid API key  |
| InternalServerError| 500         | Server error             |

Example Error Response:
```json
{
  "error": "Product not found"
}
```

---

## 🔍 Example cURL Commands

```bash
# Get all products
curl -H "x-api-key: 123456" http://localhost:3000/api/products

# Add a new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: 123456" \
  -d '{"name":"TV","description":"Smart TV","price":700,"category":"electronics","inStock":true}'
```

---

## 🤝 Contributing

Contributions are welcome! Open issues or submit a pull request.

---

## 📃 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

Created by **Isaack Mutuma**

---
