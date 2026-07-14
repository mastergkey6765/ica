import { SquareClient, SquareEnvironment } from 'square';
console.log(Object.keys(new SquareClient({ environment: SquareEnvironment.Sandbox, token: 'xxx' }).payments));
