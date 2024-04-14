import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Lecture from "../components/lecture"

import authors from "../content/authors"
import { pinned } from "../content/lectures"

import "../styles/pages/lectures.css"

const LectureSection = ({ title, lectures, authorImgs, style }) => (
  <section style={style}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <h1
        className="themed--color"
        style={{
          fontFamily: "noto sans",
          opacity: 0.9,
          margin: 0,
          transition: "color 0.2s",
        }}
      >
        {title}
      </h1>
    </div>
    <div>
      {lectures
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        .map((lecture, index) => (
          <Lecture
            key={index}
            lecture={lecture}
            author={authors[lecture.author]}
            authorImg={authorImgs[authors[lecture.author].avatar]}
          />
        ))}
    </div>
  </section>
)

const LecturesPage = ({ lectures, authorImgs }) => (
  <section
    className="themed--back"
    style={{
      width: "100%",
      minHeight: "100%",
      padding: "2rem 1rem",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      transition: "background 0.2s",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 1024,
      }}
    >
      {pinned.length > 0 && (
        <LectureSection
          style={{ marginBottom: "4rem" }}
          title="Pinned"
          lectures={lectures
            .filter(lecture => pinned.includes(lecture))
            .map(lecture => lectures[lecture])}
          authorImgs={authorImgs}
        />
      )}
      <LectureSection
        title="Lectures"
        lectures={lectures}
        authorImgs={authorImgs}
      />
    </div>
  </section>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        lectures: allFile(
          filter: {
            sourceInstanceName: { eq: "resources" }
            relativeDirectory: { glob: "lectures/*" }
            extension: { eq: "mdx" }
          }
        ) {
          nodes {
            name
            relativeDirectory
            childMdx {
              frontmatter {
                author
                title
                palette
                date
                day: date(formatString: "MMMM DD, YYYY")
                since: date(fromNow: true)
              }
              body
            }
          }
        }
        authorImgs: allFile(
          filter: {
            sourceInstanceName: { eq: "resources" }
            relativeDirectory: { eq: "authors" }
          }
        ) {
          nodes {
            name
            childImageSharp {
              fixed(width: 50, height: 50) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    `}
    render={data => (
      <LecturesPage
        {...props}
        lectures={data.lectures.nodes.map(node => ({
          name: node.relativeDirectory.match(/lectures\/(.*)/)[1],
          author: node.childMdx.frontmatter.author,
          title: node.childMdx.frontmatter.title,
          palette: node.childMdx.frontmatter.palette,
          date: node.childMdx.frontmatter.date,
          day: node.childMdx.frontmatter.day,
          since: node.childMdx.frontmatter.since,
          body: node.childMdx.body,
        }))}
        authorImgs={data.authorImgs.nodes.reduce(
          (authorImgs, node) => ({
            ...authorImgs,
            [node.name]: node.childImageSharp.fixed,
          }),
          {}
        )}
      />
    )}
  />
)
