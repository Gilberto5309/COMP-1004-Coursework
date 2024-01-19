// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {


    //hide the login and register form they will be shown on the myAccount page
    $('.login').hide();
    $('.register').hide();
    $('.schedule').hide();

    function validateSignIn(user, pass) {

        //Get all the registered accounts from the json file in local storage
        var accounts = JSON.parse(localStorage.getItem("accounts.json")) || [];

        //traverse the array of accounts and find a matching username and password
        for (var i = 0; i < accounts.length; i++){
            //check for username
            if (user === accounts[i].username) {
                //check that the password is also correct
                if (pass === accounts[i].password) {
                    //return true if both fields are correct
                    return true;
                } else {
                    //if password is incorrect return false
                    return false;
                }
            } else {
                //if username is wrong return false
                return false;
            }
        }

    }

    //This will display your current schedule
    function scheduleStore() {

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

        //get the data from local storage as an array
        var schedules = JSON.parse(localStorage.getItem("schedules.json")) || [];

        //make sure the schedule title is unique
        if (schedules.some(schedule => schedules.scheduleTitle === scheduleTitle)) {
            alert("Schedule title must be unique");
        }
        else if (activity1 == "" || activity2 == "" || activity3 == "" || time1 == "" || time2 == "" || time3 == "") {
            alert("Please fill in all fields");
        }
        //if it is unique add data to the schedules array with a title and add it to local storage
        else {

            schedules.push({ scheduleTitle, activities });

            localStorage.setItem("schedules.json", JSON.stringify(schedules, null, 2));

            alert("Schedules successfully added");

            //hide the register form
            $('.schedule').hide();
            //show the content again
            $('.content').show();
        }


        

    }


    //Function for changing to the accountMenu screen of the SPA
    function accountMenu() {

     
        //use querySelector to assign html elements to variables so they can be altered
        var myAccount = document.querySelector("#myAccount");

        var content = document.querySelector(".content");

        var contenth1 = content.querySelector("h1");

        var contentp = content.querySelector("p");

        //change the content of both tags to the text for the accountMenu screen
        contenth1.textContent = "Your Account";

        contentp.textContent = "If you have an account already you can click the sign in button and sign in with your details. If not you can click the create account button and register an account.";

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


        //when the sign in button is pressed the sign in form will be displayed
        signInButton.click(function (event) {

            //prevent default action
            event.preventDefault()


            $('.login').show();

            signInButton.remove();
            registerButton.remove();

            $('.content').hide();

            //Set up what happens when you submit
            $(".login").submit(function (event) {
                //prevent default action
                event.preventDefault()

                //disable the submit button to stop multiple entries in one go
                $("#login-submit").prop("disabled", true);

                //create variables to store field data
                var _username;
                var _password;

                //get data from both fields entered
                _username = $("#login-username").val();
                _password = $("#login-password").val();

                //run the account login validater
                var logInStatus = validateSignIn(_username, _password);

                //check if login is valid or not
                if (logInStatus == true) {
                    //hide login form and display schedule form
                    alert("Log in successful a");
                    $(".login").hide();

                    //change the content of both tags to the text for the schedule screen
                    contenth1.textContent = "Your Schedules";

                    contentp.textContent = "Access, create or delete your schedules here.";

                    //create buttons for schedule
                    var accessScheduleButton = $('<button id="accessSchedule">Access Schedule</button>');
                    var createScheduleButton = $('<button id="createSchedule">Create Schedule</button>');
                    var deleteScheduleButton = $('<button id="deleteSchedule">Delete Schedule</button>');

                    $('.content').append(accessScheduleButton, createScheduleButton, deleteScheduleButton);

                    $(".content").show();

                }
                //if username or password field are left blank tell user to please fill in the fields
                else if (_username == "" || _password == "") {
                    alert("Please fill in both fields.");
                }
                else {
                    alert("Incorrect username or password, please enter the correct details");
                }
                //enable register submition again
                $("#login-submit").prop("disabled", false);

                
            });

            $(".schedule").submit(function (event) {
                //disable the submit button to stop multiple entries in one go
                $("#schedule-submit").prop("disabled", true);
                //run the store schedule function
                scheduleStore();
                //enable register submition again
                $("#schedule-submit").prop("disabled", false);
            });

        });

        //when the register button is pressed the register form will appear
        registerButton.click(function (event) {

            //prevent default action
            event.preventDefault()

            $('.register').show();

            //remove the buttons from the screen
            signInButton.remove();
            registerButton.remove();

            //hide the content from the screen
            $('.content').hide();

            //create username and password variables
            var _username;
            var _password;

            //if the submit button is pressed run the following function
            $(".register").submit(function (event) {
                //prevent default form submission
                event.preventDefault();

                //disable the submit button to stop multiple entries in one go
                $("#register-submit").prop("disabled", true);

                //get the username and password from the input field
                _username = $("#register-username").val();
                _password = $("#register-password").val();

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
                        password: _password
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
                else {
                    alert("Username already exists please choose a different one.");
                }

                //enable register submition again
                $("#register-submit").prop("disabled", false);
            });
        });
    }

    //Function for changing to the supportMenu screen
    function supportMenu() {

        //use querySelector to assign html elements to variables so they can be altered
        var support = document.querySelector("#support");

        var content = document.querySelector(".content");

        var contenth1 = content.querySelector("h1");

        var contentp = content.querySelector("p");

        //change the content of both the tags to text for the supportMenu screen
        contenth1.textContent = "Support";

        contentp.textContent = "This is an application that will allow you to manage your time by adding your daily activities to a schedule. On the account menu you can register an account or sign in. Your schedules will be linked to your account and you can update the schedule and will receive feedback on how healthy your time management is and the site will give suggestions for improvements.";

        //hide the form
        $('.login').hide();

        //hide register form
        $('.register').hide();

        //hide the schedule form if open
        $('.schedule').hide();

        //show the content back on the page
        $('.content').show();

        //remove any created buttons
        var signInButton = document.querySelector("#signIn");
        signInButton.remove();
        var registerButton = document.querySelector("#register");
        registerButton.remove();


    }

    //Function for returning to the home screen of the SPA
    function returnHome() {

        //use querySelector to assign html elements to variables so they can be altered
        var home = document.querySelector("#home");

        var content = document.querySelector(".content");

        var contenth1 = content.querySelector("h1");

        var contentp = content.querySelector("p");

        //change the content of both html tags to the original text
        contenth1.textContent = "Myschedule+";

        contentp.textContent = "Welcome to Myschedule+, this is a single paged web application where you can create a schedule and manage your time";

        //hide the form
        $('.login').hide();

        //hide the register form
        $('.register').hide();

        //hide the schedule form if open
        $('.schedule').hide();

        //show the content back on the page
        $('.content').show();

        //remove any created buttons
        var signInButton = document.querySelector("#signIn");
        signInButton.remove();
        var registerButton = document.querySelector("#register");
        registerButton.remove();

    }



    //Add event listeners to the tags used for navigation so that when they are clicked the screen will change
    myAccount.addEventListener("click", accountMenu);

    support.addEventListener("click", supportMenu);

    home.addEventListener("click", returnHome);

});




