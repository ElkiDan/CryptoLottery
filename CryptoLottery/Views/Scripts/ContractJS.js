var amountOfPayment = 0.01; //global var
var myContractInstance;
var web3;
var numberOfParticipents = 2;
var randomNumber;
var address;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var Web3 = require('web3');
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); //http provider
    var version = web3.version.api;
}

function getBalance(address) {
    return new Promise(function (resolve, reject) {
        web3.eth.getBalance(address,
            function (error, result) {
                if (error) {
                    console.log("Error!");
                } else {
                    resolve(result);
                }
            });
    });
}

var account = web3.eth.accounts[0];
if (account == null) {
    console.log("Not Connected");
    $("#currentBalance").attr("value", balance.toString() + " ETHER");
    var bla = 2;
} else {
    console.log("Connected");
    getBalance(account).then((result) => {
        var balance = result.c[0] / 10000;
        $("#currentBalance").attr("value", balance.toString() + " ETHER");
        var bla = 2;
    });

}
var accountInterval = setInterval(function () {
    if (web3.eth.accounts[0] !== account) {

        account = web3.eth.accounts[0];
        if (account != null) {
            console.log("Connected");
            getBalance(account).then((result) => {
                var balance = result.c[0] / 10000;
                $("#currentBalance").attr("value", balance.toString() + " ETHER")
                var bla = 2;
                // document.getElementById("currentBalance").value = balance.toString() + " ETHER";
            });
        } else {
            console.log("Logged Out");
            $("#currentBalance").attr("value","You Are Not Connected");
            var bla = 2;
        }
    } else {
        if (account != null) {
            getBalance(account).then((result) => {
                var balance = result.c[0] / 10000;
                $("#currentBalance").attr("value", balance.toString() + " ETHER")
//                document.getElementById("currentBalance").value = balance.toString() + " ETHER";
            });
        } else {
            $("#currentBalance").attr("value", "You Are Not Connected");
            var bla = 2;
        }
    }
},
    100);

var conAbi = JSON.parse('[ { "anonymous": false, "inputs": [ { "indexed": false, "name": "winner", "type": "address" }, { "indexed": false, "name": "lotteryInitiator", "type": "address" } ], "name": "AnnounceWinner", "type": "event" }, { "constant": false, "inputs": [ { "name": "_hashedRandom", "type": "bytes32" }, { "name": "amountOfWeiSent", "type": "uint256" } ], "name": "addNewPlayer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "checkIfLotteryCanStart", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getMyMoney", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "resetContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "stageTwo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [], "name": "AnnonceSentRandom", "type": "event" }, { "constant": false, "inputs": [ { "name": "_stringRandomNumber", "type": "string" } ], "name": "submitRandomness", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": true, "inputs": [], "name": "getContractBalance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "add", "type": "address" } ], "name": "getDisHonestPlayer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "add", "type": "address" } ], "name": "getHonestPlayer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "add", "type": "address" } ], "name": "getPlayerHashedRandom", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "add", "type": "address" } ], "name": "getPlayerRandom", "outputs": [ { "name": "", "type": "int256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "getRandom", "outputs": [ { "name": "", "type": "int256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "honestPlayersAddresses", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "i", "type": "uint256" } ], "name": "honestPlayersIndex", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "players", "outputs": [ { "name": "playersAddress", "type": "address" }, { "name": "hashedRandom", "type": "bytes32" }, { "name": "amountOfEtherSent", "type": "uint256" }, { "name": "sentRandom", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "randomNumbersGathered", "outputs": [ { "name": "", "type": "int256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "s", "type": "string" } ], "name": "stringToInt", "outputs": [ { "name": "result", "type": "int256" } ], "payable": false, "stateMutability": "pure", "type": "function" } ]');
var myContract = web3.eth.contract(conAbi);
var contractAddress = "0x7be4cee570febc07e37b8760639078e129889ee5";
myContractInstance = myContract.at(contractAddress); //the contract address


