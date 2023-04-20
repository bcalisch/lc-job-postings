# lightcast job postings app

To run, make sure to fill the `.env` file with the appropriate credentials.  Since this is a public repository, I decided it would probably be best to hide the base URL.  Then run `npm start`
I had 8 hours to learn 2.5 new technologies (React, Observable Plot, and Jest) and implement the functionality in the specs.  I admit that I failed to finish the graph (it looks like my 3 year old brought her artistic talents to the party).  The rankings tables also do not have the stylings finished, though all of the data does display at this point.

I attempted to do the entire project using TDD, and was able to make it pretty far down that path.  Around the last hour I realized I had to boogie and abandoned that effort in order to get as much of the brief completed as possible.

### Left TODO
* Fix Graph to actually show the data properly
* Style graph and table according to the mock-up
* Handle errors more gracefully
* Store the token in local storage and refresh only when necessary (currently it gets a new token on every refresh).
* Finish tests
* refactor api-client (I don't like the copius checks).
* other cleaning up throughout the app.
* make the timeline dynamically choose the last 30 days.
* Add a search box
* Add a date picker 


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

