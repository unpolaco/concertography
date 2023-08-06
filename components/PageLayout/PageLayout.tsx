import { getResults } from "@/utils/getImages"
import styles from './PageLayout.module.css'
import { Form } from "../Form/Form"

export default async function PageLayout({
    children
}: {
    children: React.ReactNode
}) {
    const { results } = await getResults()
    return (
        <main className={styles.main}>
            <Form results={results} />
            {children}
        </main>
    )
}