function play() {
    //if (document.getElementById("randomNumber").value != "") {
    if ($("#randomNumber").val() != "") {
        //document.getElementById("playBtn").disabled = true;
        $("#playBtn").attr("disabled",true);
        $("#playBtn").css("opacity", "0.6");

        address = web3.eth.accounts[0];
        //check if its an address.
        var isAddress = web3.isAddress(address);
        if (isAddress) {

            getBalance(address).then((result) => {
                var balance = result.c[0] / 10000;
                if (balance >= amountOfPayment) {
                    //hash the random number 
                    //randomNumber = document.getElementById("randomNumber").value;
                    randomNumber = $("#randomNumber").val();
                    var hashOfRandom = web3.sha3(randomNumber);
                    //web3.eth.sendTransaction({
                    //    from: address,
                    //    to: contractAddress,
                    //    value: web3.toWei(0.01, "ether")
                    //},
                    //    function (error, result) {
                    //        if (!(error)) {
                    //        }
                    //    });

                    //myContractInstance.addNewPlayer(hashOfRandom,
                    //    10000000000000000,
                    //    function (error, result) {
                    //        if (!(error)) {
                    //            //console.log(result);
                    //            document.getElementById("buttonsDiv").style.display = "none";
                    //            document.getElementById("loaderDiv").style.display = "flex";
                    //            alert("You are in the game!");
                    //        }
                    //    });
                } else {
                    alert("You are out of money!");
                }
            });
        } else {
            alert("This is not an address!");
            $("#playBtn").attr("disabled", false);
            $("#playBtn").css("opacity", "1");
        }
    } else {
        alert("Please Enter Random Number!");
    }
}

var AnnonceSentRandom = myContractInstance.AnnonceSentRandom();

AnnonceSentRandom.watch(function (error, result) {
    if (!error) {
        document.getElementById("loaderDiv").style.display = "none";
        document.getElementById("buttonsDiv").style.display = "flex";
        document.getElementById("randomBtn").disabled = false;
        document.getElementById("randomBtn").style.opacity = "1";
        document.getElementById("checkForStartBtn").disabled = false;
        document.getElementById("checkForStartBtn").style.opacity = "1";
        alert("Now you can send your random!");
    } else {
        console.log(error);
    }
});

var AnnonceWinnerAndBonusAct = myContractInstance.AnnounceWinner();

AnnonceWinnerAndBonusAct.watch(function (error, result) {
    if (!error) {
        var winnerAddress = result.args.winner;
        var bonusActAddress = result.args.lotteryInitiator;
        document.getElementById("buttonsDiv").style.display = "none";
        if (winnerAddress == address) {
            document.getElementById("winnerDiv").style.display = "flex";
        } else {
            document.getElementById("loserDiv").style.display = "flex";
        }
        if (bonusActAddress == address) {
            document.getElementById("bonusDiv").style.display = "flex";
        }
    } else {
        console.log(error);
    }
});

//var cheatPlayer = myContractInstance.CheatPlayerEvent();

//cheatPlayer.watch(function (error, result) {
//    if (!error) {
//        var cheatPlayerAddress = result.args.cheatPlayerAddress;
//        if (cheatPlayerAddress == address) {
//            document.getElementById("buttonsDiv").style.display = "none";
//            document.getElementById("cheatPlayerDiv").style.display = "flex";
//        }
//    } else {
//        console.log(error);
//    }
//});

function sendRandom() {
    if (document.getElementById("randomNumber").value != "") {
        document.getElementById("randomBtn").disabled = true;
        document.getElementById("randomBtn").style.opacity = "0.6";

        var random = document.getElementById("randomNumber").value.toString();
        myContractInstance.submitRandomness(
            random,
            function (error, result) {
                if (!error) {
                    alert("OK, now wait please for the announce!");
                } else {
                    console.log("You are out of the Game!");
                }
            });
    } else {
        alert("Please Enter Random Number!");
    }
}

function checkIfLotteryCanStart() {
    myContractInstance.checkIfLotteryCanStart(
        function (error, result) {
            if (!error) {
                console.log("Trying");
            } else {
                console.log("failed!");
            }
        });
}

function generateRandomNumber() {
        var number = Math.floor((Math.random() * 100000) + 1);
        document.getElementById("randomNumber").value = number.toString();
}