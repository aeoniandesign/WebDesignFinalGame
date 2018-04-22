let scenarioText = [];
let scenarioTextLost = [];
let userOptions = [];
let randomEncounterText = [];
let stage = 0;

let lives = 3; // this can change depending on what we want the health system to be

// scenario text
scenarioText[0] = "As the sun rises on the island, the pinguins discover that they are far away from home; they notice that all of their penguin friends are gone- They are alone.";

// new life
scenarioText[1] = "The pinguins have decided that they want to make a new life for themselves on the iceberg. It wouldn’t be worth it to try to go home. ";

// find igloo
scenarioText[2] = "The pinguins manage to find an igloo stocked with food. But no other pinguins.";

// find home
scenarioText[3] = "The Penguins have decided to make their way home. While trying to get an idea of where they are, they encounter a polar bear who is weak and hungry.";

// find igloo
scenarioText[4] = "The pinguins manage to find an igloo stocked with fish, but no other pinguins";

// polar
scenarioText[5] = "The pinguins find a vegan polar bear and asks for ride. Click on the polar bear to continue the story.";

// polar bear drive by
scenarioText[6] = "The polar bear is so happy that he offers to let the penguins hitch a ride on his back to helpl them in their journey";

// all text that includes pinguins brutal demise
scenarioTextLost[0] = "The pinguins eventually get tired and can no longer find any way to survive. You lose.";
scenarioTextLost[1] = "The pinguins are tired and encounter sharks. They don't have enough energy to get home. You lose.";
scenarioTextLost[2] = "The pinguins were not fast enough, and could not escape the seals. You lose.";
scenarioTextLost[3] = "The pinguins avoid the sharks, but a whale swallows the boat (and the pinguins.) You Lose.";
scenarioTextLost[4] = "They call for help to the pinguins on their home island, hoping someguin will hear, but noguin did. They never made it home. You lose.";
scenarioTextLost[5] = "The pinguins didn't make it. You lose.";


// choices user can make
userOptions[0] = "Live a new life";
userOptions[1] = "Try to find other Penguins"; // leads to a random encounter
userOptions[2] = "Keep Looking for Penguins"; // leads to a random encounter
userOptions[3] = "Try to go home instead";
userOptions[4] = "Go hunting and find food (chance)";
userOptions[5] = "Abandon the polar bear"; // :c



$(document).ready(function () {
    loadEvents();
});


function loadEvents() {
    $("#startGame").click(function () {
        $("#gameArea").fadeIn(2000); // game area fades in
        $("#startGame").remove(); // removes the filter
    });

    $("#leftChoice, #rightChoice").hover(function () {
        $(this).fadeTo(500, 1); // change opacity to 1 while hovering over
    }, function () {
        $(this).fadeTo(500, 0.8); // else fade back to normal     
    });

    $("#leftChoice").click(function () {
        switch (stage) {
            case 0: // first selection
                $("#leftText").text(userOptions[1]);
                $("#rightText").text(userOptions[4]);
                $("#story").text(scenarioText[1]);
                stage = 1;
                break;
            case 1: // second selection
                $("#leftText").text(userOptions[2]);
                $("#rightText").text(userOptions[4]);
                $("#story").text(scenarioText[2]);
                stage = 2;
                break;
            case 2: // third selection
                $("#leftText").text(userOptions[2]);
                $("#rightText").text(userOptions[3]);
                $("#story").text(scenarioText[4]);
                stage = 3;
                break;
            case 3: // fourth selection
                // if less than 50 player loses       
                if (RandomNum() > 50) {
                    $("#leftChoice, #rightChoice, #currentPlayer").fadeOut(2000);
                    $("#story").text(scenarioTextLost[0]);
                } else {
                    // travel to iceberg
                    $("#leftChoice, #rightChoice").fadeOut(2000);
                    $("#currentPlayer").css("background-image", "url('images/Entities/PolarBear.png')");
                    $("#story").text(scenarioText[5]);

                    // user clicks on polar bear
                    $("#currentPlayer").click(function () {
                        $("#currentPlayer").css("background-image", "url('images/Entities/player.png')");
                        $("#gameArea").css("background-image", "url('images/BackDrops/backdrop3.png')");
                        $("#leftChoice, #rightChoice").fadeIn();
                        $("#story").text(scenarioText[6]);
                        stage = 4;
                    });

                }
                break;
            case 4: // iceberg event
                $("#leftText").text(userOptions[1]);
                $("#rightText").text(userOptions[4]);
                $("#story").text(scenarioText[6]);
                break;
        }
    });
    $("#rightChoice").click(function () {
        switch (stage) {
            case 0:
                $("#leftText").text(userOptions[1]);
                $("#rightText").text(userOptions[4]);
                $("#story").text(scenarioText[3]);
                stage = 1;
                break;

            case 1:
                $("#leftText").text(userOptions[1]);
                $("#rightText").text(userOptions[4]);
                $("#story").text(scenarioText[3]);

                stage = 2;
                break;
        }
    });

} // end of Events
// ================================ END OF JQUERY ================================

// random number generator.
function RandomNum() {
    let chance = Math.floor((Math.random() * 100) * 1); // calculates the chance of an event happening
    return chance;
}