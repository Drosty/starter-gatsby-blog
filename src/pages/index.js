import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import Img from 'gatsby-image'
const ReactMarkdown = require('react-markdown/with-html')

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const pageData = get(this, 'props.data.allContentfulPage.edges')[0]

    console.dir(pageData.node.firstParagraph.childMarkdownRemark.rawMarkdownBody)

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <Hero title={pageData.node.title} heroText={pageData.node.heroText} heroImage={pageData.node.heroImage} />

        <div className="wrapper">
          <ReactMarkdown source={pageData.node.firstParagraph.childMarkdownRemark.rawMarkdownBody} />
        </div>

        <Img sizes={pageData.node.firstImage.sizes} />

        <div className="wrapper">
          <ReactMarkdown source={pageData.node.secondParagraph.childMarkdownRemark.rawMarkdownBody} />
        </div>

        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ul className="article-list">
            {posts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
             ...GatsbyContentfulSizes_withWebp
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(filter: { id: { eq: "c15jwOBqpxqSAOy2eOO4S0m" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            sizes(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
        }
      }
    }
    allContentfulPage {
      edges {
        node {
          title
          navText
          heroText
          heroImage {
            sizes(maxWidth: 1200, maxHeight: 410, resizingBehavior: SCALE) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          firstImage {
            sizes(maxWidth: 2500, maxHeight: 1667, resizingBehavior: SCALE) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          firstParagraph {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
					secondParagraph {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
        }
      }
    }
  }
`
