import { rpc } from "./config"
import { calculate_rate, calculate_mining_rewards, calculate_out, get_settings, calculate_burn } from "../plugins/eos.gl"
import { get_balance } from "../plugins/eosio.token"
import { asset, symbol_code } from "eos-common";

(async () => {
    const EOS = await get_balance(rpc, "eosio.token", "eos.gl", "EOS");
    const FAST = await get_balance(rpc, "fastecoadmin", "eos.gl", "FAST");
    const USDT = await get_balance(rpc, "tethertether", "eos.gl", "USDT");
    const PBTC = await get_balance(rpc, "btc.ptokens", "eos.gl", "PBTC");
    const BNT = await get_balance(rpc, "bntbntbntbnt", "eos.gl", "BNT");
    const GL = await get_balance(rpc, "token.gl", "eos.gl", "GL");

    for (const [base, quote] of [[EOS, FAST], [EOS, USDT], [EOS, BNT], [EOS, PBTC]]) {
        // user inputs
        const quantity = asset("1.0000 EOS");
        const symcode_out = quote.symbol.code();

        // contract inputs
        const symcode_mining = symbol_code("GL");
        const settings = await get_settings( rpc );

        // calculations
        const { fee, out } = calculate_rate( quantity, symcode_out, base, quote, settings.fee );
        const mining = calculate_mining_rewards( fee, symcode_mining, base, GL, settings.mining_rewards );
        const burn = calculate_burn( fee, base, FAST );

        if ( process.argv[2] == "debug") {
            console.log("--------------------");
            console.log("quantity:", quantity.to_string());
            console.log("symcode_out:", symcode_out.to_string());
            console.log("out:", out.to_string());
            console.log("fee:", fee.to_string());
            console.log("mining:", mining.to_string());
            console.log("burn:", burn.to_string());
        } else {
            console.log("1 EOS @ " + out.to_string());
        }
    }
})();
