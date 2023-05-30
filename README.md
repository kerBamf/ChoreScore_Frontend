# Project 3: JOYERN

JOYERN is a full MERN-stack app designed to gamify chores and other tasks. When a user creates a task, they define an estimated duration (in minutes) and choose a relative difficulty from 1-4. Based on those factors, a value is assigned to the task which the user can see once the task is created. Once a user clicks "Completed," the task is deleted from the task list and the value of the task is added to the number of credits the user has gained. 
A "task completed" counter also shows how many total tasks the user has completed. By clicking on the name of the task, the user can choose to either edit or delete any given task from their list. Task value is reevaluated after any changes are made.

When clicking on the "Rewards" button, all previously defined rewards are listed. When creating a new reward, the user defines the cost as they choose. Once created, a reward appears with a "Purchase" button which detracts the cost from the user's total credits when clicked. Should a reward cost more credits than the user has available, the "Purchase" button disappears, and in its place is a prompt indicating that the user does not have enough points. Just as with the tasks, rewards can be edited or deleted by clicking on the name of the reward.

In order to use the app, the user needs to sign in or create a new account. JOYERN uses authentication/authorization to keep track of an individual user's tasks, rewards, credits, and number of tasks completed. Should the user navigate to the home page without having signed in, all main controls disappear and the user is prompted to sign-in.

## Tech and Build Approach

As previously stated, JOYERN is a MERN app. React-Bootstrap is utilized for most of the styling with custom CSS as needed, and token-based auth is utilized to facilitate user login.

The heart of the app is the task and reward list. Each are dynamically loaded as they are created and are tied to a user account via Mongo user-ID referencing when sending requests to the back-end. I wanted each task and reward to be self-contained, meaning most of the functionality for each would reside within each task as it appears; this would mean less navigation on the part of the user and a more concise interface.