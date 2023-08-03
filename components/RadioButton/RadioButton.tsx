import { FC } from "react"
import { Category } from "../Form/Form"
import styles from './RadioButton.module.css'

interface RadioButtonProps {
    onChange: (value: Category) => void
    radioBtnValue: Category
}

export const RadioButton: FC<RadioButtonProps> = ({ onChange, radioBtnValue }) => {
    const categories: Category[] = ['band', 'place', 'city', 'genre']
    const isChecked = (value: string) => value === radioBtnValue
    const radioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value as Category
        onChange(value)
    }

    return (
        <div className={styles.radioBtnWrapper}>
            {
                categories.map((category: Category) => {
                    return <div key={category} className={styles.radioBtnWrapper}>
                        <input type='radio' id={category} value={category} checked={isChecked(category)} onChange={(e) => radioHandler(e)} />
                        <label htmlFor={category}>{category}</label>
                    </div>
                })
            }
        </div>
    )
}