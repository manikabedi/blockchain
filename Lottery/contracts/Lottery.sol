pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players; // we will make this a public dynamic array and we are fine if other people see who has entered the lottery

    function Lottery() public {
        manager = msg.sender;
    }
    
// this function expects some ether to be sent if someone wants to enter our Lottery
    function enter() public payable {
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }
    
    //we will create this as a helper function so we will make it private
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {
        //require(msg.sender == manager);
        
        uint index = random() % players.length;
        address myAddress = this;
        players[index].transfer(myAddress.balance); // this will return an address
        players = new address[](0); // we are initializing a dynamic array of size 0
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
}
