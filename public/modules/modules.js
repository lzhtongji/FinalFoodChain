var ui = {};

ui.navigation = `    
<nav aria-label="breadcrumb">
<ol class="breadcrumb">
    <li class="breadcrumb-item active" aria-current="page" style="font-size:18px;font-weight:bold">FoodBlock &nbsp;&nbsp; </a></li>
    <li class="breadcrumb-item"><a href="#"  onclick="loadLogin()">Account Login</a></li>
    <li class="breadcrumb-item"><a href="#" onclick="loadPartners()">Current Partners</a></li>
    <li class="breadcrumb-item"><a href="#" onclick="loadCreateAccount()">Become a Partner</a></li>
    <li class="breadcrumb-item"><a href="#" onclick="loadCheck()">Check Your Food</a></li>
</ol>
</nav>

`;

ui.createAccount = `
<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
<div class="card-header">Become a Partner</div>
<div class="card-body">
    <p class="card-text">Account Type</p>
    <p>
    <select id = "CreateAccountType" class="form-control" aria-describedby="basic-addon3">
    <option value>Choose...</option>
    <option value="Farm">Farm</option>
    <option value="Processor">Processor</option>
    <option value="Restaurant">Restaurant</option>
    </select>
    </p>
    <p class="card-text">   </p>
    <p class="card-text">Name</p>    
    <input type="text" class="form-control" placeholder="Enter Name"  id="createName" aria-describedby="basic-addon3">
    <p class="card-text">   </p>
    <p class="card-text">Email address</p> 
    <input type="text" class="form-control" placeholder="Enter Email" id="createEmail" aria-describedby="basic-addon3">
    <p class="card-text">   </p>
    <p class="card-text">Password</p> 
    <input type="password" class="form-control" placeholder="Enter Password"  id="createPassword" aria-describedby="basic-addon3">
    <p class="card-text">   </p>
    <a href="#" class="btn btn-light" onclick = "create()">Create Account</a>
    <div id="status"></div>
</div>
</div> 
`;

ui.transferfood = `
<div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
<div class="card-header">Transfer Food</div>
<div class="card-body">
  <p class="card-text">Receiver</p>
  <input type="text" class="form-control" placeholder="Enter Name" id="ReceiverName" aria-describedby="basic-addon3">
  <p class="card-text">   </p>
  <p class="card-text">Product Name</p>
  <input type="text" class="form-control" placeholder="Enter Name" id="ProductName" aria-describedby="basic-addon3">
  <p class="card-text">   </p>

  <p class="card-text">Amount</p> 
  <input type="number" class="form-control" placeholder="Enter amount" value = 0 id="TransferAmount" aria-describedby="basic-addon3">
  <p class="card-text">   </p>

  <a href="#" class="btn btn-light" onclick = "TransferFood()">Transfer</a>
  <div id="status"></div>
</div>
</div>`;

ui.login = `
<div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
  <div class="card-header">Login</div>
  <div class="card-body">
    <p class="card-text">Account Type</p>
    <p>
    <select id = "AccountType" class="form-control" aria-describedby="basic-addon3">
    <option value>Choose...</option>
    <option value = "Farm">Farm</option>
    <option value = "Processor">Processor</option>
    <option value = "Restaurant">Restaurant</option>
    </select>
    </p>
    <p> </p>
    <p class="card-text">   </p>

    <p class="card-text">Email</p>
    <input type="text" class="form-control" placeholder="Enter Email" id="loginEmail" aria-describedby="basic-addon3">

    <p class="card-text">   </p>
    <p class="card-text">Password</p> 
    <input type="password" class="form-control" placeholder="Enter Password"  id="loginPassword" aria-describedby="basic-addon3">
    <p class="card-text">   </p>

    <a href="#" class="btn btn-light" onclick = "login()">Login</a>
    <div id="status"></div>
  </div>
</div>
`;

ui.checkFood = `
<div class="card text-white bg-warning mb-3" style="max-width: 18rem;">
<div class="card-header">Check you Food</div>
<div class="card-body">


  <p class="card-text">   </p>
  <p class="card-text">Food ID</p> 
  <input type="text" class="form-control" placeholder="Enter Food ID" id="FoodID" aria-describedby="basic-addon3">
  <p class="card-text">   </p>
  <p class="card-text">Restaurant Name</p> 

  <input type="text" class="form-control" placeholder="Enter Restaurant Name" id="ResName" aria-describedby="basic-addon3">

  <p class="card-text">   </p>

  <a href="#" class="btn btn-light" onclick = "CheckFood()">Check</a>
  <div id="status"></div>
</div>
</div>`;

ui.partners = `
<div class="card text-white bg-danger mb-3" style="max-width: 40rem;">
<div class="card-header">Current Partners</div>
<div class="card-body">
<table class="table">
  <thead>
    <tr>
      <th scope="col">Farms</th>
      <th scope="col">Processors</th>
      <th scope="col">Restaurants</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">LGO Farm</th>
      <td>Lean Processor</td>
      <td>Random Restaurant</td>
    </tr>
    <tr>
      <th scope="row">LGO Farm 1</th>
      <td>Lean Processor 1</td>
      <td>Random Restaurant 1</td>
    </tr>

  </tbody>
</table>
<div id="status"></div>
  </div>
</div>`;

