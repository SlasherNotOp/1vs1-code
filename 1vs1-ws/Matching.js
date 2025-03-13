
const { v4: uuidv4 } = require("uuid");

class MatchMakingService{
    #queue = [];

    constructor(ws){
        this.#queue.push(ws)
        if(this.#queue.length>=2){
            const user1 = this.#queue.shift();
            const user2 = this.#queue.shift();
            this.createMatch(user1, user2);
        }
    }

    createMatch(u1,u2){
        const matchId = uuidv4();
        
    }
}