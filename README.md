## The intent of your visualisation:
- SE Task: To compare which of the two development approaches is better:
	  - Committing often and iterate on it
		- Do a longer process of planning and just write it once.
	- Why is this important? → Efficient use of time for developers
    

-   The original design
	- We started off by defining what is “better” and the speed of development
		- “Better” - Measuring the quality of the code
		- “Speed” - The frequency of commits in a Pull Request (PR)
	- We were interested in seeing the overall trend in a repo for the two different development approaches so we classified PRs into two categories: “slow” and “quick”
    

-   The outcome of your prototype testing
	- We came up with some potential charts and showed them to the users. Although some charts are more informative and shows more statistical information like means and standard deviations, we settled with a scatterplot with best fit line because most users found the other options hard to read or confusing. Our focus is to help developers, hence we aimed for easy-to-read or use graphs.
	- Definition of “Speed” was unclear, as developers seem to automatically associate PRs with merge time. Hence, we refined the definition to number of lines changed per commit and determined the threshold value was 4.
    

-   The new design
	- Finalized axis labels (Y = # of bugs caused, X = days since repo created) and added best fit line legend.
	- Not much difference from what we originally envisioned, except instead of us defining what is considered as "quick", we allowed the user to input a value for that, which is more flexible and generalizable to different project needs.
		- During testing phase, we found that some repositories did not generate meaningful data when the threshold value was set at 4 because all commits had more than 4 lines of change in each commit.
    

-   The outcome of your end-user testing
	- Our visualization was clear, users understood what was going on, 66.7% of users in our second round of user studies agreed that it was a great visualization tool and could clearly see what type of committing habit was good for what types of situations.
 
## Roles

-   Patrick: Data pipeline for fetching data from Github repos
    
-   Candice: Code quality analysis tool setup and configurations
    
-   Andy: Analysis script to combine and convert metadata properties and code quality measurements into usable format for visualization
    
-   Regina and Ruben: Visualization and app hook up for dynamic input and flexibility enhancement

--

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
