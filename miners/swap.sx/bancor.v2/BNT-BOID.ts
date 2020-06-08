import { transact } from "./transact";
import { Name, number_to_asset } from "eos-common";
import { tokens } from "../../../src/tokens"
import { ACCOUNT, AMOUNT } from "../../../src/config";

export async function mine( account: Name ) {
    const base = tokens["BNT"];
    const quote = tokens["BOID"];
    const quantity = number_to_asset(AMOUNT * 5, base.get_symbol());

    // bancor
    const reserve = "bancorcnvrtr:BNTBOD";

    return await transact( account, quantity, base, quote, reserve);
}

if (require.main === module) {
    mine(ACCOUNT);
}