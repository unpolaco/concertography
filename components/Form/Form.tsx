'use client'
import { FC, SyntheticEvent, useState } from "react"
import { RadioButton } from "../RadioButton/RadioButton"
import { useRouter } from 'next/navigation'
import { Dropdown, DropdownProps, Icon } from "semantic-ui-react"
import styles from './Form.module.css'
import { Results } from "@/utils/getImages"

interface FormProps {
    results: Results
}
export type Category = 'band' | 'place' | 'city' | 'genre'

export const Form: FC<FormProps> = ({ results: {bandNames, cities, places, genries}}) => {
    const [radioBtnValue, setRadioBtnValue] = useState<Category>('band')
    const [isFormOpen, setIsFormOpen] = useState(true)

    const handleRadioChange = (value: Category) => {
        if (isFormOpen)
            setRadioBtnValue(value)
    }
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

    const handleOpenForm = () => setIsFormOpen(!isFormOpen)

    return (
        <div className={isFormOpen ? styles.mainWrapperOpened : styles.mainWrapperClosed}>
            <form className={isFormOpen ? styles.formWrapperOpened : styles.formWrapperClosed}>
                <Dropdown
                    placeholder={`Choose ${radioBtnValue} to display`}
                    fluid
                    search
                    selection
                    options={convertToDropdownData(getAppropiateDataFromRadioBtn(radioBtnValue))}
                    onChange={handleSubmit}
                    disabled={!isFormOpen}
                />
                <RadioButton onChange={handleRadioChange} radioBtnValue={radioBtnValue} />
            </form>
            {!isFormOpen && <span>search options</span> }
            <Icon name='angle double up' size='big' flipped={isFormOpen ? undefined : 'vertically'} onClick={handleOpenForm} className={styles.icon} />
        </div>
    )
}




