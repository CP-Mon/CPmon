# CPmon

# notes
- BACK_URL : set to "http://localhost:3222"; while in dev process

- change "userSection" -> id = "userLoginSection" for log in 
- change filename "user.js" -> "userLogin.js" and move every login-related method to this file
- move pages to "frontend/public/pages/"
    - login.html = login
    - index.html = main pages
    - userData = user data & pokemon
    - gameRoom = game
        - Neen had set "/room1", "/room2", ..,, "room6" every room all use gameroom.html

- implement checking "currentUser" every time they go to new pages
    - if currentUser == null it will direct to login
    - after log in currentUser will collect user data in json
    - after log in it will go to index
    - refresh = end game, current user back to null
