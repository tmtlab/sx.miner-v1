import { Asset, Name, ExtendedSymbol } from "eos-common";
import { api } from "../../../src/config"
import { stableSx, pizzadex, flash } from "../../../plugins"
import * as utils from "../../../src/utils";

export async function transact( account: Name, quantity: Asset, base_ext_sym: ExtendedSymbol, quote_ext_sym: ExtendedSymbol, pair: string, type: string ) {
    // calculations
    const rate = await stableSx.get_calculate_rate( quantity, quote_ext_sym.get_symbol().code() );

    // actions
    const actions = [
        flash.savebalance( account, [ base_ext_sym, quote_ext_sym ] ),
        stableSx.buymarket( account, base_ext_sym.get_contract(), quantity, quote_ext_sym.get_symbol().code() ),
        pizzadex.buymarket( account, quote_ext_sym.get_contract(), rate, pair, type ),
        flash.checkbalance( account, [ base_ext_sym, quote_ext_sym ] ),
    ]
    // push transaction
    return utils.transact( api, actions )
}