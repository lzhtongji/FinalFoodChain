// setup server GW
// YOUR CODE

// setup directory used to serve static files
// YOUR CODE
var express = require('express');
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);
var app = express();
var cors = require('cors');
app.use(cors());

app.use(express.static('public'));
// setup data store
// YOUR CODE
db.defaults({accounts:[]}).write();
// required data store structure
// YOUR CODE
/*
{ 
    accounts:[
        {name        : '',
         email       : '',
         balance     : 0,
         password    : '',
         transactions: []}
    ] 
}
*/

app.get('/account/create/:name/:email/:password/:atype', function (req, res) {
 
    // YOUR CODE
    // Create account route
    var email = req.params.email;
    var name = req.params.name;
    var password = req.params.password;
    var atype = req.params.atype;
    var account = {
        accountT: atype,
        name: name,
        email:email,
       InputInventory: 0,
       OutputInventory: 0,
       password: password,
       pendingtransactions: [],
       producehistory: [],
       receivehistory: [],
       transactions: [],

    };

    db.get('accounts')
        .push(account)
        .write();
    

    console.log('The account for ' + name + 'was created successfully');
    res.send('The account for ' + name + 'was created successfully, yay');
    // return success or failure string (NEED TO ADD THIS)
});

//app.get('/account/login/:accountT/:email/:password', function (req, res) {
//
//    // YOUR CODE
//    // Login user - confirm credentials
//    // If success, return account object
//    var accountT = req.params.accountT
//    var email = req.params.email;
//    var password = req.params.password; 
//    // NEED TO UPDATE FOR PASSWORD VERIFICATION************************************************ 
//    var account = db.get('accounts').find({email:req.params.email}).value();  
//    res.send('welcome '+account.name+ ' your balance is = '+current_account.balance);
//    // If fail, return null
//    
//});

app.get('/account/get/:email', function (req, res) {

    // YOUR CODE
    // Return account based on email
    var email = req.params.email;
    var account = getAccount(email, {email: email});
    console.log('Retrieved account ' + account.name);
    res.send(account);
   
});

getAccount = function(email, query){
    var account = db.get('accounts')
        .find(query)
        .value();
    return account;
}
getAccountName = function(name, query){
    var account = db.get('accounts')
        .find(query)
        .value();
    return account;
}


app.get('/account/deposit/:email/:amount', function (req, res) {

    // YOUR CODE
    // Deposit amount for email
    // return success or failure string
    var email = req.params.email;
    var depositamount = req.params.amount;
    var account = getAccount(email, {email: email});

    var currentbalance = parseInt(account.balance);
    var newbalance = currentbalance + parseInt(depositamount);
    var transactions = account.transactions;
    transactions.push({Time: new Date(), Action: 'Deposit', Amount: depositamount, Description: "Deposited $" + depositamount})
    account = db.get('accounts')
        .find({email: email})
        .assign({balance: newbalance, transactions: transactions})
        .write();
    console.log('Balance for ' + account.name + 'was credited with ' + depositamount + '. The new balance is ' + account.balance);
    res.send('Balance for ' + account.name + 'was credited with ' + depositamount + '. The new balance is ' + account.balance);
});

app.get('/account/withdraw/:email/:amount', function (req, res) {

    // YOUR CODE
    // Withdraw amount for email
    // return success or failure string

    var email = req.params.email;
    var withdrawamount = req.params.amount;
    var account = getAccount(email, {email:email});
    // need failure string

    var currentbalance = parseInt(account.balance);
    var newbalance = currentbalance - parseInt(withdrawamount);
    var transactions = account.transactions;
    transactions.push({Time: new Date(), Action: 'Withdraw', Amount: withdrawamount, Description: "Withdrew $" + depositamount})

    account = db.get('accounts')
        .find({email:email})
        .assign({balance: newbalance, transactions: transactions})
        .write();
    
        console.log('Balance for ' + account.name + 'was reduced by ' + withdrawamount + '. The new balance is ' + account.balance);
        res.send('Balance for ' + account.name + 'was reduced by ' + withdrawamount + '. The new balance is ' + account.balance);
});

