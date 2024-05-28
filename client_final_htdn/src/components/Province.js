import React from 'react'
import { ProvinceBtn } from './index'
import { location } from '../utils/constanst'

const Province = () => {
    return (
        <div className='flex items-center gap-5 justify-center py-5'>
            {location.map(item => {
                return (
                    <ProvinceBtn
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        ticketPrice={item.price}
                    />
                )
            })}
        </div>
    )
}

export default Province