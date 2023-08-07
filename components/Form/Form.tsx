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

export const Form: FC<FormProps> = ({ results: { bandNames, cities, places, genries } }) => {
    const [radioBtnValue, setRadioBtnValue] = useState<Category>('band')
    const [option, setOption] = useState<string | undefined>(undefined)
    const [isFormOpen, setIsFormOpen] = useState(true)

    const handleRadioChange = (value: Category) => {
        if (isFormOpen)
            setRadioBtnValue(value)
    }
    const router = useRouter()

    const handleChange = (e: SyntheticEvent, data: DropdownProps) => {
        e.preventDefault()
        setOption(data.value as string | undefined)
    }
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (option !== undefined)
            router.push(`/${radioBtnValue}/${option}`)
    }

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
                <div className={styles.dropdownWrapper}>
                    <Dropdown
                        placeholder={`Choose ${radioBtnValue} to display`}
                        fluid
                        search
                        selection
                        options={convertToDropdownData(getAppropiateDataFromRadioBtn(radioBtnValue))}
                        onChange={handleChange}
                        disabled={!isFormOpen}
                    />
                    <button className={styles.button} type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
                </div>
                <RadioButton onChange={handleRadioChange} radioBtnValue={radioBtnValue} />
            </form>
            {!isFormOpen && <span>search options</span>}
            <Icon name='angle double up' size='big' flipped={isFormOpen ? undefined : 'vertically'} onClick={handleOpenForm} className={styles.icon} />
        </div>
    )
}




