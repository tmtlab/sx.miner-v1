import { transact } from "./transact";
import { asset, name, Name } from "eos-common";
import { tokens } from "../../../src/tokens"
import { ACCOUNT } from "../../../src/config";

export async function mine( account: Name ) {
    const quantity = asset("1.0000 EOS");
    const base = tokens["EOS"];
    const quote = tokens["BNT"];
    const reserve = name("bnt2eoscnvrt");

    await transact( account, quantity, base, quote, reserve);
}

if (require.main === module) {
    mine(ACCOUNT);
}