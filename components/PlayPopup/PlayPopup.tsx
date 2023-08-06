import { Icon, Popup } from 'semantic-ui-react'
import styles from './PlayPopup.module.css'

export const PlayPopup = () => (
    <Popup trigger={<Icon name='info circle' className={styles.infoIcon} />} position='top center' wide='very'>
        <p><Icon name='keyboard' /> KEYBOARD INFO</p>
        <p>previous/next photo: <Icon name='arrow left' /> or <Icon name='arrow right' /></p>
        <p>pause/play animation: use SPACEBAR</p>
    </Popup>
)