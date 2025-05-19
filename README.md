# Mongo-DB (Document Database)

## Description

This project is focused on working with MongoDB, a NoSQL database, to manage and query data efficiently.

## Features

- MongoDB setup and configuration
- CRUD operations (Create, Read, Update, Delete)
- Indexing and aggregation examples
- Connection handling and performance optimization.
- Dockerized MongoDB setup with `docker-compose`.
- Pre-configured initialization script for database and collection setup.

## Prerequisites

- MongoDB installed on your system (or use the Docker setup provided).
- Node.js (if using JavaScript for database interaction).
- Mongosh
- Running Docker

## Installation

1. Clone repo
2. Navigate to the project directory:
   ```
   cd mongo-db
   ```
3. Install dependencies - run
   ```
   npm install
   ```

## Usage

### Local MongoDB Setup

1. Start docker
   ```
   docker compose up -d
   ```
2. Run db initialization scripts:
   ```
   node init-mongo init.js
   ```
3. Connect to MongoDB CLI via Mongosh:
   ```
   docker exec -it mongosh mongosh "mongodb://admin:admin@localhost:27017/db?authSource=admin"
   ```
3. Verify the initialization
   ```
   show dbs
   use db
   db.collection.find();
   ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please contact [ineuwelt@neuwelt.co].
