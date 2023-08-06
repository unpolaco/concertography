'use client'
import { Dimmer, Loader } from 'semantic-ui-react'

const Spinner = () => (
  <Dimmer active>
    <Loader size='big'>loading photos . . .</Loader>
  </Dimmer>
)

export default Spinner