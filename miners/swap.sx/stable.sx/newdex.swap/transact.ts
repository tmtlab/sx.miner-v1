import { Asset, Name, ExtendedSymbol } from "eos-common";
import * as sx from "sxjs";
import { rpc, api } from "../../../../src/config"
import { flash, stable, token, swapNewdex, swapSx } from "../../../../plugins"
import * as utils from "../../../../src/utils";

export async function transact( account: Name, quantity: Asset, base_ext_sym: ExtendedSymbol, quote_ext_sym: ExtendedSymbol, sx_ext_sym: ExtendedSymbol, pair_id: number ) {
    // get user balance
    const base_balance = await token.get_balance(rpc, base_ext_sym.get_contract(), account, base_ext_sym.get_symbol().code())

    // calculations
    const { out } = await swapSx.get_calculate_rate( quantity, base_ext_sym, quote_ext_sym );

    // get `stablestable` contract balance
    const sx_settings = await sx.get_settings(rpc);
    const sx_pools = await sx.get_pools(rpc);
    const sx_rate = sx.get_rate( out, sx_ext_sym.get_symbol().code(), sx_pools, sx_settings );

    // actions
    const actions = [
        swapSx.buymarket( account, base_ext_sym.get_contract(), quantity, quote_ext_sym.get_symbol().code() ),
        stable.buymarket( account, quote_ext_sym.get_contract(), out, sx_ext_sym.get_symbol().code() ),
        swapNewdex.buymarket( account, sx_ext_sym.get_contract(), sx_rate.out, base_ext_sym, pair_id ),
        flash.checkbalance( account, base_ext_sym.get_contract(), base_balance ),
    ]

    // push transaction
    return utils.transact( api, actions )
}