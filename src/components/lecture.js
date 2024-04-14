import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { ThemeProvider } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import components from "../lecture/components"

import { palettes } from "../theme"
import lectureTheme from "../lecture/theme"

import "../styles/components/lecture.css"

const Lecture = ({ lecture, author, authorImg, short = true, more = true }) => (
  <article
    className="lecture"
    style={{
      width: "100%",
      maxWidth: 1024,
      borderRadius: "6px",
      boxShadow: `0 1px 2px rgba(0, 0, 0, 0.2)`,
      overflow: "hidden",
    }}
  >
    <header
      style={{
        width: "100%",
        padding: "1rem",
        boxSizing: "border-box",
        background: palettes[lecture.palette],
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className="author"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Img
          title={author.name.replace("_", " ")}
          alt={author.name.replace("_", " ")}
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            display: "block",
            width: 50,
            height: 50,
            userSelect: "none",
          }}
          imgStyle={{
            margin: 0,
          }}
          fixed={authorImg}
        />
        <h2
          className="author__name"
          style={{
            color: "#f2f2f2",
            fontFamily: "open sans",
            fontWeight: "bold",
            fontSize: "1rem",
            opacity: 0.9,
          }}
        >
          {author.name.split("_")[0]}
          <br />
          {author.name.split("_")[1]}
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {short ? (
          <Link
            className="lecture__title"
            title={`View lecture`}
            to={`/lectures/${lecture.name}`}
            style={{
              marginBottom: "0.5rem",
              color: "#f2f2f2",
              fontFamily: "noto sans",
              fontWeight: "bold",
              fontSize: "1rem",
              outline: "none",
              textDecoration: "none",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255, 255, 255, 0.6)",
            }}
          >
            {lecture.title}
          </Link>
        ) : (
          <h1
            style={{
              marginBottom: "0.25rem",
              color: "#f2f2f2",
              fontFamily: "noto sans",
              fontWeight: "bold",
              fontSize: "1rem",
              opacity: 0.9,
            }}
          >
            {lecture.title}
          </h1>
        )}
        <p
          title={lecture.since}
          style={{
            margin: 0,
            color: "#f2f2f2",
            opacity: 0.8,
            fontFamily: "open sans",
            fontSize: "0.75rem",
            lineHeight: "0.75rem",
          }}
        >
          {lecture.day}
        </p>
      </div>
    </header>
    <section
      className="themed--back-var"
      style={{
        width: "100%",
        padding: "1rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.2s",
      }}
    >
      <main
        className="lecture__main themed--color themed--border"
        style={{
          transition: "color 0.2s, border-color 0.2s",
        }}
      >
        <ThemeProvider theme={lectureTheme} components={components}>
          <MDXRenderer>{lecture.body}</MDXRenderer>
        </ThemeProvider>
      </main>
      {short && more && (
        <Link
          className="lecture__see-more themed--color"
          title={`View lecture`}
          to={`/lectures/${lecture.name}`}
          style={{
            margin: "1rem auto 0 0",
            fontFamily: "noto sans",
            fontWeight: "bold",
            fontSize: "1rem",
            outline: "none",
            textDecoration: "none",
            borderBottomWidth: 1,
            transition: "color 0.2s, border-color 0.2s",
          }}
        >
          See More
        </Link>
      )}
    </section>
  </article>
)

export default Lecture
