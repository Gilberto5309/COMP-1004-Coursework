// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

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

    contentp.textContent = "This is were you can access and manage your account";

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



}

//Add event listeners to the tags used for navigation so that when they are clicked the screen will change
myAccount.addEventListener("click", accountMenu);

support.addEventListener("click", supportMenu);

home.addEventListener("click", returnHome);

