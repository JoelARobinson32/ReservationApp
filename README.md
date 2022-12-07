# Restaurant Reservation System: The Final Meal
An application for managing a restaurant, allowing the user to handle reservations, tables, and seating.

## Resources
Created on the PERN stack: PostgreSQL, Express, React, Node.js
Also Included are Knex, Bootstrap, and CSS.

## Installation

Fork and clone this repository
Run 'npm install' from the root directory to install dependencies.
Run 'npm run start:dev' from the back-end folder to run the development server locally.
Run 'npm start' from the front-end folder to run the application locally.

## Back End

### Available routes
`/reservations`.get Retrieves reservations based on current date
`/reservations`.post Adds a reservation
`/reservations?date=YYYY-MM-DD`.get Retrieves reservations based on entered date
`/reservations/:reservation_id`.get Retrieves a reservation by id.
`/reservations/:reservation_id`.put Updates a reservation by id.
`/reservations/:reservation_id/status`.put Changes a reservation status by id..
`/tables`.get Retrieves tables.
`/tables`.post Adds a table.
`/tables/:table_id/seat`.put Seats a reservation at a table.
`/tables/:table_id/seat`.delete Clears a reservation from a table.

### Database Tables

There are two tables used in the database.

#### Reservations
Keys:
reservation_id
first_name
last_name
mobile_number
reservation_date
people
status

#### Tables
Keys:
table_id
table_name
capacity
reservation_id

## Features

### Home
Use the home page to view and manage current reservations. Adjust the date to find reservations for the day, edit them, delete them, or seat them. 

On the Tables list you can clear currently occupied tables.

### Search
Search for a customer by phone number and find any reservations they have.

### New Reservation
This page takes you to a reservation form that allows you to enter a new reservation into the database by entering all required information. To instead edit an existing reservation, either search from the search page or find the reservation on the home page. The edit button will bring up the same form and allow changes.

### New Table
This page brings you to a form that allows you to add a new table to your list of options.

## Deployed Examples

### Server 
https://reservationappbyjoelbackend.onrender.com

### Application
https://reservationappbyjoelfrontend.onrender.com
