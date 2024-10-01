import { FC } from "react"
import styles from './RadioButton.module.css'
import { Category } from "@/utils/types"
import { categories } from "@/utils/consts"

interface RadioButtonProps {
    onChange: (value: Category) => void
    radioBtnValue: Category
}

export const RadioButton: FC<RadioButtonProps> = ({ onChange, radioBtnValue }) => {
    const isChecked = (value: string) => value === radioBtnValue
    const radioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value as Category
        onChange(value)
    }

    return (
        <div className={styles.radioBtnWrapper}>
            {
                categories.map((category: Category) => {
                    return <div key={category} 
                    className={styles.radioBtnWithLabel}
                    >
                        <input type='radio' id={category} value={category} checked={isChecked(category)} onChange={(e) => radioHandler(e)} className={styles.radioBtn}/>
                        <label htmlFor={category} className={styles.label}>{category}</label>
                    </div>
                })
            }
        </div>
    )
}