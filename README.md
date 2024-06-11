


User Authentication:
  Users can register by providing a username and password. Passwords are hashed using bcrypt before being stored.
  Registered users can log in with their credentials.
  User authentication is managed using JSON Web Tokens (Here the hashed password used as token) stored in cookies.

Protected Routes:
  Certain routes, such as the home page, are protected and require authentication. If a user tries to access these routes without logging in, they are redirected to the login page.

Registration Page:
  Users can access the registration page (/register) to create a new account.
  Input fields for username and password are provided.
  Error messages are displayed if the username already exists or if any field is left empty.

Login Page:
  Registered users can log in using their credentials on the login page (/login).
  Input fields for username and password are provided.
  Error messages are displayed for incorrect usernames or passwords.

Home Page:
  After successful authentication, users are redirected to the home page (/).
  The home page displays a list of tasks.
  Users can search for tasks by name using a search input field.
  Tasks can be sorted in ascending or descending order by name.
  Users can add new tasks with a name and description.
  Tasks can be edited (name and description) and deleted.
  State management for tasks is handled using React state and localStorage.
  New tasks are assigned a unique ID using the uuid library.

Navbar:
  A navigation bar is displayed at the top of the page.
  It includes the application name and a logout button.
  Clicking the logout button removes the user's JWT from the cookie and redirects them to the login page.

Loading Spinner:
  Loading spinners are displayed while fetching data or performing actions to indicate to the user that something is happening.
