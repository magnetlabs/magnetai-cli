const { ApiPromise, WsProvider } = require('@polkadot/api');
const { hexToString, parseObj } = require('./util');
const { chainAddr } = require('./consts');

module.exports = {
  default: async (nonce) => {
    try {
      // 1. Try connect to Magnet Network
      const chain = new ApiPromise({
        provider: new WsProvider(chainAddr),
      });
      await chain.isReadyOrError;

      // 2. Query on-chain file data
      const info = parseObj(await chain.query.market.metricsRecords(nonce));
      console.log(hexToString(info));

      // 3. Disconnect with chain
      chain.disconnect();
    } catch (e) {
      console.error(`Query metrics failed with ${e}.`);
    }
  }
}
