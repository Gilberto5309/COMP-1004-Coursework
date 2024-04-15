// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {


    //hide the login and register form they will be shown on the myAccount page
    $('.login').hide();
    $('.register').hide();
    $('.schedule').hide();
    $('.scheduleSearch').hide();
    $('#scheduleContainer').hide();
    $('.scheduleDelete').hide();
    $('.showSchedules').hide();

    //set up any variables I want to be global
    //make sure the container is only create once and isn't duplicated 
    var containerExists = false;
    var loggedIn = false;
    var currentAccount;

    //create buttons
    //create buttons for schedule
    var accessScheduleButton = $('<button id="accessSchedule">Access Schedule</button>');
    var createScheduleButton = $('<button id="createSchedule">Create Schedule</button>');
    var deleteScheduleButton = $('<button id="deleteSchedule">Delete Schedule</button>');
    var logOutButton = $('<button id="logOut">Log Out</button>');

    //function to export json to flat file
    function exportJson(fileName, scheduleObject) {

        // Store the schedule as a string
        const jsonString = JSON.stringify(scheduleObject, null, 2);

        // Create a data URL for the JSON data
        const dataUrl = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonString);

        // Create a temporary anchor element if it doesn't exist
        let anchor = document.getElementById('downloadAnchor');
        if (!anchor) {
            anchor = document.createElement('a');
            anchor.id = 'downloadAnchor';
            document.body.appendChild(anchor);
        }

        anchor.href = dataUrl;
        anchor.download = fileName + '.json';

        // Append the anchor to the body and trigger a click event
        document.body.appendChild(anchor);
        anchor.click();

        // Remove the anchor from the body after the download starts
        document.body.removeChild(anchor);

    }

    //function to fetch the file
    function fetchFile(fileName) {

        return fetch(fileName + '.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(jsonData => {
                // Return the parsed JSON data
                return jsonData;
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
                throw error;
            });
    }

    //function for encrypting and decrypting passwords
    function encryptPassword(password, key) {


        console.log(password);
        //create a variable to store the encrypted password
        var encryptedPass = '';

        //loop through the given password and start encrypting it
        for (var i = 0; i < password.length; i++) {

            //get the ascii value of each character
            var charCode = password.charCodeAt(i);

            if (charCode >= 65 && charCode <= 90) {
                //uppercase letters
                encryptedPass += String.fromCharCode((charCode - 65 + key) % 26 + 65);
            } else if (charCode >= 97 && charCode <= 122) {
                //lowercase letters
                encryptedPass += String.fromCharCode((charCode - 97 + key) % 26 + 97);
            } else {
                //non-alphabetic characters
                encryptedPass += password.charAt(i)
            }
        }

        console.log(encryptedPass)
        return encryptedPass;

    }

    function decryptPassword(password, key) {

        //create a variable to store the encrypted password
        var decryptedPass = '';

        //loop through the given password and start encrypting it
        for (var i = 0; i < password.length; i++) {

            //get the ascii value of each character
            var charCode = password.charCodeAt(i);

            if (charCode >= 65 && charCode <= 90) {
                //uppercase letters
                decryptedPass += String.fromCharCode((charCode - 65 - key) % 26 + 65);
            } else if (charCode >= 97 && charCode <= 122) {
                //lowercase letters
                decryptedPass += String.fromCharCode((charCode - 97 - key) % 26 + 97);
            } else {
                //non-alphabetic characters
                decryptedPass += password.charAt(i)
            }
        }

        return decryptedPass;
    }

    //function to check time spent on activities and return if they are spending too long, too little time on activties
    //as this is a prototype there will only be a few checks for common activties
    function scheduleCheck(activity, time) {

        //set up colour codes for red, amber and green
        var red = "#d2222d";
        var amber = "#ffbf00";
        var green = "#238823";

        //change the schedules background colour if needs be
        //10 hours is quite a bit of time so as a standard if any time spent is over this it'll automatically be red
        if (time > 10) {
            $(activity).css("background-color", red)
        }

        activityName = activity.val();

        timeSpent = time.val();

        //Run a check for gaming as an acitvity
        if (activityName.toLowerCase() === "gaming") {
            //after doing some research I came to the conclusion that 4 hours seems like the upper most limit for a healthy gaming balance
            if (timeSpent >= 0 && timeSpent <= 4) {
                $(activity).css("background-color", green);
            }
            else if (timeSpent > 4 && timeSpent <= 6) {
                $(activity).css("background-color", amber);
            }
            else if (timeSpent > 6) {
                $(activity).css("background-color", red);
            }
        }
        else if (activityName.toLowerCase() === "working") {
            //after doing some research I came to the conclusion that 4 hours seems like the upper most limit for a healthy working balance
            if (timeSpent >= 0 && timeSpent <= 5) {
                $(activity).css("background-color", green);
            }
            else if (timeSpent > 5 && timeSpent <= 9) {
                $(activity).css("background-color", amber);
            }
            else if (timeSpent > 9) {
                $(activity).css("background-color", red);
            }
        }
        else if (activityName.toLowerCase() === "exercise") {
            //after doing some research I came to the conclusion that 4 hours seems like the upper most limit for a healthy exercise balance
            if (timeSpent >= 0 && timeSpent <= 4) {
                $(activity).css("background-color", green);
            }
            else if (timeSpent > 4 && timeSpent <= 6) {
                $(activity).css("background-color", amber);
            }
            else if (timeSpent > 6) {
                $(activity).css("background-color", red);
            }
        }
        else if (activityName.toLowerCase() === "sleeping") {
            //after doing some research I came to the conclusion that 4 hours seems like the upper most limit for a healthy sleeping balance
            if (timeSpent >= 8 && timeSpent <= 12) {
                $(activity).css("background-color", green);
            }
            else if (timeSpent > 4 && timeSpent <= 8) {
                $(activity).css("background-color", amber);
            }
            else if (timeSpent < 4) {
                $(activity).css("background-color", red);
            }
        }
        else if (activityName.toLowerCase() === "social") {
            //after doing some research I came to the conclusion that 4 hours seems like the upper most limit for a healthy social time balance
            if (timeSpent >= 0 && timeSpent <= 8) {
                $(activity).css("background-color", green);
            }
            else if (timeSpent > 8 && timeSpent <= 10) {
                $(activity).css("background-color", amber);
            }
            else if (timeSpent > 12) {
                $(activity).css("background-color", red);
            }
        }

    }

    function validateSignIn(user, pass) {

        //Get all the registered accounts from the json file in local storage
        var accounts = JSON.parse(localStorage.getItem("accounts.json")) || [];

        //status on account
        var found = false;

        //traverse the array of accounts and find a matching username and password
        for (var i = 0; i < accounts.length; i++){

            //get the encrypted password
            var encryptedPassword = accounts[i].password;

            //decrypt the password
            var decryptedPassword = decryptPassword(encryptedPassword, 5);
            //check for username
            if (user.toLowerCase() === accounts[i].username.toLowerCase()) {
                console.log("okay");
                console.log(pass);
                console.log(decryptedPassword);
                //check that the password is also correct
                if (pass === decryptedPassword) {
                    //return true if both fields are correct
                    found = true
                    break;
                } else {
                    //if password is incorrect return false
                    found = false
                }
            } else {
                //if username is wrong return false
                found = false;
            }
        }
        console.log(encryptedPassword);
        console.log(decryptedPassword);
        console.log(found);
        return found;

    }

    //create a function to delete entries into the schedule storage
    function scheduleDelete(currentAccount) {
        
        //hide buttons
        $('#createSchedule').hide();
        $('#deleteSchedule').hide();
        $('#accessSchedule').hide(); 
        $('#logOut').hide();

        //show the schedule delete form
        $('.scheduleDelete').show();
        $('.showSchedules').show();
        
        //when the submit button is pressed
        $('.scheduleDelete').submit(function () {

            //input the name of the schedule you want to delete
            var deleteInput = $('#scheduleDeleteTitle').val();
            //bool to check if schedule has been found
            var scheduleFound = false;
            //get the schedules from storage
            var schedules = JSON.parse(localStorage.getItem("schedules.json")) || [];

            for (var i = 0; i < schedules.length; i++){
                //check if the provided input is an existing schedule
                if (deleteInput === schedules[i].scheduleTitle && currentAccount === schedules[i].account) {
                    //delete the schedule from storage and alert the user that it has been deleted
                    schedules.splice(i, 1);
                    //save new schedule array
                    localStorage.setItem("schedules.json", JSON.stringify(schedules, null, 2));
                    alert(`${deleteInput} has been deleted`);
                    $('.scheduleDelete').hide();
                    $(".showSchedules").hide();
                    $('.content').show();
                    //hide buttons
                    $('#createSchedule').show();
                    $('#deleteSchedule').show();
                    $('#accessSchedule').show(); 
                    $('#logOut').show();
                    scheduleFound = true;
                    break;
                    
                }
            }
            console.log(scheduleFound);
            //if there is no matching name
            if (scheduleFound == false) {
                //ask user to provide a valid schedule name
                alert(`${deleteInput} does not exist or is linked to a seperate account`);
            }
           
        });
    }

    //This will display your current schedule
    function scheduleStore(account) {

        //store all the values from the fields
        var scheduleTitle = $("#scheduleTitle").val();

        var activity1 = $("#activity1").val();
        var time1 = $("#quantity").val();

        var activity2 = $("#activity2").val();
        var time2 = $("#quantity2").val();

        var activity3 = $("#activity3").val();
        var time3 = $("#quantity3").val();

        //create an object to store all the activity data
        var activities = [
            [activity1, time1],
            [activity2, time2],
            [activity3, time3]
        ]

        //create a variable to hold the data about the schedule
        let scheduleObject = [];

        //push data to the variable so it can be exported to a json file
        scheduleObject.push({ account, scheduleTitle, activities });

        //export the file
        exportJson(scheduleTitle, scheduleObject);

        //get the data from local storage as an array
        var schedules = JSON.parse(localStorage.getItem("schedules.json")) || [];

        //make sure the schedule title is unique
        if (schedules.some(schedule => schedules.scheduleTitle === scheduleTitle)) {
            alert("Schedule title must be unique");
        }

        //if it is unique add data to the schedules array with a title and add it to local storage
        else {

            schedules.push({ account, scheduleTitle, activities });

            localStorage.setItem("schedules.json", JSON.stringify(schedules, null, 2));

            alert("Schedules successfully added");
        }

        return scheduleTitle;

    }

    function viewSchedule(schedule, currentAccount) {

      
        //take in an input for the name of the schedule you want to view
        var scheduleSearch = $("#scheduleInputTitle").val();

        //check if schedule linked to account was found or if it exists
        var found = false;

        //search for the entered schedule name

        for (var i = 0; i < schedule.length; i++) {

            //check if the provided input is an existing schedule
            if (currentAccount === schedule[i].account) {

                //create an exit button to stop viewing your schedule
                var exitButton = $('<button id="exitButton">EXIT</button>');

                //create a variable to store the schedule we want to retrieve
                var desiredSchedule;

                // check if the schedule exists
                for (const item of schedule) {
                    console.log(item);
                    //if the input we provide us equal to the title of a schedule in our storage we retrieve  it
                    if (item.scheduleTitle === scheduleSearch) {
                        var desiredSchedule = item;
                        found = true;

                    }
                }

                //hide content and the search bar
                $('.scheduleSearch').hide();
                $(".showSchedules").hide();
                $('.content').hide();


                if (containerExists == false) {
                    //create a varibale that stores the schedule container
                    const scheduleContainer = $("#scheduleContainer");

                    //create a title element for the container
                    const titleElement = $("<h1>").text(desiredSchedule.scheduleTitle);

                    //create a list to store the activties and the times for each one
                    const activitiesList = $("<ul>").css("list-style-type", "none");

                    //for each activity in the schedule store the activity and its time in a variable and append that variable to the activities list
                    $.each(desiredSchedule.activities, function (index, activity) {
                        const activityItem = $("<li>").text(`${activity[0]}: ${activity[1]} hours`);
                        activitiesList.append(activityItem);
                    });

                    //append all these changes to the container
                    scheduleContainer.append(titleElement, activitiesList, exitButton);

                    //set exists to true
                    containerExists = true;
                }
                //display the schedule container
                $('#scheduleContainer').show();

                //if the exit button is pressed hide the container
                exitButton.click(function (event) {
                    $(scheduleContainer).hide();
                    //re-display the buttons and content
                    $('.content').show();
                    $('#createSchedule').show();
                    $('#deleteSchedule').show();
                    $('#accessSchedule').show();
                    $('#logOut').show();
                });

            }
        }

        //if found is false
        if (found == false) {
            alert("Schedule either does not exist or is linked to another account");
        }

        
    }

    //Function for changing to the accountMenu screen of the SPA`
    function accountMenu() {

        //hide schedule page
        $('#scheduleContainer').hide();
        $('.scheduleSearch').hide();
        $('.scheduleDelete').hide();
        $('.showSchedules').hide();

        //hide buttons
        $('#createSchedule').hide();
        $('#deleteSchedule').hide();
        $('#accessSchedule').hide();
        $('#logOut').hide();

        if (loggedIn == false) {

            //change the content of both tags
            var contenth1 = $('.content').children('h1');

            var contentp = $('.content').children('p');

            //change the content of both tags to the text for the accountMenu screen
            contenth1.text("Your Account");

            contentp.text("If you have an account already you can click the sign in button and sign in with your details. If not you can click the create account button and register an account.");

            //check if buttons already exist, if not create them

            //create a place holder for the button elements
            var button = $('button');

            //if they have no length that means no buttons have been created/ set up so we can create the buttons
            if (button.length <= 0) {
                //create a sign in button
                var signInButton = $('<button id="signIn"></button>');

                //assign text to the button
                signInButton.text("Sign in");

                //add the button to the content div
                $('.content').append(signInButton);

                //create a sign in button
                var registerButton = $('<button id="register"></button>');

                //assign text to the button
                registerButton.text("Register");

                //add the button to the content div
                $('.content').append(registerButton);



            }

            signInButton = document.querySelector("#signIn");
            registerButton = document.querySelector("#register");
            $(signInButton).show();
            $(registerButton).show();

            //when the sign in button is pressed the sign in form will be displayed
            $(signInButton).click(function (event) {

                //prevent default action
                event.preventDefault()


                $('.login').show();

                $('#signIn').hide();
                $('#register').hide();

                $('.content').hide();

                //create variables to store field data
                var _username = "";
                var _password = "";

                //hide password
                $('#login-password').on('input', function () {
                    // Get the current value of the password field
                    const inputVal = $(this).val();

                    // If the length of the input value is greater than the length of _password,
                    // it means a character has been added, so we add that character to _password
                    if (inputVal.length > _password.length) {
                        _password += inputVal.slice(-1);
                    }
                    // If the length of the input value is less than the length of _password,
                    // it means a character has been deleted, so we update _password accordingly
                    else if (inputVal.length < _password.length) {
                        _password = _password.slice(0, -1);
                    }

                    // Mask the password field with asterisks based on the length of _password
                    const maskedValue = '*'.repeat(_password.length);
                    $(this).val(maskedValue);
                });
                

                //Set up what happens when you submit
                $(".login").submit(function (event) {
                    //prevent default action
                    event.preventDefault()

                    //disable the submit button to stop multiple entries in one go
                    $("#login-submit").prop("disabled", true);

                    //get data from both fields entered
                    _username = $("#login-username").val();
                    
                    //run the account login validater
                    var logInStatus = validateSignIn(_username, _password);

                   
                    //check if login is valid or not
                    if (logInStatus == true) {
                        //hide login form and display schedule form
                        $(".login").hide();
                        loggedIn = true;
                        currentAccount = _username;

                        //change the content of both tags to the text for the schedule screen
                        contenth1.text("Your Schedules");

                        contentp.text("Access, create or delete your schedules here.");


                        //retrieve the existing data from local storage and add all schedules to be displayed
                        var scheduleData = JSON.parse(localStorage.getItem("schedules.json")) || [];
                        for (var i = 0; i < scheduleData.length; i++) {
                            if (scheduleData[i].account == currentAccount) {
                                $(".showSchedules").append(scheduleData[i].scheduleTitle + "\n");
                            }
                        };

                        //rewrite the new schedule
                        $('.content').append(accessScheduleButton, createScheduleButton, deleteScheduleButton, logOutButton);
                        //display content
                        $(".content").show();

                    }

                    //if username or password field are left blank tell user to please fill in the fields
                    else if (_username == "" || _password == "") {
                        alert("Please fill in both fields.");
                        //reset the password to blank so that it can be re-entered if there are any issues logging in
                        _password = "";

                    }
                    else {
                        alert("Incorrect username or password, please enter the correct details");
                        //reset the password to blank so that it can be re-entered if there are any issues logging in
                        _password = "";

                    }
                    //enable register submition again
                    $("#login-submit").prop("disabled", false);

                    //check if the log out button is pressed
                    logOutButton.click(function (event) {

                        //prevent the default action
                        event.preventDefault();

                        //set the logged in status to false 
                        loggedIn = false;

                        //clear the form
                        $('#login-username').val("");
                        $('#login-password').val("");

                        //reset the password
                        _password = "";

                        //log out
                        location.reload();

                    });

                    //check what button has been pressed
                    createScheduleButton.click(function (event) {

                        //prevent default action
                        event.preventDefault();

                        //create a bool variable to loop the code so we can keep checking the schedules
                        var submitted = false;
                        //hide the content
                        $(".content").hide();

                        $('.schedule').show();

                        //check the activities provided
                        $('#quantity').on('input', function () {
                            //run a check on the schedule
                            scheduleCheck($("#activity1"), $("#quantity"));
                        });
                        $('#quantity2').on('input', function () {
                            //run a check on the schedule
                            scheduleCheck($("#activity2"), $("#quantity2"));
                        });
                        $('#quantity3').on('input', function () {
                            //run a check on the schedule
                            scheduleCheck($("#activity3"), $("#quantity3"));
                        });

                        $('.schedule').submit(function (event) {

                            //disable the submit button to stop multiple entries in one go
                            $("#schedule-submit").prop("disabled", true);

                            //prevent default action
                            event.preventDefault();

                            //display schedule form and also return the title of the schedule
                            var title = scheduleStore(currentAccount);

                            //reset the schedule so all fields are clear
                            $('.schedule')[0].reset();

                            //reset the colours of the input fields
                            $('#activity1').css("background-color", "#c98f42")
                            $('#activity2').css("background-color", "#c98f42")
                            $('#activity3').css("background-color", "#c98f42")

                            $(".showSchedules").append(title);

                            //enable the submit button to stop multiple entries in one go
                            $("#schedule-submit").prop("disabled", false);

                            //hide the register form
                            $('.schedule').hide();
                            //show the content again
                            $('.content').show();

                        })
                          
                    });

                    accessScheduleButton.click(function (event) {

                        //prevent default action
                        event.preventDefault();

                        //hide buttons
                        $('#createSchedule').hide();
                        $('#deleteSchedule').hide();
                        $('#accessSchedule').hide();
                        $('#logOut').hide();

                        //show the schedule delete form
                        $('.scheduleSearch').show();
                        $('.showSchedules').show();

                        $('.scheduleSearch').submit(function (event) {
                            // Prevent the default form submission behavior
                            event.preventDefault();

                            // Disable the submit button to prevent multiple entries
                            $("#scheduleSearch-submit").prop("disabled", true);

                            // Get schedule title
                            var scheduleTitle = $('#scheduleInputTitle').val();

                            // Read the JSON file
                            fetchFile(scheduleTitle)
                                .then(jsonData => {
                                    console.log(jsonData);
                                    viewSchedule(jsonData, currentAccount);

                                    // Enable the submit button after the fetch operation is complete
                                    $("#scheduleSearch-submit").prop("disabled", false);
                                })
                                .catch(error => {
                                    console.error('Error fetching JSON file:', error);
                                    // Enable the submit button in case of an error
                                    $("#scheduleSearch-submit").prop("disabled", false);
                                });
                        });

                        //reset the search form
                        $('.scheduleSearch')[0].reset();

                    });

                    deleteScheduleButton.click(function (event) {

                        //disable the submit button to stop multiple entries in one go
                        $("#scheduleDelete-submit").prop("disabled", true);

                        //prevent default action
                        event.preventDefault();

                        //call delete schedule button
                        scheduleDelete(currentAccount);

                        //enable the submit button to stop multiple entries in one go
                        $("#scheduleDelete-submit").prop("disabled", false);

                        //reset the search form
                        $('.scheduleDelete')[0].reset();

                    });


                });

            });

            //when the register button is pressed the register form will appear
            $(registerButton).click(function (event) {

                //prevent default action
                event.preventDefault()

                $('.register').show();

                //remove the buttons from the screen
                signInButton.remove();
                registerButton.remove();

                //hide the content from the screen
                $('.content').hide();

                var _username = "";
                var _password = "";


                //Store the password but hide it with astrixs while it gets typed
                $('#register-password').on('keydown', function () {

                    //store each character before it is turned into an astix and add it to the password string
                    let currentCharacter = $(this).val().slice(-1);

                    //check if a backspace/ delete key has been pressed, if so delete the last character entered
                    if (event.key === "Backspace" || event.key === "Delete") {
                        _password = _password.slice(0, -1);
                     
                    }
                    else if (event.key == "Shift") {
                        _password = _password;
                    }
                    else {
                        _password += currentCharacter;
                 
                    }
                    //store the password value
                    let tempPassword = $(this).val();

                    //replace it with astrix's as it is typed
                    let maskedValue = tempPassword.replace(/./g, '*');

                    //change the value of the input field to the astrix
                    $(this).val(maskedValue);

                });

                //if the submit button is pressed run the following function
                $(".register").submit(function (event) {
                    //prevent default form submission
                    event.preventDefault();

                    //encrypt password
                    var encryptedPassword = encryptPassword(_password, 5);

                    console.log(encryptedPassword);

                    //disable the submit button to stop multiple entries in one go
                    $("#register-submit").prop("disabled", true);

                    //get the username and password from the input field
                    _username = $("#register-username").val();

                    //retrieve the existing data from local storage
                    var accountData = JSON.parse(localStorage.getItem("accounts.json")) || [];

                    // check if the username already exists
                    var usernameExists = accountData.some(function (account) {
                        return account.username.trim().toLowerCase() === _username.toLowerCase();
                    });

                    //if the username is not already taken
                    if (!usernameExists && _username != "" && _password != "") {

                        //let the user know their account has been created
                        alert("Account created");
                        //add the data from the username and password field into an object
                        var accountObject = {
                            username: _username,
                            password: encryptedPassword
                        };

                        //push the object into the array of data
                        accountData.push(accountObject);

                        //store the updated data into the local storage in JSON format
                        localStorage.setItem('accounts.json', JSON.stringify(accountData, null, 2));

                        //hide the register form
                        $('.register').hide();
                        //show the content again
                        $('.content').show();
                    }
                    //if username or password field are left blank tell user to please fill in the fields
                    else if (_username == "" || _password == "") {
                        alert("Please fill in both fields.");
                    }
                    //if username already exists tell user to use a different username and password
                    else if(usernameExists){
                        alert("Username already exists please choose a different one.");
                    }

                    //enable register submition again
                    $("#register-submit").prop("disabled", false);

                    //reset the search form
                    $('.register')[0].reset();
                });
            });

        }
        //if already logged in
        else {

            

            //change the content of both tags to the text for the schedule screen
            var contenth1 = $('.content').children('h1');

            var contentp = $('.content').children('p');

            contenth1.text("Your Schedules");
            contentp.text("Access, create or delete your schedules here.");

            $('#accessSchedule').show();
            $('#createSchedule').show();
            $('#deleteSchedule').show();
            $('#logOut').show();

            //hide schedule page
            $('#scheduleContainer').hide();
            $('.scheduleSearch').hide();
            $('.scheduleDelete').hide();

            //check if the log out button is pressed
            $('#logOut').click(function (event) {

                //prevent the default action
                event.preventDefault();

                //set the logged in status to false 
                loggedIn = false;

                //clear the form
                $('#login-username').val("");
                $('#login-password').val("");

                //reset the password
                _password = "";

                //call the account menu
                return returnHome();

            });

            //check what button has been pressed
            $('#createSchedule').click(function (event) {

                //prevent default action
                event.preventDefault();

                //hide the content
                $(".content").hide();

                $('.schedule').show();

                $('.schedule').submit(function (event) {

                    //disable the submit button to stop multiple entries in one go
                    $("#schedule-submit").prop("disabled", true);

                    //prevent default action
                    event.preventDefault();

                    //display schedule form and also return the title of the schedule
                    var title = scheduleStore(currentAccount);

                    //reset the schedule so all fields are clear
                    $('.schedule')[0].reset();

                    //reset the colours of the input fields
                    $('#activity1').css("background-color", "#c98f42");
                    $('#activity2').css("background-color", "#c98f42");
                    $('#activity3').css("background-color", "#c98f42");
                        
                    $(".showSchedules").append(title);

                    //enable the submit button to stop multiple entries in one go
                    $("#schedule-submit").prop("disabled", false);

                    //hide the register form
                    $('.schedule').hide();
                    //show the content again
                    $('.content').show();

                })

            });

            $('#accessSchedule').click(function (event) {

                //prevent default action
                event.preventDefault();

                //hide buttons
                $('#createSchedule').hide();
                $('#deleteSchedule').hide();
                $('#accessSchedule').hide();
                $('#logOut').hide();

                //show the schedule delete form
                $('.scheduleSearch').show();
                $('.showSchedules').show();

                $('.scheduleSearch').submit(function (event) {

                    //disable the submit button to stop multiple entries in one go
                    $("#scheduleSearch-submit").prop("disabled", true);

                    //get schedule title
                    var scheduleTitle = $('#scheduleInputTitle').val();

                    //read the json file
                    fetchFile(scheduleTitle)
                        .then(jsonData => {
                            // Use jsonData once it has been fetched
                            console.log(jsonData);
                            //run the view schedule function
                            viewSchedule(jsonData, currentAccount);
                        })
                        .catch(error => {
                            alert("Schedule does not exist");
                        });

                    //enable the submit button to stop multiple entries in one go
                    $("#scheduleSearch-submit").prop("disabled", false);
                })

                //reset the search form
                $('.scheduleSearch')[0].reset();
            });

            $('#deleteSchedule').click(function (event) {

                //disable the submit button to stop multiple entries in one go
                $("#scheduleDelete-submit").prop("disabled", true);

                //prevent default action
                event.preventDefault();

                //call delete schedule button
                scheduleDelete(currentAccount);

                //enable the submit button to stop multiple entries in one go
                $("#scheduleDelete-submit").prop("disabled", false);

                //reset the search form
                $('.scheduleDelete')[0].reset();

            });
        }
    }
    //Function for changing to the supportMenu screen
    function supportMenu() {

        //change the content of both tags to the text for the schedule screen
        var contenth1 = $('.content').children('h1');

        var contentp = $('.content').children('p');

        contenth1.text("Support");
        contentp.text("This is an application that will allow you to manage your time by adding your daily activities to a schedule. On the account menu you can register an account or sign in. Your schedules will be linked to your account and you can update the schedule and will receive feedback on how healthy your time management is and the site will give suggestions for improvements. The colour of the box indicates if you are spending too much or too little time. Green means you are spending a healthy amount of time on the activity, amber means you could maybe consider changing the amount of time spent on the activity and red means you really need to change how much time you spend on this activity. When using this application make sure you set your broswers download directory to the wwwroot folder when exporting a schedule.");

        //hide the form
        $('.login').hide();

        //hide register form
        $('.register').hide();

        //hide the schedule form if open
        $('.schedule').hide();

        //hide schedule page
        $('#scheduleContainer').hide();

        $('.scheduleSearch').hide();
        $('.scheduleDelete').hide();
        $('.showSchedules').hide();

        //hide buttons
        $('#createSchedule').hide();
        $('#deleteSchedule').hide();
        $('#accessSchedule').hide();
        $('#logOut').hide();

        //show the content back on the page
        $('.content').show();

        //hide created buttons
        var signInButton = document.querySelector("#signIn");
        $(signInButton).hide();
        var registerButton = document.querySelector("#register");
        $(registerButton).hide();


    }

    //Function for returning to the home screen of the SPA
    function returnHome() {

        //change the content of both tags 
        var contenth1 = $('.content').children('h1');

        var contentp = $('.content').children('p');

        contenth1.text("Myschedule+");
        contentp.text("Welcome to Myschedule+, this is a single paged web application where you can create a schedule and manage your time");

        //hide the form
        $('.login').hide();

        //hide the register form
        $('.register').hide();

        //hide the schedule form if open
        $('.schedule').hide();

        //hide schedule page
        $('#scheduleContainer').hide();
        $('.scheduleSearch').hide();
        $('.showSchedules').hide();

        //hide buttons
        $('#createSchedule').hide();
        $('#deleteSchedule').hide();
        $('#accessSchedule').hide();
        $('#logOut').hide();

        //show the content back on the page
        $('.content').show();

        //remove any created buttons
        var signInButton = document.querySelector("#signIn");
        $(signInButton).hide();
        var registerButton = document.querySelector("#register");
        $(registerButton).hide();

    }



    //Add event listeners to the tags used for navigation so that when they are clicked the screen will change
    myAccount.addEventListener("click", accountMenu);

    support.addEventListener("click", supportMenu);

    home.addEventListener("click", returnHome);

});




