import React from 'react';
import Bitcoin from './bitcoin-btc-logo.png'
import Ethereum from './ethereum-eth-logo.png'
import Dogecoin from './dogecoin-doge-logo.png'
import Litecoin from './litecoin-ltc-logo.png'
import Uniswap from './uniswap-uni-logo.png'
import Cardano from './cardano-ada-logo.png'
import Polkadot from './polkadot-new-dot-logo.png'
import Atom from './cosmos-atom-logo.png'

export function Logo({ pair }) {
    if (pair === 'BTC'){
        return (
            <img className="test" src={Bitcoin} alt="The ting goes here"></img>
        )
    }
    if (pair === 'ETH'){
        return (
            <img className="test border-5" src={Ethereum} alt="Theting goes here"></img>
        )
    }
    if (pair === 'DOGE'){
        return (
            <img className="test border-5" src={Dogecoin} alt="Theting goes here"></img>
        )
    }
    if (pair === 'LTC'){
        return (
            <img className="test border-5" src={Litecoin} alt="Theting goes here"></img>
        )
    }
    if (pair === 'UNI'){
        return (
            <img className="test border-5" src={Uniswap} alt="Theting goes here"></img>
        )
    }
    if (pair === 'ADA'){
        return (
            <img className="test border-5" src={Cardano} alt="Theting goes here"></img>
        )
    }
    if (pair === 'DOT'){
        return (
            <img className="test border-5" src={Polkadot} alt="Theting goes here"></img>
        )
    }
    if (pair === 'ATOM'){
        return (
            <img className="test border-5" src={Atom} alt="Theting goes here"></img>
        )
    }
}

export default Logo;
