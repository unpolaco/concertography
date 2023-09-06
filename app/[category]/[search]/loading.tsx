import Spinner from "@/components/Spinner/Spinner"
import styles from './loading.module.css'

export default function Loader() {
    return (
        <div className={styles.spinnerWrapper}>
            <Spinner />
        </div>
    )
}