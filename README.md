# Bot Send

Tool to automatically send DVPN from DVPN Nodes wallet.

## How to use:

### Docker

1. Create `.env` file with these parameters.</br>
   
   ```
   LCD=https://api.sentinel.mathnodes.com
   RPC=https://rpc.mathnodes.com #make sure RPC have indexing enabled or it will return error
   RECIPIENT=sent1,sent2,sent3...
   MINIMUMBALANCE=50000000 #minimum balance in udvpn to be remain in your node wallet
   MINIMUMSEND=30000000 #Minimum amount in udvpn to be send
   MNEMONICS=your mnemonic 1,your mnemonic 2,your mnemonic 3,your mnemonic 4
   ```

2. Run this command.
   
   ```
   docker run -d --name bot-send -v /path-to-your-folder/.env:/home/node/bot_send/.env atmosfermuda/bot-send 
   ```
   
   dont forget to change this `/path-to-your-folder/.env` path.

Check logs:

```
docker logs bot-send
```

3. Enjoy your life!

### Directly

1. Install Node.js.</br>
   
   ```
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   nvm install --lts
   ```

2. Clone this repo.
   
   ```
   git clone https://github.com/atmosfermuda/bot_send
   cd bot_send
   ```

3. Install modules by running this command.</br>
   
   ```
   npm install
   ```

4. Create `.env` file inside bot_send dir with these parameters.</br>
   
   ```
   LCD=https://api-sentinel.atmosfermuda.com
   RPC=https://rpc-sentinel.atmosfermuda.com #make sure RPC have indexing enabled or it will return error
   RECIPIENT=Your Sentinel wallet for receiving DVPN
   MINIMUMBALANCE=50000000 #minimum balance in udvpn to be remain in your node wallet
   MINIMUMSEND=30000000 #Minimum amount in udvpn to be send
   MNEMONICS=your mnemonic 1,your mnemonic 2,your mnemonic 3,your mnemonic 4
   ```

5. Run `node index.js`

6. Enjoy your life.

## Support me

You can also suport me by delegating some of your DVPN here https://www.mintscan.io/sentinel/validators/sentvaloper1qksz3uscxvjyv8jdxw7lu26xqksddxwjwf7tvh<br/>
or donating some DVPN to `sent1qksz3uscxvjyv8jdxw7lu26xqksddxwj3vpxr7`.