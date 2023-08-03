import { getResults } from "@/utils/getImages"
import { Form } from "../Form/Form"
import styles from './PageLayout.module.css'

export default async function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { bandNames, genries, places, cities } = await getResults()
    
    return (
        <main className={styles.main}>
            <Form bandNames={bandNames} genries={genries} cities={cities} places={places} />
            {children}
        </main>
    )
}