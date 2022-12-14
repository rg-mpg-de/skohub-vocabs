import React from "react"
import { Link } from "gatsby"
import { i18n, getFilePath } from "../common"

import Layout from "./layout"
import SEO from "./seo"

const IndexPage = ({
  pageContext: { conceptSchemes, language, langsByCS },
}) => {
  // languages || language
  console.log(langsByCS)
  const languages = new Set([...Object.values(langsByCS).flat()])

  return (
    <Layout languages={Array.from(languages)} language={language}>
      <SEO title="Concept Schemes" keywords={["conceptSchemes"]} />
      <div className="centerPage block">
        <ul>
          {conceptSchemes.map((conceptScheme) => (
            <li key={conceptScheme.id}>
              <Link
                to={getFilePath(
                  conceptScheme.id,
                  `${
                    langsByCS[conceptScheme.id].includes(language)
                      ? language
                      : langsByCS[conceptScheme.id][0] // take first available language if the one chosen from lang tag is not available
                  }.html`
                )}
              >
                {i18n(language)(conceptScheme.title) || conceptScheme.id}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default IndexPage
