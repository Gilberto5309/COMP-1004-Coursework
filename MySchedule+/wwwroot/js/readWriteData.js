// Requiring users file 

const fs = require("fs");

function storeAccount() {
    // Read in the JSON file
    const users = require("./account");

    // Define a new user
    let user = {
        name: "Lauren Ansell",
        age: 30,
        language: ["Python", "JavaScript", "R"]
    }

    // Add the new user
    users.push(user);

    // Write to fill
    fs.writeFile("./account.json", JSON.stringify(users, null, 2), err => {
        if (err) throw err; // to check for errors

        console.log("Success")
    });

}