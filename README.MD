#  twc Test api
Api consitsting of the different operations


## Get started

Open a terminal and clone this repo:

```bash
# Clone this repository
$ git clone https://github.com/Yehan20/twc-test-api.git

# Go into the repository
$ cd twc-test-api

# Remove current origin repository
$ git remote remove origin

# If you want, you can add a new remote repository
$ git remote add origin https://github.com/<your-github-username>/<your-repo-name>.git
```

Go to the project   folder, and create a `.env` file. Add the following environment variables with your own values:

```dosini
ACCESS_TOKEN_SECRET_KEY= Your key

REFRESH_TOKEN_SECRET_KEY=Your key

COOKIE_SECRET_KEY = Your key

MONGODB_CONNECTION_KEY =  Your Key
```

You can conntect to local mongo db or use a  online cluster <br />

Once you have created a local database, open up two terminals - one for the server, and one for the client:

```bash
# Terminal for the server
# cd into the server folder

# Install dependencies
$ npm install

# Install nodemon if you don't have it
# You can either install it globally, or locally only for this project (remove the -g flag)
npm install nodemon -g

# run the server
$ npm run devStart
```

```bash
# Terminal for the client
# cd into the client folder
$ cd client

# Install dependencies
$ npm install

# run the client app
$ npm start
```

Change the port number with any prefered port and then the server would run
