const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'space canyon limb globe tornado pizza submit regret race remind tired shoot',
    'https://ropsten.infura.io/0xIETR1ekP71CdUVbkoV'
);

//const provider = new HDWalletProvider(
//    'space canyon limb globe tornado pizza submit regret race remind tired shoot',
//    'HTTP://127.0.0.1:8545'
//);

//const provider = new HDWalletProvider(
//  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
//  'HTTP://127.0.0.1:7545'
//);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
  
    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode})
      .send({ gas: '1000000', from: accounts[0] });
  
    console.log(interface);
    console.log('Contract deployed to', result.options.address);
  };
  deploy();
  