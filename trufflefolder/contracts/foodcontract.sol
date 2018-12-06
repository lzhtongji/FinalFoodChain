pragma solidity ^0.4.25;
contract FoodTransfer {
    struct Food {
        string foodName; // always bread for starters
        string originalFarm; // Origin farm name; for checking if potentially contaminated
    }

    event Departed (
        string currentOwner
    );

    event Arrived(
        string currentOwner
    );

    string public foodName;
    string public from;
    string public to;
    string public originalFarm;
    string public currentOwner;

    Food[] public foods;

    function FoodCreation(
        string _foodName,
        string _originalFarm,
    ) public {
        foodName = _foodName;
        originalFarm = _originalFarm;
        
        foods.push(Food({
            foodName: _foodName,
            originalFarm: _originalFarm,
        }));
    }
    
    function FoodShipment(
        string _foodName,
        string _originalFarm,
    ) public {

    }

    function FoodConsumption(
        string _foodName,
        string _originalFarm,
    ) public {

    }
    
    function FoodContamination(
        string _foodName,
        string _originalFarm, 
    ) public {

    }

}