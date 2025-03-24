
import { NATIVE_MINT, getOrCreateAssociatedTokenAccount, createCloseAccountInstruction } from "@solana/spl-token";
import { Transaction, LAMPORTS_PER_SOL, sendAndConfirmTransaction, ComputeBudgetProgram, Connection } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';
import { COMMITMENT_LEVEL, PRIVATE_KEY, RPC_ENDPOINT, RPC_WEBSOCKET_ENDPOINT } from "../../constants";
 const connection = new Connection(RPC_ENDPOINT, {
    wsEndpoint: RPC_WEBSOCKET_ENDPOINT,
    commitment: COMMITMENT_LEVEL,
});

const keyPair = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY));
export async function unwrapSol(wallet: Keypair) {
    // wSol ATA
    const wSolAta = await getOrCreateAssociatedTokenAccount(connection, wallet, NATIVE_MINT, wallet.publicKey);

    // close wSol account instruction
    const transaction = new Transaction;
    transaction.add(
        createCloseAccountInstruction(
            wSolAta.address,
            wallet.publicKey,
            wallet.publicKey
        )
    );
    transaction.add(
        ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: 0.005 * LAMPORTS_PER_SOL,
        })
    )

    // submit transaction
    const txSignature = await sendAndConfirmTransaction(connection, transaction, [wallet]);

    // validate transaction was successful
    try {
        const latestBlockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            signature: txSignature,
        }, 'confirmed');
    } catch (error) {
        console.log(`Error unwrapping sol: ${error}`);
    };
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const new_sol_balance = await connection.getBalance(wallet.publicKey);
    console.log(`new sol balance: ${new_sol_balance / LAMPORTS_PER_SOL}`);
    return txSignature;
}

async function main() {
    unwrapSol(keyPair)
}

// main();