app.get('/account/transactions/:email', function (req, res) {

    // YOUR CODE
    // Return all transactions for account
    var email = req .params.email;
    var account = getAccount(email, {email:email});

    res.send(account.transactions);
});

app.get('/account/all', function (req, res) {
    var accounts = deb.get('accounts')
        .value();
    res.send(accounts);
    // YOUR CODE
    // Return data for all accounts
});

app.get('/account/login/:email/:accountT/:password', function(req,res) {
    var email = req.params.email;
    var accountT = req.params.accountT;
    var password = req.params.password;
    var account = getAccount(email, {accountT: accountT, email: email, password: password });
    //loginaccount = account;
    if(account == null) {
        console.log('Unable to login account ' + email + '. Ensure your account type, email and password are correct');
        res.send('Unable to login account ' + email + '. Ensure your account type, email and password are correct');
        //loginaccount = account;
    }
    else {
        console.log('Successfully logged into account ' + account.name);
        // successlogin();
        
        res.send(JSON.stringify(account));

    }});
app.get('/account/checkdelivery/:name', function(req,res) {
    var accountname = req.params.name;
    var account = getAccountName(accountname, {name:accountname});
    //loginaccount = account;
    if(account == null) {
        console.log('Something is wrong ' + accountname + ' is not found.');
        res.send('Something is wrong ' + accountname + ' is not found.');
        //loginaccount = account;
    }
    else {
        console.log('Check food sucess.' + account.name);
        // successlogin();
        
        res.send(JSON.stringify(account.pendingtransactions));

 }});
    
        

app.get('/account/acceptfood/:name', function(req,res) {
    var accountname = req.params.name;
    var account = getAccountName(accountname, {name:accountname});
    //loginaccount = account;
    if(account == null) {
        console.log('Something is wrong ' + accountname + ' is not found.');
        res.send('Something is wrong ' + accountname + ' is not found.');
        //loginaccount = account;
    }
    else {
        var waitingtransactions = account.pendingtransactions;
        var receivetransactions = account.receivehistory;
        receivetransactions.push(waitingtransactions[0]);
        waitingtransactions=[];
        account = db.get('accounts')
            .find({name: accountname})
            .assign({pendingtransactions: waitingtransactions, receivehistory: receivetransactions})
            .write();
        console.log('Food received.' + account.name);
        // successlogin();
        
        res.send('Food received.');

    }}
);
app.get('/account/transhistory/:name', function(req,res) {
    var accountname = req.params.name;
    var account = getAccountName(accountname, {name:accountname});
    //loginaccount = account;
    if(account == null) {
        console.log('Something is wrong ' + accountname + ' is not found.');
        res.send('Something is wrong ' + accountname + ' is not found.');
        //loginaccount = account;
    }
    else {
        
        console.log('Food received.' + account.receivehistory);
        // successlogin();
        
        res.send(account.receivehistory);

    }}
);
   
