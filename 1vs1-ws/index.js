const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");
const { apiCall, saveMatch } = require("./apiCallClass");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const queue = []; // In-memory matchmaking queue
const activeMatches = new Map(); // Stores matchId -> { user1, user2 }
const matchAcknowledgments = new Map(); // Stores acknowledgment status





// WebSocket Connection Handler
wss.on("connection", (ws) => {
    console.log("User connected");
    


    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);
        } catch (error) {
            ws.send("you enter wrong input",error.toString)
            return;
        }
        const data = JSON.parse(message);

        if (data.event === "find_opponent") {
            handleFindOpponent(ws, data.username);
        }

        if (data.event === "match_acknowledge") {
            handleAcknowledgment(ws, data.match_id);
        }

    });

    ws.on("close", () => {
        console.log("User disconnected");
        removeFromQueue(ws);
    });
});

// 1️⃣ User requests to find an opponent
function handleFindOpponent(ws, username) {

    console.log(`${username} is looking for an opponent...`);
    ws.username = username; // Store username in WebSocket object
    new MatchMakingService(ws)
    queue.push(ws); // Add user to queue

    if (queue.length >= 2) {
        const user1 = queue.shift();
        const user2 = queue.shift();
        createMatch(user1, user2);
    }
}

// 2️⃣ Create a match when two users are available
function createMatch(user1, user2) {
    const matchId = uuidv4(); // Generate unique match ID
    console.log(`Match Created: ${user1.username} vs ${user2.username} | Match ID: ${matchId}`);

    // Store match info
    activeMatches.set(matchId, { user1, user2 });
    matchAcknowledgments.set(matchId, { user1Ack: false, user2Ack: false });

    // Notify both users
    const matchData = JSON.stringify({
        event: "match_found",
        match_id: matchId,
        opponent: { username: user2.username }
    });
    user1.send(matchData);

    const matchData2 = JSON.stringify({
        event: "match_found",
        match_id: matchId,
        opponent: { username: user1.username }
    });
    user2.send(matchData2);

    // Start acknowledgment timeout (30 seconds)
    setTimeout(() => {
        const ackStatus = matchAcknowledgments.get(matchId);
        if (ackStatus && (!ackStatus.user1Ack || !ackStatus.user2Ack)) {
            console.log(`Match ${matchId} canceled due to no acknowledgment`);
            cancelMatch(matchId);
        }
    }, 3000000);
}

// 3️⃣ Handle user acknowledgment
function handleAcknowledgment(ws, matchId) {
    console.log(`${ws.username} acknowledged match ${matchId}`);
    const match = activeMatches.get(matchId);
    if (!match) return;

    const ackStatus = matchAcknowledgments.get(matchId);
    if (!ackStatus) return;

    if (ws === match.user1) ackStatus.user1Ack = true;
    if (ws === match.user2) ackStatus.user2Ack = true;

    if (ackStatus.user1Ack && ackStatus.user2Ack) {
        matchAcknowledgments.delete(matchId); // Cleanup

        saveMatch(matchId,match.user1,match.user2)//api call

        startCountdown(matchId);
    }
}

// 4️⃣ Start the 60-second countdown
function startCountdown(matchId) {
    console.log(`Starting countdown for match ${matchId}`);
    let timeLeft = 60;
    const match = activeMatches.get(matchId);
    if (!match) return;

    const interval = setInterval(() => {
        if (!activeMatches.has(matchId)) {
            clearInterval(interval);
            return;
        }

        match.user1.send(JSON.stringify({ event: "countdown", match_id: matchId, time_left: timeLeft }));
        match.user2.send(JSON.stringify({ event: "countdown", match_id: matchId, time_left: timeLeft }));

        timeLeft--;

        if (timeLeft === 0) {
            clearInterval(interval);
            sendCodingProblem(matchId);
        }
    }, 1000);
}

// 5️⃣ Send a coding problem after the countdown ends
function sendCodingProblem(matchId) {
    const match = activeMatches.get(matchId);
    if (!match) return;

    const problem = {
        title: "Reverse a String",
        description: "Write a function that reverses a given string.",
        input_format: "A single string",
        output_format: "Reversed string",
        sample_input: "hello",
        sample_output: "olleh"
    };

    match.user1.send(JSON.stringify({ event: "problem_assigned", match_id: matchId, problem }));
    match.user2.send(JSON.stringify({ event: "problem_assigned", match_id: matchId, problem }));
}

// 6️⃣ Remove a user from the queue if they disconnect
function removeFromQueue(ws) {
    const index = queue.indexOf(ws);
    if (index !== -1) {
        queue.splice(index, 1);
    }
    console.log(ws)
}

// 7️⃣ Cancel the match if acknowledgment is not received
function cancelMatch(matchId) {
    const match = activeMatches.get(matchId);
    if (!match) return;

    if (match.user1) match.user1.send(JSON.stringify({ event: "match_canceled", reason: "Opponent did not acknowledge" }));
    if (match.user2) match.user2.send(JSON.stringify({ event: "match_canceled", reason: "Opponent did not acknowledge" }));

    activeMatches.delete(matchId);
    matchAcknowledgments.delete(matchId);
}

// Start the server
server.listen(3001, () => {
    console.log("Server running on http://localhost:3000");
});
