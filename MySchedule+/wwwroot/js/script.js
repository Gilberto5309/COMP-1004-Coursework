﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


$(document).ready(function () {



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

        signInButton.click(function () {

            //Create a login form

            //create a container div for the form
            var logincontainer = $('<div class="loginContainer"/>');
            //append this container to the .banner div tag
            $('.banner').append(logincontainer);

            //add a login header to the container
            var login = $('<h2>Login</h2>');
            $('.loginContainer').append(login);

            //create a form tag
            var loginForm = $('<form id="login"/>');
            $('.loginContainer').append(loginForm);

            //create labels for the form
            var usernameLabel = $('<label for="username">Username:</label>');
            var usernameInput = $('<input type="text" id="username" name="username" required>')
            var passwordLabel = $('<label for="password>Password:</label>');
            var passwordInput = $('<input type="text" id="password" name="password" required>')
            //add the labels to the form
            $('loginForm').append(usernameLabel);
            $('loginForm').append(passwordLabel);

            //clear the screen for the form
            signInButton.remove();
            registerButton.remove();
            contenth1.textContent = "";
            contentp.textContent = "";


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

        contentp.textContent = "This is were you can view support for the application";

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



