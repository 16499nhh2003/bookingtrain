import React, { memo, useMemo } from 'react'

const InputForm = ({ label, value, setValue, type, invalidFields, setInvalidFields, keyField }) => {
    return (
        <div>
            <label htmlFor='phone' className='text-xs'>{label}</label>
            <input
                type={type || 'text'}
                id='phone'
                className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
                value={value}
                onChange={(e) => setValue(prev => ({ ...prev, [keyField]: e.target.value }))}
                onFocus={() => {
                    invalidFields = invalidFields.filter(p => p.name !== type)
                        setInvalidFields(invalidFields)
                }}
            />
            {invalidFields?.length > 0 && invalidFields.some(item => item.name === keyField) &&
                <small className='text-red-500 italic'>
                    {invalidFields.find(item => item.name === keyField)?.message}
                </small>}
        </div>
    )
}
export default memo(InputForm)
