const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const documentAsset = path.resolve('./src/templates/document-asset.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulDocument {
              edges {
                node {
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
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        const documents = result.data.allContentfulDocument.edges

        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })

        documents.forEach((document, index) => {
          createPage({
            path: `/document/${document.node.slug}/`,
            component: documentAsset,
            context: {
              slug: document.node.slug
            },
          })
        })
      })
    )
  })
}