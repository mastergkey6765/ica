import { SquareClient, SquareEnvironment } from 'square';
const client = new SquareClient({ environment: SquareEnvironment.Sandbox, token: 'xxx' });
client.payments.create({ sourceId: 'cnon:card-nonce-ok', idempotencyKey: 'x', amountMoney: { amount: BigInt(100), currency: 'USD' } })
  .then(res => console.log("SUCCESS", res))
  .catch(err => console.log("ERROR", err.message, Object.keys(err)));
