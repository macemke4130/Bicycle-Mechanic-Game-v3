## Highlights

- All correct answers are loaded from a MySQL Database through a GraphQL API into an array before the game begins. The array is then shuffled and a timer begins.

- Multiple choice options are loaded just in time after each correct answer.

- Photo sets are loaded two ahead in the future after each correct answer. First three photo sets are loaded on game start.

- Multiple choice options are shuffled on load and set to State.

- An incorrect answer ends the game. The timer hitting zero ends the game. Answering 100% of the questions is a game win.

- At game end, stats are collected from the user and inserted into a stats table in the database including:
    - Type of game end (win, timeover, wrong selection)
    - Average seconds to answer
    - Total correct answers
    - Total score
    - Total game seconds
    - Mobile or desktop
    - User's browser name
    - User's city
    - User's region
    - Date and time played


- On any game ending, user's final score is checked against the lowest top 10 score. If user's score is greater, they are invited to input their name.

- Displaying stats and adding new parts require a login. I have a secure back end only available to myself with a <--PrivateRoute--> component that checks a JSON Web Token in Local Storage on each page load.

















