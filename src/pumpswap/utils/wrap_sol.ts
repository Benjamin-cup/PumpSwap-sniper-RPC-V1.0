import { NATIVE_MINT, getOrCreateAssociatedTokenAccount, createSyncNativeInstruction, } from "@solana/spl-token";
import { Transaction, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction, ComputeBudgetProgram, Connection, Keypair } from "@solana/web3.js";
import { getSPLTokenBalance } from "./utils";
import { program } from "commander";
import { logger } from "./logger";
import { COMMITMENT_LEVEL, PRIVATE_KEY, RPC_ENDPOINT, RPC_WEBSOCKET_ENDPOINT } from "../../constants";
import bs58 from 'bs58';

const connection = new Connection(RPC_ENDPOINT, {
    wsEndpoint: RPC_WEBSOCKET_ENDPOINT,
    commitment: COMMITMENT_LEVEL,
});

const keyPair = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY));

let wrap_size = 0;
export async function wrap_sol(
    amount: number
) {
    // wSol ATA 
    const wSolAta = await getOrCreateAssociatedTokenAccount(connection, keyPair, NATIVE_MINT, keyPair.publicKey);
    console.log(`wsol ATA: ${wSolAta.address.toBase58()}`);
    // wrap Sol
    let transaction = new Transaction().add(
        // trasnfer SOL
        SystemProgram.transfer({
            fromPubkey: keyPair.publicKey,
            toPubkey: wSolAta.address,
            lamports: amount * LAMPORTS_PER_SOL,
        }),
        // sync wrapped SOL balance
        createSyncNativeInstruction(wSolAta.address)
    );


    // submit transaction
    const txSignature = await sendAndConfirmTransaction(connection, transaction, [keyPair]);

    // validate transaction was successful
    try {
        const latestBlockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            signature: txSignature,
        }, 'confirmed');
    } catch (error) {
        console.log(`Error wrapping sol: ${error}`);
    };
    // await for 3 second
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await check_wsol_balance(wSolAta)

    return txSignature;
}

export async function check_wsol_balance(wSolAta: any) {
    const wsolBalance = await getSPLTokenBalance(connection, NATIVE_MINT, keyPair.publicKey);

    console.log(`new wsol balance: ${wsolBalance}`);
    return wsolBalance;
}

export async function main() {
    await wrap_sol(0.1);

}
//main();