import Spinner from "@/components/Spinner/Spinner"
import styles from '../[category]/[search]/loading.module.css'

export default function Loader() {

    return (
        <div className={styles.spinnerWrapper}>
            <Spinner />
        </div>
    )
}