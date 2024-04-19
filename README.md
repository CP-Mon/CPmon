# CPmon

# After Pull
- add .env file with mongoDB string 

# notes
- BACK_URL : set to "http://localhost:3222"; while in dev process


(to Beam)
- change "userSection" -> id = "userLoginSection" for log in 
- change filename "user.js" -> "userLogin.js" and move every login-related method to this file
- move pages to "frontend/public/pages/"
    - login.html = login
    - index.html = main pages
    - userData = user data & pokemon
    - gameRoom = set "/room1", "/room2", ..,, "room6" every room all use gameroom.html

- implement checking "currentUser"
    - if currentUser == null it will direct to login
    - after log in currentUser will collect user data in json
    - after log in it will go to index
    - refresh = end game, current user should back to null (to Nadeem)


[IMPORTANT : change getCurrentUser]
(to Nadeem)
**IF** you use it in .js that not relate with html ex. check user in server.js(that will run before load html)
you **MUST** fetch data by youself
const userData = await fetch(`${BACKEND_URL}/api/getUserData`,{
    credentials: 'include'
}).then((r) => r.json());
WHY? I had use session that will store user in html page, It can't get in .js

(to Beam)
**BUT** if your funsion use in html ex. handle event listenner. you can use getCurrentUser() as the same

[EXTRA]
- login & userData is same? should we merge it