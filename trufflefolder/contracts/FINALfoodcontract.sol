pragma solidity ^0.4.18;
contract FoodTransfer {

    string foodName; // always bread for starters
    string originalFarm; // Origin farm name; for checking if potentially contaminated


    
    function FoodCreation(
        string _foodName,
        string _originalFarm        
    ) public {
 

        foodName = _foodName;
        originalFarm = _originalFarm;
        
    }


    function getFood() view public returns (string, string) {
        return (foodName, originalFarm);
    }
     

}