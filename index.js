const { request } = require("undici");
const fs = require("fs");
const {
	DirectSecp256k1HdWallet,
	EncodeObject,
	Registry,
} = require("@cosmjs/proto-signing");
const { stringToPath } = require("@cosmjs/crypto");
const {
	SigningStargateClient,
	StargateClient,
	defaultRegistryTypes,
} = require("@cosmjs/stargate");
const registry = new Registry([...defaultRegistryTypes]);
const colors = require('colors');

const { config } = require('dotenv');
config();

const lcdEndpoint = process.env.LCD;
const rpcEndpoint = process.env.RPC;
const min = 600000;
const max = 21600000;

const addressReceivers = process.env.RECIPIENT.split(",");
const minimumBalance = process.env.MINIMUMBALANCE;
const minimumSend = process.env.MINIMUMSEND;

var mnemonic = process.env.MNEMONICS.split(","), 
i = -1;
(function f(){
i = (i + 1) % mnemonic.length;
trx(mnemonic[ i ],addressReceivers[Math.floor(Math.random() * addressReceivers.length)]);
setTimeout(f, Math.floor(Math.random()*(max-min+1))+min);
})();

async function getBalanceFor(wallet) {
	let rewards = await (
		await request(
			lcdEndpoint +
				"/cosmos/bank/v1beta1/balances/" +
				wallet +
				"/by_denom?denom=udvpn",
			{ method: "GET", maxRedirections: 10 }
		)
	).body.json();
	  let rewardNum = BigInt(rewards.balance.amount);
	  return rewardNum;
}

async function trx (mnemonic, addressReceiver) {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    	prefix: "sent",});
    const [addressWallet] = await wallet.getAccounts();
    
    const client = await SigningStargateClient.connectWithSigner(
      rpcEndpoint,
      wallet,
      { registry: registry });

    const fee = {
		amount: [
			{
				denom: "udvpn",
				amount: "9793",
			},
		],
		gas: "97922",
	  };
    console.log("Checking wallet", addressWallet.address.yellow);
    let balance = await getBalanceFor(addressWallet.address);
    let dvpn = (balance - BigInt(minimumBalance))/1000000n;
    let totals = BigInt(minimumBalance) + BigInt(minimumSend);
    if (balance >= totals) {
        balance = balance - BigInt(minimumBalance);
          try { 
            let tx = await client.signAndBroadcast(
          addressWallet.address,
            [
                {
                    typeUrl:
                        "/cosmos.bank.v1beta1.MsgSend",
                    value: {
                        fromAddress: addressWallet.address,
                        toAddress: addressReceiver,
                        amount: [
                          {
                            denom: "udvpn",
                            amount: balance.toString(),
                          }
                        ],
                      },
                },
            ],
            fee,"Sent Using AtmosferMuda/freQniK Bot Send" //Please don't delete MEMO 😊
        );
        console.log('\x1b[32m%s\x1b[0m', "Successfully sent " + dvpn + " DVPN to " + addressReceiver + "! TX id: " + tx.transactionHash);
          } catch(error) {
            console.error(error);
          }
    }
}
