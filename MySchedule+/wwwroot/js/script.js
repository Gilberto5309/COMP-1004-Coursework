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

            //if the submit button is pressed run the following function
            $(".register").submit(function (event) {
                //prevent default form submission
                event.preventDefault();
                //get the username and password from the input field
                var username = $("#register-username").val();
                var password = $("#register-password").val();

                //hide the register form
                $('.register').hide();
                //show the content again
                $('.content').show();

                //create an object to store the new username and password
                var accountObject = {
                    username: username,
                    password: password
                };

                const fs = require('fs');

                $.get('/json/account.json', function (data) {

                    data.push(accountObject);

                    
                })
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




