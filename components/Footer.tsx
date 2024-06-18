import React from 'react'
import yen from "../public/yen.png"
import eur from "../public/euro.png"
import dollar from "../public/dollar.png"
import pound from "../public/pound.png"
import swiss from "../public/siwss.png"
import { InfiniteMovingCards } from './ui/infinite-moving-cards'

function Footer() {
    const items = [
        { img: yen, id: 1 },
        { img: eur, id: 3 },
        { img: dollar, id: 2 },
        { img: pound, id: 4 },
        { img: swiss, id: 5 },

    ];
    return (
        <div className='sm:flex items-center justify-center hidden  '>
            <InfiniteMovingCards items={items} />

        </div>
    )
}

export default Footer