# CPmon

# After Pull
- add .env file with mongoDB string 

# notes
- BACK_URL : set to "http://localhost:3222"; while in dev process



# Updata 19-4-67
[Nadeem : Game System]
Backend has room 6 rooms each room at it own index
startGame()
1. user go in to waitingRoom.html
    - post userData -> addPlayer(player)
    - if error -> send back main
2. refreash startGame() every 5 sec. wait till 2 people
Room gaming : NaDeem & Tokyo Lets goooo in battlePlay.html
3. user out of room removePlayer(playerName)
extra: if user close page, respond time, timeout>30 sec -> userLogout()
endGame : exp for user +money +exp

[Beam: Front end]
- User (Neen will add 'avalible/unavalible' hai)
- gameWaitingRoom , gameBattleRoom (gameBattle use one from 3)
- Extra sound?

[Neen: Web API]
cookie -> http web postman
**IF** you use it in .js that not relate with html ex. check user in server.js(that will run before load html)
you **CAN'T** fetch data by youself
**BUT** if your funsion use in html ex. handle event listenner. you can use getCurrentUser() as the same

Next Step:
NADEEM : Route & Logic
TOKYO : implement game to frontend 
NEENNERA : user Update & user Data
BRNNBM : CSS master!!!!!!