import React  , {memo, useMemo} from 'react'

const Button = ({ text, textColor, bgColor , ICAfter , onClick , fullWidth}) => {
    return (
        <button
            type='button'
            className={`py-2 px-4 ${textColor} ${bgColor} ${fullWidth && 'w-full '} outline-none rounded-md hover:underline flex items-center gap-1 justify-center`}
            onClick={onClick}
        >
            {text}
            {ICAfter && <ICAfter/>} 
        </button>
    )
}

export default memo(Button)
