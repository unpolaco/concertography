'use client'
import { FC, SyntheticEvent, useState } from "react"
import { RadioButton } from "../RadioButton/RadioButton"
import { useRouter } from 'next/navigation'
import { Dropdown, DropdownProps } from "semantic-ui-react"

interface FormProps {
    bandNames: string[];
    places: string[];
    cities: string[];
    genries: string[];
}
export type Category = 'band' | 'place' | 'city' | 'genre'

export const Form: FC<FormProps> = ({ bandNames, places, cities, genries }) => {
    const [radioBtnValue, setRadioBtnValue] = useState<Category>('band')
    const handleRadioChange = (value: Category) => setRadioBtnValue(value)
    const router = useRouter()

    const handleSubmit = (_e: SyntheticEvent, data: DropdownProps) => router.push(`/${radioBtnValue}/${data.value}`)

    const convertToDropdownData = (data: string[]) => {
        data.sort()
        const arr = []
        for (const element of data) {
            arr.push({ text: element, value: element })
        }
        return arr
    }

    const getAppropiateDataFromRadioBtn = (value: Category) => {
        switch (value) {
            case 'band':
                return bandNames;
            case 'place':
                return places;
            case 'city':
                return cities;
            case 'genre':
                return genries;
        }
    }

    return (
        <form >
            <Dropdown
                placeholder={`Choose ${radioBtnValue} to display`}
                fluid
                search
                selection
                options={convertToDropdownData(getAppropiateDataFromRadioBtn(radioBtnValue))}
                onChange={handleSubmit}
            />
            <RadioButton onChange={handleRadioChange} radioBtnValue={radioBtnValue} />
        </form>
    )
}




