import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { name } from 'eos-common';
const { TextEncoder, TextDecoder } = require('util');
require("dotenv").config();

const signatureProvider = new JsSignatureProvider(process.env.PRIVATE_KEYS.split(","));
export const rpc = new JsonRpc(process.env.NODEOS_ENDPOINT, { fetch: require('node-fetch') });
export const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

// miner configurations
export const ACCOUNT = name(process.env.ACCOUNT);
export const AMOUNT = Number(process.env.AMOUNT || 1);
