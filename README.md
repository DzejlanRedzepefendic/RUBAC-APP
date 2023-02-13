# RuBAC

## Running the Application

To run the application using Docker and Docker Compose, follow these steps:

1.  Clone the repository:

    ```
    git clone https://https://github.com/DzejlanRedzepefendic/RUBAC-APP
    ```

2.  Navigate to the project directory:

    ```
    cd RUBAC-APP
    ```

3.  Build the Docker image:

    ```
    docker-compose build
    ```

4.  Start the container:

        ```
        docker-compose up -d
        ```

    The application should now be running in a Docker container and accessible at `http://localhost:8000`.

## Stopping the Container

To stop the container, press `CTRL + C` in the terminal or run the following command:
`    docker-compose down
   `

## Running the Tests

To run the tests, follow these steps:

1. Install the required dependencies:

   ```
   npm install
   ```

2. Run the tests:
   ```
   npm run test
   ```
