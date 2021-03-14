function welcome_again() {
    alert(" Wecome Again ...");
}


function update_msg() {
    console.log("clicked");
    const welcomeDiv = document.getElementById("welcome");
    console.log(welcomeDiv);
    welcomeDiv.innerHTML = "Welcome Shubham";
}

function enterName() {
    const input = window.prompt("Please Enter Your Name");
    const welcomeDiv = document.getElementById("welcome");
    welcomeDiv.innerHTML += ` ${input}`;
}

function deleteEntry() {
    const confirmation = window.confirm("Are you sure, you want to continue...");
    const welcomeDiv = document.getElementById("welcome");
    if (confirmation) {
        welcomeDiv.innerHTML = `Deletion Process Completed`;
    }
    else {
        welcomeDiv.innerHTML = ` ${confirmation} : Deletion Process Terminated`;
    }

}