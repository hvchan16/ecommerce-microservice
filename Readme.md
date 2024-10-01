# E-commerce Microservices Application Documentation

Welcome to the comprehensive documentation for the E-commerce Microservices Application. This guide provides detailed instructions on how to build, run, and manage the application's Docker containers using Docker and Docker Compose. Additionally, it covers important Docker-specific configurations and considerations to ensure a smooth deployment and operation of the services.

## 1. Project Overview

The E-commerce Microservices Application is a modular and scalable system designed to handle various aspects of an e-commerce platform. It leverages microservices architecture to ensure flexibility, maintainability, and ease of deployment. The application comprises five main services:

- Auth-Service: Manages user authentication and authorization.
- Order-Service: Handles order processing and management.
- Product-Service: Manages product catalog and inventory.
- Mock-Shipping-API: Simulates shipping cost calculations.
- Web-API: Serves as the frontend interface for users.
- Additionally, the application uses Nginx as a reverse proxy to manage traffic routing between services.

## 2. Prerequisites

Before proceeding, ensure that the following tools and technologies are installed on your system:

Docker: Platform for developing, shipping, and running applications in containers.
Docker Compose: Tool for defining and running multi-container Docker applications.
Git: Version control system for tracking changes in source code.

## 3. Project Structure

Understanding the project's structure is crucial for navigating and managing the services effectively. Below is the recommended folder structure:

#### Description of Components:

- Each Service Directory (auth-service/, order-service/, etc.):

- Dockerfile: Defines how to build the Docker image for the service.
- src/: Contains the source code for the service.
  package.json: Manages dependencies and scripts (for Node.js services).
  nginx/:

- Dockerfile: Defines how to build the Docker image for Nginx.
  nginx.conf: Configuration file for Nginx, specifying proxy rules and routing.
  docker-compose.yml: Orchestrates the multi-container application, defining services, networks, and volumes.

- README.md: Project documentation (this file).

## 4. Docker Installation

Ensure Docker and Docker Compose are installed on your system.

a. Install Docker
b. Install Docker compose

## 5. Building Docker Images

Each service in the project has its own Dockerfile that defines how to build its Docker image. Below are the instructions to build Docker images for both backend and frontend services.

#### a. Backend Services

The backend services include auth-service, order-service, product-service, and mock-shipping-api.

Navigate to Each Service Directory:

Open a terminal window and navigate to each backend service directory to build their respective Docker images.

```bash
cd auth-service
docker build -t auth-service:latest .
cd ../order-service
docker build -t order-service:latest .
cd ../product-service
docker build -t product-service:latest .
cd ../mock-shipping-api
docker build -t mock-shipping-api:latest .
cd ..
```

#### b. Frontend Service

The frontend service is represented by web-api.

Navigate to the Frontend Service Directory:

```bash
cd web-api
docker build -t web-api:latest .
cd ..
```

#### c. Nginx Service

Nginx is used as a reverse proxy to manage traffic between the frontend and backend services.

Navigate to the Nginx Directory:

```bash
Copy code
cd nginx
docker build -t ecommerce-nginx:latest .
cd ..
```

## 6. Docker Compose Setup

Docker Compose allows you to define and manage multi-container Docker applications. The docker-compose.yml file orchestrates the setup of all services, including networking and volume configurations.

## 7. Launching Services Using Docker Compose

With the docker-compose.yml file configured, you can now build and run all services simultaneously.

#### a. Build Docker Images Using Docker Compose

Navigate to the Project Root Directory:

```bash
cd ecommerce-microservices
docker-compose build
```

#### b. Launch Services Using Docker Compose

```bash
docker-compose up -d
```

## 8. Accessing the Web Application

Once all services are up and running, you can access the web application through your web browser.

#### a. Accessing via Browser

1. Open Your Web Browser:

Launch your preferred web browser (e.g., Chrome, Firefox).

2. Navigate to the Application:

Enter the following URL in the address bar:

```arduino
http://localhost
```

3. Verify Application Accessibility:

Frontend Application: You should see the frontend interface of your e-commerce platform.

## Conclusion:

In conclusion, the E-commerce Microservices Application offers a robust and scalable solution by modularizing key functionalities into five distinct services: auth-service, order-service, product-service, mock-shipping-api, and web-api, all seamlessly orchestrated with Nginx. Utilizing Docker and Docker Compose ensures that setting up and running the application locally is straightforward and consistent across different environments. By following the provided instructions, developers can effortlessly build Docker images, launch all services with a single command, and access the web application through their browser. This streamlined workflow not only accelerates development and testing but also lays a solid foundation for future scalability and deployment. Whether you're a developer looking to contribute or a stakeholder aiming to understand the system, this setup facilitates an efficient and effective way to manage and interact with the entire application locally.
