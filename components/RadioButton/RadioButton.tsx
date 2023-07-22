import { Image } from "@/utils/getImages"
import { FC } from "react"

interface RadioButtonProps {
    onChange: (value: keyof Image) => void
    radioBtnValue: keyof Image
}

export const RadioButton: FC<RadioButtonProps> = ({onChange, radioBtnValue}) => {
    const isChecked = (value: string) => value === radioBtnValue
    const radioHandler = (e: React.ChangeEvent<HTMLInputElement>) =>  {
        const value = e.currentTarget.value as keyof Image
        onChange(value)
    }
    
    return (
        <div>
            <input type='radio' id='band' value='band' checked={isChecked('band')} onChange={(e)=>radioHandler(e)} />
            <label htmlFor='band'>band</label>
            <input type='radio' id='place' value='place' checked={isChecked('place')} onChange={(e)=>radioHandler(e)} />
            <label htmlFor='place' >place</label>
            <input type='radio' id='city' value='city' checked={isChecked('city')} onChange={(e)=>radioHandler(e)} />
            <label htmlFor='city' >city</label>
            <input type='radio' id='genre' value='genre' checked={isChecked('genre')} onChange={(e)=>radioHandler(e)} />
            <label htmlFor='genre' >genre</label>
        </div>
    )
}