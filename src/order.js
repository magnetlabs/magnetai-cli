const { ApiPromise, WsProvider } = require('@polkadot/api');
const fs = require('fs');
const bluebird = require('bluebird');
const { chainAddr, seedsPath } = require('./consts');
const { hexToString, sendTx, parseObj } = require('./util');

module.exports = {
  default: async (moduleName) => {
    try {
      // 1. Try connect to Magnet Network
      const chain = new ApiPromise({
        provider: new WsProvider(chainAddr),
      });
      await chain.isReadyOrError;

      // 2. Load seeds info
      const seeds = fs.readFileSync(seedsPath, 'utf8');

      // 3. Send place storage order tx
      console.log(`Ordering module name:${moduleName}`);
      const tx = chain.tx.market.newOrder(moduleName);
      const nonce = await sendTx(tx, seeds);
      if (nonce !== -1) {
        console.log(`🎉  Transaction with nonce(${nonce}) sent successfully, waiting for the reply...`)
        do {
          await bluebird.delay(3000);
          const ans = parseObj(await chain.query.market.apiRecords(nonce));
          if (ans !== '0x') {
            console.log('\x1b[33m', hexToString(ans), '\033[0m');
            break;
          }
        } while (true);
      } else {
        console.error('Order transaction sent failed.')
      }

      // 4. Disconnect with chain
      chain.disconnect();
    } catch (e) {
      console.error(`Transaction sent failed with: ${e}.`);
    }
  }
}