ui.transactions = `
<div class="card text-white bg-info mb-3" style="max-width: 18rem;">
<div class="card-header">Transactions</div>
<div class="card-body">
  <p class="card-text">Email</p>
  <input type="text" class="form-control" placeholder="Enter Email" id="transactionsEmail" aria-describedby="basic-addon3">
  <p class="card-text">   </p>
  <a href="#" class="btn btn-light" onclick = "transactions()">Show Transactions</a>
  <div id="status"></div>
  </div>
</div>`;

ui.balance = `
<div class="card text-white bg-success mb-3" style="max-width: 18rem;"><div class="card-header">Balance</div>
<div class="card-body">
  <p class="card-text">Email</p>
  <input type="text" class="form-control" placeholder="Enter Email" id="balanceEmail" aria-describedby="basic-addon3">
  <p class="card-text">   </p>
  <a href="#" class="btn btn-light" onclick = "balance()">Show Balance</a>
  <div id="status"></div>
  </div>
</div>`;

ui.default = `
<div class="card bg-light mb-3" style="max-width: 18rem;">
<div class="card-header">FoodBlock</div>
<div class="card-body">
  <h5 class="card-title">Welcome to FoodBlock</h5>
  <p class="card-text">Secure your food!
        <div>
                <img src="FoodChain Logo.png" height="240">
        </div>
</div>`;

ui.allData = `
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">All Data In Store</h5>
    <a href="#" class="btn btn-primary" onclick = "allData()">Show All Data</a>
  </div>
  <div id="status"></div>
</div>`;

ui.navbar = `
<nav aria-label="breadcrumb">
<ol class="breadcrumb">
    <li class="breadcrumb-item active" aria-current="page" style="font-size:18px;font-weight:bold">FoodBlock &nbsp;&nbsp; </a></li>
    <li class="breadcrumb-item"><a href="#"  onclick="loadTranferFood()">Sell Food</a></li>
    <li class="breadcrumb-item"><a href="#"  onclick="LoadProduce()">Produce Food</a></li>
    <li class="breadcrumb-item"><a href="#" onclick="ViewHist()">View History</a></li>
    <li class="breadcrumb-item"><a href="#" onclick="CheckInventory()">Check Inventory</a></li>
    <li class="breadcrumb-item"><a href="#" onclick="Logout()">Logout</a></li>
</ol>
</nav>
`;
ui.welcome = `
<div class="card text-white bg-secondary mb-3" style="max-width: 36rem;">
  <div class="card-header">Welcome</div>
  <div class="card-body">


    <p class="card-text">   </p>
    
    <a href="#" class="btn btn-light" onclick = "CheckDelivery()">CheckDelivery</a>
    <a href="#" class="btn btn-light" onclick = "AcceptFood()">AcceptFood</a>
    <div id="FoodInfo"></div>
    <div id="status" size="20"></div>
		<img id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">

    </div>
</div>
`;
ui.produce = `
<div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
<div class="card-header">Produce Food</div>
<div class="card-body">
  <p class="card-text">Input</p>
  <input type="number" class="form-control" placeholder="Enter amount" value = 0 id="InputAmount" aria-describedby="basic-addon3">
  <p class="card-text">   </p>
  <p class="card-text">Output</p> 
  <input type="number" class="form-control" placeholder="Enter amount" value = 0 id="OutputAmount" aria-describedby="basic-addon3">
  <p class="card-text">   </p>

  <a href="#" class="btn btn-light" onclick = "ProduceFood()">Produce</a>
  <div id="status"></div>
</div>
</div>`;
ui.history =  `
<div class="card text-white bg-success mb-3" style="max-width: 18rem;"><div class="card-header">History</div>
<div class="card-body">
  <a href="#" class="btn btn-light" onclick = "transhistory()">Show History</a>
  <div id="status"></div>
  </div>
</div>`;


var target     = document.getElementById('target');

var navigation = document.getElementById('navigation');
navigation.innerHTML = ui.navigation;
var statusbar = document.getElementById('statusbar');


var loadCreateAccount = function(){
    target.innerHTML = ui.createAccount;
};

var loadLogin = function(){
    target.innerHTML = ui.login;
    loginstatus();
};

var status     = document.getElementById('status');

var loadCheck = function(){
    target.innerHTML = ui.checkFood;
};

var loadPartners = function(){
    target.innerHTML = ui.partners;
};
// 
var loadTranferFood = function(){
    target.innerHTML = ui.transferfood;
};
// 
// var loadBalance = function(){
// 
//     target.innerHTML = ui.balance;
// };
// 
var successlogin = function(){
  navigation.innerHTML = ui.navbar;
  target.innerHTML = ui.welcome;


};
var loginstatus = function(){
  status.innerHTML = 'welcome';
}
var defaultModule = function(){
    navigation.innerHTML = ui.navigation;
    target.innerHTML = ui.default;
};
// 
// var loadAllData = function(){
//     
//     target.innerHTML = ui.allData;
// };
var Logout = function(){
  defaultModule();
  statusbar.innerHTML = null;
  Accountloggedin = null;
  TypeLoggedin = null;
};
var LoadProduce = function(){
  target.innerHTML=ui.produce;
};
var ViewHist = function(){
  target.innerHTML=ui.history;
};
defaultModule();
