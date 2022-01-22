const anchor = require('@project-serum/anchor');

const { SystemProgram, LAMPORTS_PER_SOL } = anchor.web3;

const main = async() => {
  console.log("🚀 Starting test...");
  
  const provider = anchor.Provider.env();
  const program = anchor.workspace.Myepicproject;

  const baseAccount = anchor.web3.Keypair.generate();

  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  
  console.log("user transaction signiture", tx);

  const poolWallet = anchor.web3.Keypair.generate();
  tx = await program.rpc.placeBet(1,'1000000000', {
    accounts: {
      baseAccount:baseAccount.publicKey,
      from: provider.wallet.publicKey,
      to: poolWallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
  })
  console.log('Success!')

  tx = await program.rpc.compareBet(1, {
    accounts: {
      baseAccount:baseAccount.publicKey,
    },
  })
  console.log('Success!')

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);  
  console.log("bet vec->", account.currentBet.boolWinner);

  tx = await program.rpc.resultBet({
    accounts: {
      baseAccount:baseAccount.publicKey,
      from: poolWallet.publicKey,
      to: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers:  [poolWallet],
  })
  console.log('Success!')


  
};

const runMain = async () => {
  try{
    await main();
    process.exit(0);
  }catch (error){
    console.error(error);
  }
};

runMain();