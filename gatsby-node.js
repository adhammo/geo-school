const config = require("./src/config")

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  const metadata = config.pagesMetadata[page.path]
  if (metadata) {
    page.context.title = metadata.title
    page.context.layout = metadata.layout
    createPage(page)
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const lectureTemplate = require.resolve(`./src/templates/lecture.js`)
  const result = await graphql(`
    {
      lectures: allFile(
        filter: {
          sourceInstanceName: { eq: "resources" }
          relativeDirectory: { glob: "lectures/*" }
          extension: { eq: "mdx" }
          name: { eq: "index" }
        }
      ) {
        nodes {
          name
          relativeDirectory
          childMdx {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  
  result.data.lectures.nodes.forEach(node => {
    const lecture = node.relativeDirectory.match(/lectures\/(.*)/)[1]
    createPage({
      path: `/lectures/${lecture}`,
      component: lectureTemplate,
      context: {
        locator: `lectures/${lecture}`,
        title: node.childMdx.frontmatter.title,
        layout: "page",
      },
    })
  })
}
