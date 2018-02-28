var cards  = ["ciri","geralt","jaskier","iorweth","triss","yen",];
var oneVisible = false;
var turnCounter = 0;
var visible_nr, pairsLeft ,card ,lockCard ,desk ,flip, back, back2,front,front2;
var lock = false;
var chosen = [];
var space="";
var pack=[];
var leaderboard=[];
var hide=[];
$(document).ready(function () {
    $('.button').click(function () {
        startGame()
    });
});
function startGame() {
    desk = [];
    pack = [...cards,...cards];
    turnCounter = 0
    space = [];
    pairsLeft = 6
    makeDesk();
    $(document).ready(function () {
        $(".front").click(function () {
            flip = this.parentNode.id;
            front=this;
            back=this.nextSibling;
            revealCard(flip);
        })
    });
}
function makeDesk() {
    for (x = pack.length - 1; x >= 0; x--) {
        j = Math.floor(Math.random() * (x + 1));
        card = pack[j];
        desk = desk.concat(card);
        pack.splice(j, 1);
        space = space.concat("<div class=\"card\"\ id=\"" + x) + ("\"><div class=\"front\"></div><div class=\"back\"></div></div>");
    }
    $('.board').html(space + '<div class="score">Turn counter: 0</div>');
}
function revealCard(nr) {
    var opacityValue = $('#'+nr).css('opacity');
    if(opacityValue != 0 && lock == false && lockCard != nr){
        lock = true;
        showCard(nr);
    }
}
function showCard(nr) {
    var obraz = "url(img/"+desk[nr]+".png)";
    $('#'+nr).addClass('flipped');
    $(back).css('background-image', obraz);
    if(oneVisible == false) {
        firstCard(nr)
    }else{
        secondCard(nr)
    }
}
function firstCard(nr) {
    oneVisible = true;
    visible_nr = nr;
    lock=false;
    lockCard=nr;
    back2 = back;
    front2=front;
}
function secondCard(nr) {
    hide.push(front,front2);
    chosen.push(nr, visible_nr);
    if(desk[visible_nr] === desk[nr]){
        setTimeout(function () {hide2cards(chosen)}, 1500);
    }else{
        setTimeout(function () {restore2cards(chosen)},1000);
    }
    turnCounter++;
    $('.score').html('Turn counter: '+turnCounter);
    oneVisible = false;
    lockCard=null;
}
function hide2cards(array) {
    // $(hide).each(function() {
    //     $(this).css('opacity','0');
    // });
    array.forEach(hideCard);
    lock = false;
    pairsLeft--;
    done();
    clear();
}
function hideCard(nr) {
    $('#'+nr).css('opacity','0');
}
function restore2cards(array) {
    array.forEach(restoreCard);
    lock = false;
    clear();
}
function restoreCard(nr) {
    $('#'+nr).removeClass('flipped');
}
function done() {
    if(pairsLeft == 0) {
        $('.board').html('<h1>You WIN!<br>Done in '+turnCounter+' turns</h1><br><div class="button">Restart ?</div>');
        topScore();
        $(document).ready(function() {
            $('.button').click(function () {startGame()});
        });
    }
}
function clear() {
    chosen.splice(0,4);
    hide.splice(0,4);
}
function topScore() {
    leaderboard=leaderboard.concat(turnCounter);
    leaderboard.sort(function(a, b){return a - b});
    var leaderboards="";
    for (i=0; i < leaderboard.length;i++) {
        leaderboards=leaderboards.concat("<br>"+leaderboard[i]);
    }
    $('.leaderboards').html('Top scores'+leaderboards);
}