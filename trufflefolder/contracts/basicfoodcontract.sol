pragma solidity ^0.4.25;
contract FoodTransfer {
    
   string farmName;
   string foodName;
   
   function setFarm(string _farmName, string _foodName) public {
       farmName = _farmName;
       foodName = _foodName;
   }
   
   function getFarm() public constant returns (string, string) {
       return (farmName, foodName);
   }
    
}
}