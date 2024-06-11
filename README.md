1.Open your terminal or command prompt.
2.Navigate to the directory where you want to store the project.
3.Use the git clone command followed by the repository URL as below:
  "git clone git@github.com:PraveenPolnati/manager_app.git"

4.Navigate into the project directory using cd manager_app.
5.Run npm install to install all the necessary dependencies listed in the package.json file.
6.After the dependencies are installed, run npm start.
7.This command will start the development server and open your default web browser to display the app.
(or) you can also expore the app by visiting "http://localhost:3000/"
8.Once the app is running locally, you can explore its features and functionalities.

Follow the above mentioned steps to explore the app.




1.User Authentication:
  Users can register by providing a username and password. Passwords are hashed using bcrypt before being stored.
  Registered users can log in with their credentials.
  User authentication is managed using JSON Web Tokens (Here the hashed password used as token) stored in cookies.

2.Protected Routes:
  Certain routes, such as the home page, are protected and require authentication. If a user tries to access these routes without logging in, they are redirected to the login page.

3.Registration Page:
  Users can access the registration page (/register) to create a new account.
  Input fields for username and password are provided.
  Error messages are displayed if the username already exists or if any field is left empty.

4.Login Page:
  Registered users can log in using their credentials on the login page (/login).
  Input fields for username and password are provided.
  Error messages are displayed for incorrect usernames or passwords.

5.Home Page:
  After successful authentication, users are redirected to the home page (/).
  The home page displays a list of tasks.
  Users can search for tasks by name using a search input field.
  Tasks can be sorted in ascending or descending order by name.
  Users can add new tasks with a name and description.
  Tasks can be edited (name and description) and deleted.
  State management for tasks is handled using React state and localStorage.
  New tasks are assigned a unique ID using the uuid library.

6.Navbar:
  A navigation bar is displayed at the top of the page.
  It includes the application name and a logout button.
  Clicking the logout button removes the user's JWT from the cookie and redirects them to the login page.

7.Loading Spinner:
  Loading spinners are displayed while fetching data or performing actions to indicate to the user that something is happening.
