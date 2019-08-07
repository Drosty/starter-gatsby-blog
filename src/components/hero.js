import React from 'react'
import Img from 'gatsby-image'

import styles from './hero.module.css'

export default ({ heroImage, heroText, title }) => (
  <div className={styles.hero}>
    <Img className={styles.heroImage} alt="Alt Text" sizes={heroImage.sizes} />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{title}</h3>
      <p>{heroText}</p>
    </div>
  </div>
)
