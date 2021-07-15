## Install

To test the app, please follow the next steps:

### Clone this repo

`git clone https://github.com/adj87/kwhapp-backend.git`

### Run app

1. Install app dependences:

    ```sh
    npm i
    ```

2. Run app:

    ```sh
    npm start
    ```

3. (Optional)Seed data into the database :

    ```sh
    npm run seed-data
    ```
4. Test the app in your browser `http://localhost:3001/consumptions`.

> Note 1: Step 3 can be permormed from the frontend app. Npm run seed-data will import the data from `consumo-2018-12.csv`

> Note 2: The database-connection-url is in the mongooseConnect.js file. It points to a free db I have online. If you have problems, go to mongooseConnect.js file and set yours.Then, run it up back by executing npm start

> Note 3: In the database model(consumption), there is a unique key with date and time. That means there can't be two rows with the same time and same date.

> Note 4: The api endpoints are in routes/consumptions.

### Enjoy
