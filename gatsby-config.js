module.exports = {
  siteMetadata: {
    title: `GeoSchool Website`,
    description: `Geography lectures for all.`,
    author: `@heay-team`,
    siteUrl: `https://geo-school.netlify.app/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 75,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Geography School`,
        short_name: `GeoSchool`,
        description: `Geography lectures for all.`,
        lang: `en`,
        start_url: `/`,
        background_color: `#f2f2f2`,
        theme_color: `#5599ff`,
        display: `standalone`,
        icon: `src/images/shell-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          "material icons",
          "quicksand:600",
          "open sans:400,400i,700,700i",
          "roboto:400,400i,700,700i",
          "noto sans:400,700",
        ],
        display: "swap",
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: f => `content/${f.name}`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              quality: 75,
            },
          },
          `gatsby-remark-embedder`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path: `${__dirname}/src/content/resources`,
      },
    },
  ],
}
