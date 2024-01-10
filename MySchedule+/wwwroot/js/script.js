// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {


    //hide the login and register form they will be shown on the myAccount page
    $('.login').hide();
    $('.register').hide();
    $('.schedule').hide();

    //This will display your current schedule
    function schedule() {

        //store all the values from the fields
        var activity1 = $("#activity1").val();
        var quantity1 = $("#quantity").val();

        var activity2 = $("#activity2").val();
        var quantity2 = $("#quantity2").val();

        var activity3 = $("#activity3").val();
        var quantity3 = $("#quantity3").val();
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
            $(".login").submit(function () {
                $(".login").hide();
                $(".schedule").show();
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
                $(".register-submit").prop("disabled", true);

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
                if (!usernameExists) {

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
                }else {
                    alert("Username already exists please choose a different one.");
                }

                //enable register submition again
                $(".register-submit").prop("disabled", false);
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




