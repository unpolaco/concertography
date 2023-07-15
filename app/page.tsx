import styles from './page.module.css'
import getResults from '@/utils/getImagesData'


export default async function Home () {
const {imagesData, bandNames, genries, eventPlaces, cities} = await getResults()

  return (
    <>
      <main className={styles.main}>
        <div>
          <form id="searchForm">
            <label htmlFor="search">Looking for something?</label>
            <input type='text' id="search" name="search" />
            <button type='submit' form='searchForm'>Search</button>
          </form>
          <div className={styles.imageWrapper}>
          </div>
            <p>{...bandNames}</p>
        </div>
      </main>
    </>
  )
}
