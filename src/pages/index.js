/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Grid, Card } from "@theme-ui/components"

import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"
import Lecturers from "../components/lecturers"

const IndexPage = ({ data }) => {
  const { heroImage, contact, imageFiles } = data

  return (
    <>
      {/* <div
        sx={{
          height: 300,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage.sharp.fluid.src})`,
        }}
      >
        <Container>
          <h1
            sx={{
              m: 0,
              pt: 8,
              fontSize: [5, 6, 7],
              fontWeight: "medium",
              color: "white",
            }}
          >
            Teaching HCI
          </h1>
        </Container>
      </div>
       */}
      <BackgroundImage
        fluid={heroImage.sharp.fluid}
        sx={{
          height: [150, 200, 300],
        }}
      >
        <div
          sx={{
            height: "100%",
            width: "100%",
            backgroundImage: `linear-gradient(to right, #00416Add 4rem, #E4E5E600)`,
          }}
        >
          <Container>
            <h1
              sx={{
                m: 0,
                pt: [4, 5],
                fontSize: [5, 6, 7],
                fontWeight: "medium",
                color: "white",
              }}
            >
              Teaching HCI
            </h1>
          </Container>
        </div>
      </BackgroundImage>
      {/* <img src={heroImage.sharp.fluid.src} /> */}
      <Layout>
        <SEO title="Naslovna" />

        <h1>Kratko o predmetu</h1>
        <Grid gap={[4, 4, 2]} columns={[1, 2, 3]} sx={{ alignItems: "end" }}>
          <Lecturers />
          <Styled.blockquote sx={{ m: 0 }}>
            Kada: utorkom, 08h15-10h00 <br />
            Gdje: C501
          </Styled.blockquote>
        </Grid>

        <h2>Galerija</h2>
        <Grid gap={[4]} columns={[1, 2, 2, 3]}>
          {imageFiles.images.map(({ image }) => {
            const author = image.base
              .split("-")
              .slice(0, -2)
              .map(item => item.charAt(0).toUpperCase() + item.slice(1))
              .join(" ")

            return (
              author && (
                <Card key={image.id}>
                  <Img
                    key={image.id}
                    fluid={{ ...image.sharp.fluid, aspectRatio: 21 / 15 }}
                  />
                  <p sx={{ mt: 1, mb: 0 }}>
                    by{" "}
                    <span sx={{ fontWeight: "medium", color: "#f50057" }}>
                      {author}
                    </span>
                  </p>
                </Card>
              )
              // <Img
              //   key={image.id}
              //   fluid={{ ...image.sharp.fluid, aspectRatio: 21 / 15 }}
              // />
            )
          })}
        </Grid>

        <h2>Kontakt</h2>
        <MDXRenderer>{contact.body}</MDXRenderer>
      </Layout>
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    heroImage: file(relativePath: { eq: "images/hero.jpg" }) {
      sharp: childImageSharp {
        fluid(maxWidth: 1920) {
          src
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    contact: mdx(fileAbsolutePath: { regex: "/contact.md/" }) {
      body
    }

    imageFiles: allFile(
      filter: { absolutePath: { regex: "//content/images//" } }
    ) {
      images: edges {
        image: node {
          id
          base
          sharp: childImageSharp {
            fluid(maxWidth: 250) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
// Query with mdx and image duotone option
//
// export const query = graphql`
//   {
//     heroImage: file(relativePath: { eq: "images/hero.jpg" }) {
//       sharp: childImageSharp {
//         fluid(maxWidth: 1920) {
//           src
//           ...GatsbyImageSharpFluid_withWebp
//         }
//       }
//     }

//     indexMdx: mdx(fileAbsolutePath: { regex: "/index.mdx/" }) {
//       body
//       frontmatter {
//         title
//       }
//     }

//     imageFiles: allFile(
//       filter: { absolutePath: { regex: "//content/images//" } }
//     ) {
//       images: edges {
//         image: node {
//           id
//           base
//           sharp: childImageSharp {
//             fluid(
//               maxWidth: 250
//               duotone: { highlight: "#0ec4f1", shadow: "#192550", opacity: 50 }
//             ) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//       }
//     }
//   }
// `
