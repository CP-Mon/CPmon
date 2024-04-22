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

# Update 20-4-67 night
New Backend endpoint

- /room
    - **GET**
        - /getRooms
            - get all rooms(instance of the game)
        - /getRoom/{id}
            - get room with specified id
            - see more of room things in backend/src/data/rooms.js
            - *IMPORTANT* all of the instance of room is in here
                - example: startGame, winner, turnPlayer(track player turn)
    - **POST**
        - /joinRoom/{id}
            - add player with "username" to the room {id}
            - already handle
                - same username exist in the same room
                - when the room is full
            - require "username":String in the request body
        - /addPokemon/{id} 
            - add pokemon in pokemonList in player with "username" in the room {id}
            - require "username":String in the request body
            - require "pokemonName":String in the request body
                - pokemonName can be added in data/CPmon.js
                - also Status can be found in models/Status.js
        - /removePlayer/{id}
            - remove player from a room {id}
            - require "username":String in the request body
        - /ready/{id}
            - if both player is ready, gameStart in room will be true
            - require "username":String in the request body
        - /action/{id}
            - require "username":String in the request body
            - require "action":String in the request body
                - 'attack': just attack damage = attack - def
                - 'guard': the next damage this unit recieve will calculate by 2xdef
                - 'magic': ignore def but your def-1
            - P.S. debug this one for an hour



# Updata 21-4-67 Neen
change some status 400 -> 200 with status "fail" so user wont see error

Bug Report (to Nadeem)
- bug : can't use roomInfo.room.startGame() and other method
- bug : user can join multiple room 

Bug Report (to Beam)
- bug : HP not show 
- bug : green background should follow choosen pokemon (May be handle in drawCPmonStatus()?)
- improve : status bar in waiting room, what is highest value?
- improve : may be delete log-container? We didn't store room log

# Update 22-4-67 (morning) by Beam
- i added gameRoomFighting with 70% of styling.
- use room log to display player's turn , player's action etc by accessing id "room-log"
- i also provided timer. you may access it via id "timer-text"
- for player's hp access id="player1-hp-fill" and id="player2-hp-fill" to style the width
- when it is the turn of the player, pls add id "attackable-button" "guardable-button" "magicable-button" to the specific button.
- but also, if its not the turn of the player , pls remove those id.
- i have already added the animation for each action, but its only for player1.
- you can add the same animation for player2 maybe by changing the id in function
- feel free to adjust the code in the js file
- i think it would be nice if we lock the time to wait for animation to end first before starting next action?


# Update 22-4-67 by Neen
- change animation*** in fighting room to handle***.js, so it will fetch API too
- in animation use "playerMeCard-card" and other is "playerYouCard-card"
- in room resetting, I add this.players = []; and it make it reset after frontend send clearRoom()
- add room.gameOverCount to make sure room will reset if two of player already left room
- add room.TurnCountdown. If it reach 0, game will stop and clearRoom


- check if in game, if not get out?

(to beam)
- exp bar should show only number
- CP card in home should show 4 in one line if open on normal website