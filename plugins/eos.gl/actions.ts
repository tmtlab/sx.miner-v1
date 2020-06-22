import { transfer } from "../eosio.token/actions";
import { Name, Asset, name, SymbolCode } from "eos-common";

export function buymarket( from: Name, contract: Name, quantity: Asset, symcode: SymbolCode) {
    return transfer(from, name("eos.gl"), contract, quantity, symcode.to_string() )
}
