const {loadFixture}= require("@nomicfoundation/hardhat-toolbox/network-helpers");

const {expect} =require("chai");
const { ethers } = require("hardhat");

describe('bank',function (){
   async function deployBankFixture(){
        const [admin,user1,user2]=await ethers.getSigners();

        const Bank=await ethers.getContractFactory('Bank');
        const bank= await Bank.deploy();

        return {admin,user1,user2, bank };
    }

    it('should set the right admin value', async function(){
        const {bank,admin}=await loadFixture(deployBankFixture)

        expect(bank.deploymentTransaction().from).to.equal(admin.address);
    })

    it("Should deposit funds and update balance correctly", async function () {
        const { bank, user1 } = await loadFixture(deployBankFixture);
        const depositAmount = "100000000000000000";
    
        await bank.connect(user1).deposit({ value: depositAmount });
    
        expect(await bank.balanceLedger(user1.address)).to.equal(depositAmount);

    })

    it("Should revert if non-admin ", async function () {
        const {bank,user1}=await loadFixture(deployBankFixture)

        await expect(bank.connect(user1).accountCount()).to.be.revertedWith(
            "Not Allowed"
        );
    })
     it("Should not allow withdrawals greater than balance", async function () {
        const { bank, user1 } = await loadFixture(deployBankFixture);
        const depositAmount = "1000000000000000000"; 

        await bank.connect(user1).deposit({ value: depositAmount });

        await expect(bank.connect(user1).withdraw(BigInt(depositAmount) + 1n))
            .to.be.revertedWith("Insufficient Balance");
    });

    it("Should allow withdrawals and update balance ledger", async function () {
        const { bank, user1 } = await loadFixture(deployBankFixture);
        const depositAmount = "1000000000000000000"; 

        await bank.connect(user1).deposit({ value: depositAmount });
        await bank.connect(user1).withdraw(depositAmount);

        expect(await bank.getBalance()).to.equal(0);
        expect(await bank.balanceLedger(user1.address)).to.equal(0);
    });

    it("Should transfer funds between accounts", async function () {
        const { bank, user1, user2 } = await loadFixture(deployBankFixture);
        const depositAmount = "1000000000000000000"; 
        const transferAmount = "500000000000000000"; 
    
        await bank.connect(user1).deposit({ value: depositAmount });
        await bank.connect(user1).transferTo(user2.address, transferAmount);
    
        expect(await bank.balanceLedger(user1.address)).to.equal(BigInt(depositAmount) - BigInt(transferAmount));
        expect(await bank.balanceLedger(user2.address)).to.equal(transferAmount);
    

        expect(await bank.getBalance()).to.equal(depositAmount);
    });
    it("Should allow deleting an account and refunding balance", async function () {
        const { bank, user1 } = await loadFixture(deployBankFixture);
        const depositAmount = "1000000000000000000";

        await bank.connect(user1).deposit({ value: depositAmount });

        await bank.connect(user1).deleteAccount();

        expect(await bank.balanceLedger(user1.address)).to.equal(0);
    });

    
})