app.get('/account/producefood/:name/:input/:output', function(req,res) {
    var accountname = req.params.name;
    var account = getAccountName(accountname, {name:accountname});
    var inputamount = parseInt(req.params.input);
    var outputamount = parseInt(req.params.output);
    var currentinput = account.InputInventory;
    var currentoutput = account.OutputInventory;
    var newinput = currentinput - inputamount;
    var newoutput = currentoutput + outputamount;
    var producehistory1 = account.producehistory;
    var producefrom = account.receivehistory[producehistory1.length];
    waitingtransactions=[];
    //loginaccount = account;
    if(account == null) {
        console.log('Something is wrong ' + accountname + ' is not found.');
        res.send('Something is wrong ' + accountname + ' is not found.');
        //loginaccount = account;
    }
    else {
        
        console.log('Check food sucess.' + account.name);
        // successlogin();
        console.log(producefrom);
        if (account.accountT == "Farm"){
            producehistory1.push({Time: new Date(), Action: 'Produce', Amount: inputamount, Owner: accountname, InputDetail: []});

            account = db.get('accounts')
                .find({name: accountname})
                .assign({InputInventory: newinput, OutputInventory: newoutput,producehistory:producehistory1})
                .write();
            res.send("Successfully produced.");
        }
        else {
            producehistory1.push({Time: new Date(), Action: 'Produce', Amount: inputamount, Owner: accountname, InputDetail: producefrom});

            account = db.get('accounts')
                .find({name: accountname})
                .assign({InputInventory: newinput, OutputInventory: newoutput,producehistory:producehistory1})
                .write();
            res.send("Successfully produced.");
        }

 }});
    
