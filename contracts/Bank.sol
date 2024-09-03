// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Bank {
    uint256 public addressCount;
    address public admin;
    mapping(uint256 => address) public addressLedger;
    mapping(address => uint256) public balanceLedger;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not Allowed");
        _;
    }

    modifier balanceCheck(uint256 amt) {
        require(balanceLedger[msg.sender] >= amt, "Insufficient Balance");
        _;
    }

    function deposit() public payable {
        if (balanceLedger[msg.sender] == 0) {
            addressLedger[addressCount++] = msg.sender;
        }
        balanceLedger[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint256) {
    return address(this).balance;
}

    function withdraw(uint256 amt) public balanceCheck(amt) {
        balanceLedger[msg.sender] -= amt;
        payable(msg.sender).transfer(amt);
    }

   function transferTo(address _recepient, uint256 amt)
    public
    balanceCheck(amt)
{
    balanceLedger[msg.sender] -= amt;
    balanceLedger[_recepient] += amt;
}

    function deleteAccount() public {
        if (balanceLedger[msg.sender] > 0) {
            payable(msg.sender).transfer(balanceLedger[msg.sender]);
            delete balanceLedger[msg.sender];
        }
    }

    function accountCount() public view onlyAdmin returns (address, uint256) {
        address maxAddress;
        uint256 maxBalance;
        for (uint256 i = 0; i < addressCount; i++) {
            address addr = addressLedger[i];
            if (maxBalance < balanceLedger[addr]) {
                maxBalance = balanceLedger[addr];
                maxAddress = addr;
            }
        }
        return (maxAddress, maxBalance);
    }
}