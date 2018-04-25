let width = window.innerWidth;
let height = window.innerHeight;

var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
})(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
var isIE = /*@cc_on!@*/ false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
var isChrome = !!window.chrome && !!window.chrome.webstore;
var isBlink = (isChrome || isOpera) && !!window.CSS;

// ignore all of the above stuffs



$(document).ready(function () {
    // Mobile support. eh
    if (width <= 400) {
        $("#scenario").css("font-size", "14px");
        $("#leftText").css("font-size", "14px");
        $("#rightText").css("font-size", "14px");
    }
    if (width <= 1000) {
        $("#scenario").css("font-size", "14px");
        $("#leftText").css("font-size", "14px");
        $("#rightText").css("font-size", "14px");
    }
    if (isIE || isEdge) {
        $('body').remove();
        alert("You're forbidden to use IE Edge on this site. Stop it, use chrome");
        $('head').remove();
    }
});

var player;



var scenarioText = [];
var scenarioTextLost = [];
var userOptions = [];
var randomEncounterText = [];
var stage = 0;

//level one scenarios.
// scenario text
scenarioText[0] = "As the sun rises on the island, the pinguins discover that they are far away from home; they notice that all of their penguin friends are gone- They are alone.";
// new life
scenarioText[1] = "The pinguins have decided that they want to make a new life for themselves on the iceberg. It wouldn’t be worth it to try to go home. ";
// find igloo
scenarioText[2] = "The pinguins manage to find an igloo stocked with food. But no other pinguins.";
// go home + polar bear
scenarioText[3] = "The Penguins have decided to make their way home. While trying to get an idea of where they are, they encounter a polar bear who is weak and hungry.";
//hunting and shark
scenarioText[4] = "The pinguins have decided to go hunting in the water. They encounter a shark and get injured. What now?";
//polar bear Encounters
scenarioText[6] = "The pinguins encounter a polar bear while searching for other pinguins. They decide to ask the polar bear for a ride!";
//find food
scenarioText[7] = "The pinguins had a successful hunt! They have food!";
//hungry and keep food
scenarioText[8] = "After all of that hunting, the pinguins have decided to keep the food so they would be strong enough to find their way home. They never see the polar bear again.";
//polar bear offers ride
scenarioText[9] = "The polar bear is so happy that he has food, he offers the pinguins to ride on his back to help them get home. He drops them off on a small island, and now they have to make the rest of the journey by themselves.";
//sleep
scenarioText[10] = "The pinguins decide that it's getting late, and they're tired after such a long day. They think it's best if they rest on the island and made their way home the next day. They're fully rested and ready to go the next morning.";
//random iceberg
scenarioText[11] = "The pinguins were far too tired to make it all the way home. They end up on another random iceberg.";

//level two scenarios
//rest
scenarioText[12] = "The pinguins thank the polar bear and decide to rest before continuing their journey.";
//eat fish
scenarioText[13]= "The pinguins decide to eat some fish to gain strength. Then it's time to continue.";
//sleep
scenarioText[14]= "The pinguins decide to sleep before continuing. Then they're off!";
// start their journey
scenarioText[15] = "The journey has begun for the penguins. They now have to choose how they will make their way home";
// swim
scenarioText[16] = "The penguins decide to swim! But where do they swim to?";
// swam to random iceberg + seals.
scenarioText[18] = "The pinguins swam to a random iceberg. As soon as they get settled, they encounter hungry seals.";
//gave seals all food + survive
scenarioText[19] = "While the pinguins may have lost their food supply, they saved their lives, and can continue their journey home.";
//didnt want to swim, sail boat.
scenarioText[21] = "We have lazy pinguins here. They didn't want to swim, and instead decide to make a sail boat. But how?";
//make boat with whatever
scenarioText[22] = "The pinguins gather materials from around the small iceberg, and make a boat successfully.";
//boat breaks bc pollution
scenarioText[23] = "The water surrounding them was full of polution, and the pollution slowly but surely destroyed their boat. The pinguins begin to panic when they are stranded in the water and they see sharks not too far in the distance.";
//boat survives pollution.
scenarioText[24] = "The boat makes it through the polluted waters but the pinguins see sharks in the distance and have no choice but to swim to escape them.";
//get out of boat.
scenarioText[25] = "The pinguins decide to just swim. These pinguins like to take risks They start swimming to avoid the sharks. And although they get a little roughed up, the pinguins survive!";

//level 3 scenario
//rested
scenarioText[27]="The penguins decide they're going to rest a big on the next iceberg. They can see their home not too far in the distance. After waddling around, they discover that the water between them and their home is full of pollution. Plastic Rings from soda cans, plastic bags, and so much trash. It would be almost impossible to swim through, but they have to do it. They have to find a way home.";
// made it home
scenarioText[29]="The pinguins made it home covered in trash!";
//abandon Bear
scenarioText[31] = "The penguins were too worried about getting home, they didn't have time to help the polar bear. They never see the polar bear again.Now what do they do?"



// all text that includes pinguins brutal demise
scenarioTextLost[0] = "The pinguins eventually get tired and can no longer find any way to survive. You lose.";
scenarioTextLost[1] = "The pinguins are tired and encounter sharks. They don't have enough energy to get home. You lose.";
scenarioTextLost[2] = "The pinguins were not fast enough, and could not escape the seals. You lose.";
scenarioTextLost[3] = "The pinguins avoid the sharks, but a whale swallows the boat (and the pinguins.) You Lose.";
scenarioTextLost[4] = "They call for help to the pinguins on their home island, hoping someguin will hear, but noguin did. They never made it home. You lose.";
scenarioTextLost[5] = "TThe pinguins put forth their best effort, but were killed by all the trash. You lose.";

// all random encounter dialog here
randomEncounterText[0] = "The pinguins encounter a polar bear and ask for ride. Click the polar bear to continue";
randomEncounterText[1] = "The boat breaks!";
randomEncounterText[2] = "The boat survives!";

// choices user can make
//level one
userOptions[0] = "Make a new life";
userOptions[1] = "Try to find other Pinguins"; // leads to a random encounter
userOptions[2] = "Keep Looking for Pinguins"; // leads to a random encounter
userOptions[3] = "Try to go home instead";
userOptions[4] = "Go hunting and find food (chance)";
userOptions[5] = "Abandon the polar bear"; // :c
userOptions[6] = "Continue hunting and find no food.";
userOptions[7] = "Go back and look for other pinguins.";
userOptions[8] = "Give up looking for other penguins. And try to go home.";
userOptions[9] = "Give up looking for food, and try to go home.";
userOptions[10] = "Go hunting to find food for the Polar Bear.";
userOptions[11] = "Give the food to the Polar Bear.";
userOptions[12] = "Keep the food for yourselves.";
userOptions[13] = "Rest on the iceberg.";
userOptions[14] = "Start the journey home.";

//level two
userOptions[14] = "Rest until the next day";
userOptions[15] = "Start travelling home";
userOptions[16] = "Eat fish and then start traveling.";
userOptions[17] = "Sleep until the next day, and then start going home.";
userOptions[18] = "Swim until we can't swim no more.";
userOptions[19] = "Swim until the next iceberg comes along.";
userOptions[20] = "Try to make a sailboat.";
userOptions[21] = "Build boat with whatever can be found";
userOptions[22] = "Give seals the food";
userOptions[23] = "Stay in the boat";
userOptions[24] = "Start swimming to avoid the sharks";
userOptions[25] = "Run from the seals.";

//level 3
userOptions[26] = "Call for help";
userOptions[27] = "Take the risk and swim";

$(document).ready(function () {
    loadEvents();
});


function loadEvents() {
    $("#auntArctic").click(function () {
        $("#gameArea").fadeIn(2000); // game area fades in
        $("#startGame").remove(); // removes the filter
        $("#gameArea").append('<audio autoplay="true" src="sources/sounds/Sled.mp3" type="audio/mpeg"></audio>');
        $("#currentPlayer").css("background-image", "url('images/Entities/aunt.png')");
    });
    $("#wendyWaddle").click(function () {
        $("#gameArea").fadeIn(2000); // game area fades in
        $("#startGame").remove(); // removes the filter
        $("#gameArea").append('<audio autoplay="true" src="sources/sounds/Sled.mp3" type="audio/mpeg"></audio>');
        $("#currentPlayer").css("background-image", "url('images/Entities/wendy.png')");
    });
    $("#edwardSnow").click(function () {
        $("#gameArea").fadeIn(2000); // game area fades in
        $("#startGame").remove(); // removes the filter
        $("#gameArea").append('<audio autoplay="true" src="sources/sounds/Sled.mp3" type="audio/mpeg"></audio>');
        $("#currentPlayer").css("background-image", "url('images/Entities/edward.png')");
    });
    $("#frankFishy").click(function () {
        $("#gameArea").fadeIn(2000); // game area fades in
        $("#startGame").remove(); // removes the filter
        $("#gameArea").append('<audio autoplay="true" src="sources/sounds/Sled.mp3" type="audio/mpeg"></audio>');
        $("#currentPlayer").css("background-image", "url('images/Entities/frank.png')");
    });


    $("#leftChoice, #rightChoice").hover(function () {
        $(this).fadeTo(500, 1); // change opacity to 1 while hovering over
    }, function () {
        $(this).fadeTo(500, 0.8); // else fade back to normal
    });

    $("#leftChoice").click(function () {
        switch (stage) {
            case 0:
                $("#leftText").text(userOptions[1]);
                $("#rightText").text(userOptions[4]);
                $("#story").text(scenarioText[1]);
                stage = 1;
                break;
            case 1: // second selection
                $("#leftText").text(userOptions[2]);
                $("#rightText").text(userOptions[3]);
                $("#story").text(scenarioText[2]);
                stage = 3;
                break;
            case 2: // third selection
                $("#leftText").text(userOptions[6]);
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
                    $("#story").text(randomEncounterText[0]);

                    // user clicks on polar bear
                    $("#currentPlayer").click(function () {
                        $("#currentPlayer").css("background-image", "url('images/Entities/player.png')");
                        $("#gameArea").css("background-image", "url('images/BackDrops/backdrop3.png')");
                        $("#leftChoice, #rightChoice").fadeIn();
                        $("#story").text(scenarioText[9]);
                        $("#leftText").text(userOptions[13]);
                        $("#rightText").text(userOptions[14]);
                        stage = 4;
                    });

                }
                break;
            case 4:
                $("#leftText").text(userOptions[16]);
                $("#rightText").text(userOptions[17]);
                $("#story").text(scenarioText[12]);
                stage = 5;
                break;
            case 5:
                $("#leftText").text(userOptions[15]);
                $("#rightText").text(userOptions[20]);
                $("#story").text(scenarioText[14]);
                stage = 6;
                break;
            case 6:
                $("#leftText").text(userOptions[18]);
                $("#rightText").text(userOptions[19]);
                $("#story").text(scenarioText[16]);
                stage = 7;
                break;
            case 7:
                $("#leftChoice, #currentPlayer, #rightChoice").fadeOut(2000);
                $("#gameArea").css("background-image", "url('images/Entities/shark.png')");
                $("#story").text(scenarioTextLost[1]);
                break;

        }
    });
    $("#rightChoice").click(function () {
        switch (stage) {
            case 0:
                $("#currentPlayer").css("background-image", "url('images/Entities/PolarBear.png')");
                $("#leftText").text(userOptions[10]);
                $("#rightText").text(userOptions[5]);
                $("#story").text(scenarioText[3]);
                stage = 1;
                break;
            case 1:
                $("#currentPlayer").css("background-image", "url('images/Entities/player.png')");
                $("#leftText").text(userOptions[13]);
                $("#rightText").text(userOptions[14]);
                $("#story").text(scenarioText[31]);
                stage = 2;
                break;
              case 2:

        }
    });

} // end of Events
// ================================ END OF JQUERY ================================

// random number generator.
function RandomNum() {
    let chance = Math.floor((Math.random() * 100) * 1); // calculates the chance of an event happening
    return chance;
}
