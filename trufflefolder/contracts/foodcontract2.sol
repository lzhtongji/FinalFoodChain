pragma solidity ^0.4.20;
contract FoodTracker {
    //AssetTracker = FoodTracker; Asset = Food; name = foodName;
    //assetStore = foodStore; AssetCreate = FoodCreate; AssetTransfer = FoodTransfer
    string id;

    function setAccount(string accountname) public {
        id = accountname;
    }

    function getAccountid() public constant returns (string) {
        return id;
    }

    struct Food {
        string foodName; // always bread for starters
        string description; //could be quantity
        string originalFarm; // Origin farm name; for checking if potentially contaminated
        bool initialized;
    }

    mapping(string => Food) private foodStore;
    foodStore[uuid] = Food(foodName, description, true, manufacturer);
    mapping(address => mapping(string => bool)) private walletStore;
    walletStore[msg.sender][uuid] = true;

    event FoodCreate(address account, string uuid, string manufacturer);
    event RejectCreate(address account, string uuid, string message);
    event FoodTransfer(address from, address to, string uuid);
    event RejectTransfer(address from, address to, string uuid, string message);

    function createFood(string foodName, string description, string uuid, string manufacturer) {
        if(foodStore[uuid].initialized) {
            RejectCreate(msg.sender, uuid, "Food with this id already exists.");
            return;
        }
        foodStore[uuid] = Food(name, description, true, manufacturer);
        walletStore[msg.sender][uuid] = true;
        FoodCreate(msg.sender, uuid, manufacturer);
    }

    function transferFood(address to, string uuid) {
        if(!foodsStore[uuid].initialized) {
            RejectTransfer(msg.sender, to, uuid, "No food with this id exists");
            return;
        }
        if(!walletStore[msg.sender][uuid]){
            RejectTransfer(msg.sender, to, uuid, "Sender does not own this food.");
            return;
        }

        walletStore[msg.sender][uuid] = false;
        walletStore[to][uuid] = true;
        FoodTransfer(msg.sender, to uuid);
    }
    
    function getFoodByUUID(string uuid) constant returns (string, string, string) {
        return (foodStore[uuid].foodName, foodStore[uuid].description, foodStore[uuid].manufacturer);
    }
    
    function isOwnerOf(address owner, string uuid) constant returns (bool) {
        if(walletStore[owner][uui]){
            return true;
        }
        return false;
    }

}