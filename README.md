# 🤖 PumpSwap (Pump.amm)-sniper-RPC-V1.0
PumpSwap (Pump.amm) sniper bot always monitor Pumpswap dex and if new token is migrated, sniper that token
You can snipe and buy pumpswap token that created by dev wallet using this bot.


## CONTACT INFO
-Gmail: tom.kinddev@gmail.com

-discord:  erikerik116

-telegram: @erikerik116

-twitter: @erikerikerik116
## GETTING STARTED

1. Clone repository

    ```
    git clone https://github.com/eriksol116/PumpSwap-sniper-RPC-V1.0

    cd PumpSwap-sniper-RPC-V1.0
    ```


2. Install dependencies

    ```
    npm install
    ```
3. Configure the environment variables

    Rename the .env.example file to .env and set RPC and WSS, main keypair's secret key, and others.

4. Run the bot

    ```
    npm run start
    ```


## SETTING ENV FILE

You can set the .env like following:

PRIVATE_KEY =
    Your main wallet private key

RPC_ENDPOINT = 

RPC_WEBSOCKET_ENDPOINT=

BUY_AMOUNT = 
    buy sol amount

JITO_FEE = 0.0001
    jito fee

PRICE_CHECK_INTERVAL (ms) :
   Interval in milliseconds for checking the take profit and stop loss conditions
   Set to zero to disable take profit and stop loss.

TAKE_PROFIT : x %

STOP_LOSS : x  %

SELL_SLIPPAGE : x %

SKIP_SELLING_IF_LOST_MORE_THAN : x %
   If token loses more than X% of value, bot will not try to sell

PRICE_CHECK_DURATION (ms) : x %
   Time in milliseconds to wait for stop loss/take profit conditions
   If you don't reach profit or loss bot will auto sell after this time
   Set to zero to disable take profit and stop loss

MAX_SELL_RETRIES - Maximum number of retries for selling a token

## Mention

This is public code for ad. So this dont have buy and sell functions with conditions.

If you want running bot, contact me.