app.get('/account/transferfood/:name/:receiver/:amount',function(req,res) {

    var accountname = req.params.name;
    var receivername = req.params.receiver;
    var transferamount = parseInt(req.params.amount);
    console.log(accountname);
    console.log(receivername);
    var account = getAccountName(accountname, {name:accountname});
    //var account = getAccount("n2@mit.edu", {email:"n2@mit.edu"}); 
    console.log(account);
    
    var receiveraccount = getAccountName(receivername, {name:receivername});
    console.log(receiveraccount);
    
    if(account == null){
        console.log('Something is wrong, cannot find account ' + accountname + '.');
        res.send('Something is wrong, cannot find account ' + accountname + '.');

    }
    else{
        if(receiveraccount == null) {
            if(account.accountT == "Restaurant") {
                
                var currentoutput = account.OutputInventory;
                var newoutput = currentoutput - transferamount;
                if(newoutput <0) {
                    console.log('Not enough inventory, please make more.');
                    res.send('Not enough inventory, please make more.');
            
                } else {
                  
                    // transfer food to next stuff
                    var sendertransactions = account.transactions;
                    var detail = account.producehistory[account.producehistory.length-1];
                    console.log(account.transactions.length-1);
                    sendertransactions.push({Time: new Date(), Action: 'Sell', Amount: transferamount, Seller: accountname, Receiver: receivername, Detail: detail});
                    console.log(detail);
                    account = db.get('accounts')
                        .find({name: accountname})
                        .assign({OutputInventory: newoutput, transactions: sendertransactions})
                        .write();
                    console.log('Successfully sell ' + receivername + ' ' + transferamount+' amount of burgers.');
                    res.send('Successfully sell ' + receivername + ' ' + transferamount+' amount of burgers. ID is '+ account.transactions.length);
            
                }
            }
            else {
                console.log('Cannot find account ' + receivername + '.');
                res.send('Cannot find account ' + receivername + '.');
            }
            

        }
        else{
        
            if(account.accountT == "Farm"){
            
                if(receiveraccount.accountT != "Processor") {
                    console.log('You are sending it to a wrong placee, ' + receivername + 'is not a Processor.');
                    res.send('You are sending it to a wrong placee, ' + receivername + 'is not a Processor.');
                } else {
                    var currentoutput = account.OutputInventory;
                    var newoutput = currentoutput - transferamount;
                    if(newoutput <0) {
                        console.log('Not enough inventory, please load more.');
                        res.send('Not enough inventory, please load more.');
                
                    } else {
                        var receivetransaction = receiveraccount.pendingtransactions;
                        var receivercurrentinput = receiveraccount.InputInventory;
                        var receivernewinput = receivercurrentinput+transferamount;
                        
                        // transfer food to next stuff
                        var sendertransactions = account.transactions;
                        var detail = account.producehistory[account.producehistory.length-1];
                        console.log(account.transactions.length-1);
                        console.log(detail);
                        sendertransactions.push({Time: new Date(), Action: 'Sell', Amount: transferamount, Seller: accountname, Receiver: receivername, Detail: detail});
                            
                        account = db.get('accounts')
                            .find({name: accountname})
                            .assign({OutputInventory: newoutput, transactions: sendertransactions})
                            .write();
                        receivetransaction.push({Time: new Date(), Action: 'Receive food', Amount: transferamount, TransferFrom: accountname, Receiver: receivername,  Detail: detail});
                        account = db.get('accounts')
                            .find({name: receivername})
                            .assign({InputInventory: receivernewinput, pendingtransactions: receivetransaction})
                            .write();
                        console.log('Successfully sent ' + receivername + ' ' + transferamount+' amount of grain.');
                        res.send('Successfully sent ' + receivername + ' ' + transferamount+' amount of grain.');
                
                    }
                }
            } else {
                if (account.accountT == "Processor"){
            
                    if(receiveraccount.accountT != "Restaurant") {
                        console.log('You are sending it to a wrong placee, ' + receivername + 'is not a Restaurant.');
                        res.send('You are sending it to a wrong placee, ' + receivername + 'is not a Restaurant.');
                    } else {
                        var currentoutput = account.OutputInventory;
                        var newoutput = currentoutput - transferamount;
                        if(newoutput <0) {
                            console.log('Not enough inventory, please make more.');
                            res.send('Not enough inventory, please make more.');
                    
                        } else {
                            var receivetransaction = receiveraccount.pendingtransactions;
                            var receivercurrentinput = receiveraccount.InputInventory;
                            var receivernewinput = receivercurrentinput+transferamount;
                            
                            // transfer food to next stuff
                            var sendertransactions = account.transactions;
                            var detail = account.producehistory[account.producehistory.length-1];
                            console.log(account.transactions.length-1);
                            console.log(detail);
                            sendertransactions.push({Time: new Date(), Action: 'Sell', Amount: transferamount, Seller: accountname, Receiver: receivername, Detail: detail});
                            console.log(detail);
                            account = db.get('accounts')
                                .find({name: accountname})
                                .assign({OutputInventory: newoutput, transactions: sendertransactions})
                                .write();
                            receivetransaction.push({Time: new Date(), Action: 'Receive food', Amount: transferamount, TransferFrom: accountname, Receiver: receivername, Detail: detail});
                            account = db.get('accounts')
                                .find({name: receivername})
                                .assign({InputInventory: receivernewinput, pendingtransactions: receivetransaction})
                                .write();
                            console.log('Successfully sent ' + receivername + ' ' + transferamount+' amount of bread.');
                            res.send('Successfully sent ' + receivername + ' ' + transferamount+' amount of bread.');
                    
                        }
                    }

                } else {
                    }
                }
            }
        }
    }

)
//need to start up server

app.get('/account/producefood/:name/:inputamount/:outputamount',function(req,res) {

    var inputamount = parseInt(req.params.inputamount);
    var ouputamount = parseInt(req.params.ouputamount);
    var accountname = req.params.name;
    console.log(accountname);
    var account = getAccountName(accountname, {name:accountname});
    if (account.accountT == "Farm"){
        var inventory
        account = db.get('accounts')
            .find({name: accountname})
            .assign({OutputInventory: newoutput, transactions: sendertransactions})
            .write();
    }

})
app.get('/account/:name/:foodid',function(req,res) {

    var foodid = parseInt(req.params.foodid);
    var accountname = req.params.name;
    console.log(accountname);
    var account = getAccountName(accountname, {name:accountname});
    if(account == null) {
        console.log('Unable find account ' + account + '.');
        res.send('Unable find account ' + account + '.');
        //loginaccount = account;
    }
    else {
        console.log('Successfully checked' + account.name);
        // successlogin();
        
        res.send(JSON.stringify(account.transactions[foodid-1]));

}});
app.listen(8000, function(){
    console.log('Listening at port 8000')
})
