#!/bin/bash

# Set the contents of the .env file
echo "SERVER_PORT=3000
DATABASE_HOST=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
SECRET_KEY=thisisyoursecretkey
TOKEN_EXPIRATION=1h" > .env

echo "File created successfully!"
