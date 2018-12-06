// var superagent = require('superagent')
var AccountLoggedin; 
var TypeLoggedin;
var tempaccount;
//var TypeReceiver;
//var AccountReceiver;
function create() {
    // -------------------------------------
    //  YOUR CODE GW
    //  Create user account on server
     var name = document.getElementById('createName').value;
     var email = document.getElementById('createEmail').value;
     var password = document.getElementById('createPassword').value;
     var status = document.getElementById('status');
     var atype = document.getElementById('CreateAccountType').value;
     


     url = '/account/create/' + name + '/' + email + '/' + password+'/'+atype;

     superagent
        .get(url)
        .end(function(err, res){
           
            if(err){
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text)
            }
        })

    // -------------------------------------    
}


function deposit() {
    // -------------------------------------
    //  YOUR CODE
    //  Deposit funds user funds on server
    // -------------------------------------
    var email = document.getElementById('depositEmail').value;
    var amount = document.getElementByIdById('depositAmount').value;
    var status = document.getElementById('status');

    var url = '/account/deposit/' + email + '/' + amount;

    superagent
        .get(url)
        .end(function(err, res){
            
            if(err){
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text)
            }
        });
}

function withdraw() {
    // -------------------------------------
    //  YOUR CODE
    //  Withdraw funds user funds on server
    // -------------------------------------
    var email = document.getElementById('withdrawEmail').value;
    var amount = document.getElementById('withdrawAmount').value;
    var status = document.getElementById('status');

    var url = '/account/withdraw/' + email + '/' + amount;

    superagent
        .get(url)
        .end(function(err, res){
           
            if(err){
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text)
            }
        });
}

function transactions() {
    // -------------------------------------
    //  YOUR CODE
    //  Get all user transactions
    // -------------------------------------
    var email = document.getElementById('transactionsEmail').value;
    var status = document.getElementById('status');

    var url = '/account/transactions/' + email;

    superagent
        .get(url)
        .end(function(err, res){
           
            if(err){
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text)
            }
        });
}

function login() {
    // -------------------------------------
    //  YOUR CODE
    //  Get user balance
    // -------------------------------------
    var email = document.getElementById('loginEmail').value;
    var accountT = document.getElementById('AccountType').value;
    var password = document.getElementById('loginPassword').value;
    var status = document.getElementById('status');

    var url = '/account/login/' + email +'/' + accountT +'/' + password;

    superagent
        .get(url)
        .end(function(err, res){
            if(err){
                console.log(err)
            }
            else{
                console.log(res.body);
                try{
                    tempaccount = eval ("(" + res.text + ")");
                    //statusbar.innerHTML = tempaccount.accountT;
                    if (tempaccount.pendingtransactions.length == 0){
                        statusbar.innerHTML = "Welcome "+ tempaccount.name;
                    } else {
                        statusbar.innerHTML = "Welcome "+ tempaccount.name+" , you have a pending delivery, please check"; 
                    }
                    
                    
                    
                    successlogin();
                    document.getElementById("status").innerText = "Welcome, please use navigation bar to choose functions, or enter food address to check your delivery."
                    //status.innerText = "Welcome" + tempaccount.name;
                    AccountLoggedin = tempaccount.name;
                }
                catch{
                    statusbar.innerHTML = JSON.stringify(res.text);
                }
            }
        });
}
function CheckDelivery(){
    var url = '/account/checkdelivery/' + AccountLoggedin;
    superagent
        .get(url)
        .end(function(err, res){
           
            if(err){
                console.log(err)
            }
            else{
                console.log(res.body);
                web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
                web3.eth.defaultAccount = web3.eth.accounts[0];
                var address1 = web3.eth.accounts[0];
                console.log(web3.eth.accounts[0]);
                var FoodContract = web3.eth.contract([
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_foodName",
                            "type": "string"
                        },
                        {
                            "name": "_originalFarm",
                            "type": "string"
                        }
                    ],
                    "name": "FoodCreation",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "getFood",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                }
            ]);
            
                var FoodTrans = FoodContract.at('0xfc6c5083d6d34b8877d90fd79f1ac96358c89ede');
                console.log(FoodTrans);
            
                FoodTrans.getFood(function(error, result) {
                    if (!error) {
                        document.getElementById("FoodInfo").innerText = JSON.stringify(result[0]+" from "+result[1]);

                    } else
                         console.log(error);
                });
                document.getElementById("status").innerText = JSON.stringify(res.text);
            }
        });
}
function AcceptFood(){
    var url = '/account/acceptfood/' + AccountLoggedin;
    superagent
        .get(url)
        .end(function(err, res){
           
            if(err){
                console.log(err)
            }
            else{
                console.log(res.body);

                document.getElementById("status").innerText = JSON.stringify(res.text)
            }
        });

}

function ProduceFood(){
    var input = document.getElementById('InputAmount').value;
    var output = document.getElementById('OutputAmount').value;
    var status = document.getElementById('status');

    var url = '/account/producefood/' + AccountLoggedin +'/' + input +'/' + output;
    superagent
    .get(url)
    .end(function(err, res){
       
        if(err){
            console.log(err)
        }
        else{
            console.log(res.body);

            document.getElementById("status").innerText = JSON.stringify(res.text)
        }
    });


}
function transhistory(){
    var status = document.getElementById('status');

    var url = '/account/transhistory/' + AccountLoggedin ;
    superagent
    .get(url)
    .end(function(err, res){
       
        if(err){
            console.log(err)
        }
        else{
            console.log(res.body);

            document.getElementById("status").innerText = JSON.stringify(res.text)
        }
    });

}
function allData() {
    // -------------------------------------
    //  YOUR CODE
    //  Get all data
    // -------------------------------------
    var url = '/account/all';
    var status = document.getElementById('status');

    superagent
        .get(url)
        .end(function(err, res){
           
            if(err){
                console.log(err)
            }
            else{
                console.log(res.body);

                status.innerHTML = JSON.stringify(res.text)
            }
        });

}
function TransferFood(){
    var PName = document.getElementById("ProductName").value;
    var AccountReceiver = document.getElementById("ReceiverName").value;

    console.log(AccountReceiver);
    var amount = document.getElementById("TransferAmount").value;
    var url = '/account/transferfood/' + AccountLoggedin + '/' + AccountReceiver + '/'+ amount;
    var status = document.getElementById('status');
    
    superagent
        .get(url)
        .end(function(err,res){
            if(err){
                console.log(err)
            }
            else{
                console.log(res.body);
                status.innerHTML = JSON.stringify(res.text);
                web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	web3.eth.defaultAccount = web3.eth.accounts[0];
	var address1 = web3.eth.accounts[0];
	console.log(web3.eth.accounts[0]);
	var FoodContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_foodName",
				"type": "string"
			},
			{
				"name": "_originalFarm",
				"type": "string"
			}
		],
		"name": "FoodCreation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getFood",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);

    var FoodTrans = FoodContract.at('0xfc6c5083d6d34b8877d90fd79f1ac96358c89ede');
	console.log(FoodTrans);

		FoodTrans.FoodCreation(PName,AccountLoggedin);


            }
        });
}

function CheckFood(){
    var name = document.getElementById("ResName").value;
    var FoodID = document.getElementById("FoodID").value;
    var url = '/account/'+ name +'/'+FoodID;
    var status = document.getElementById('status');

    superagent
        .get(url)
        .end(function(err, res){
           
            if(err){
                console.log(err)
            }
            else{
                console.log(res.body);

                status.innerHTML = JSON.stringify(res.text)
            }
        });

}


