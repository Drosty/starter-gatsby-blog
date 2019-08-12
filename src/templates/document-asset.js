import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
const ReactMarkdown = require('react-markdown/with-html')

import heroStyles from '../components/hero.module.css'

class DocumentAssetTemplate extends React.Component {
  render() {
    const categories = get(this.props, 'data.contentfulDocument.categories')
    const name = get(this.props, 'data.contentfulDocument.name')
    const descriptionMd = get(this.props, 'data.contentfulDocument.description.childMarkdownRemark.rawMarkdownBody')
    const fileUrl = get(this.props, 'data.contentfulDocument.media.file.url')

    return (
      <div style={{ background: '#fff' }}>
        <div className="wrapper">
          <h1 className="section-headline">{name}</h1>
          <ReactMarkdown source={descriptionMd} />
          <a href={fileUrl} download>Download</a>
        </div>
      </div>
    )
  }
}

export default DocumentAssetTemplate

export const pageQuery = graphql`
  query DocumentBySlug($slug: String!) {
    contentfulDocument(slug: {eq: $slug}) {
      categories {
        name
      }
      name
      slug
      media {
        file {
          url
          details {
            size
          }
        }
      }
      description {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
    }
  }
`
