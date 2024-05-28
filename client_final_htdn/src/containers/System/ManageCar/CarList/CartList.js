import React from 'react'
import { Table } from '../../../../components'

const CartList = ({ data, onEdit, onDelete }) => {
    return (
        <Table
            isTableCar={true}
            data={data}
            onEdit={onEdit}
            onDelete={onDelete} />
    )
}

export default CartList
