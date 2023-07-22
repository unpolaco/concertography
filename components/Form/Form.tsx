'use client'
import { FC, FormEvent, useState } from "react"
import { RadioButton } from "../RadioButton/RadioButton"
import { Image } from "@/utils/getImages"
import { useRouter } from 'next/navigation'

export const Form: FC = () => {
    const [radioBtnValue, setRadioBtnValue] = useState<keyof Image>('band')
    const [inputValue, setInputValue] = useState('')
    const handleRadioChange = (value: keyof Image) => setRadioBtnValue(value)
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)
    const router = useRouter()


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        inputValue.replace(' ', '_')
        router.push(`${radioBtnValue}/${inputValue}`)
    }


    return (
        <form id="searchForm" onSubmit={handleSubmit}>
            <label htmlFor="search">Looking for something?</label>
            <input type='text' id="search" name="search" onChange={(e) => handleInputChange(e)} />
            <RadioButton onChange={handleRadioChange} radioBtnValue={radioBtnValue} />
            <button type='submit' form='searchForm'>Search</button>
        </form>
    )
}




