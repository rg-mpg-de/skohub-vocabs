import { describe, expect, it, vi } from "vitest"
import React from "react"
import * as Gatsby from "gatsby"
import { render, screen, act } from "@testing-library/react"
import Header from "../src/components/header.jsx"
import mockFetch from "./mocks/mockFetch"
import { mockConfig } from "./mocks/mockConfig.js"

import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@gatsbyjs/reach-router"
import { ContextProvider } from "../src/context/Context.jsx"

const useStaticQuery = vi.spyOn(Gatsby, `useStaticQuery`)

function renderHeader(history, siteTitle, languages, language) {
  return render(
    <ContextProvider>
      <LocationProvider history={history}>
        <Header
          siteTitle={siteTitle}
          languages={languages}
          language={language}
        ></Header>
      </LocationProvider>
    </ContextProvider>
  )
}

describe("Header", () => {
  vi.spyOn(window, "fetch").mockImplementation(mockFetch)
  useStaticQuery.mockImplementation(() => mockConfig)

  const siteTitle = "Test Title"

  it("renders header component without language tags", async () => {
    const languages = ["de"]
    const language = "de"
    const route = "/one-lang/w3id.org/index.de.html"
    const history = createHistory(createMemorySource(route))
    await act(() => {
      renderHeader(history, siteTitle, languages, language)
    })
    expect(screen.getByRole("banner")).toBeInTheDocument()
    // skohub logo
    expect(screen.getByRole("img", { name: "SkoHub Logo" })).toBeInTheDocument()
    // skohub title
    expect(
      screen.getByRole("link", { name: "SkoHub Logo Test Title" })
    ).toBeInTheDocument()
    // skohub concept scheme link
    expect(
      screen.getByRole("link", {
        name: /test vokabular/i,
      })
    ).toBeInTheDocument()
    // check for language menu not to be present
    expect(screen.queryByRole("list")).toBeNull()
  })

  it(`renders header component with link to concept scheme (slash URIs)`, async () => {
    const languages = ["de", "en"]
    const language = "de"
    const route = "/w3id.org/index.de.html"
    const history = createHistory(createMemorySource(route))
    await act(() => {
      renderHeader(history, siteTitle, languages, language)
    })
    // skohub concept scheme link
    expect(
      screen.getByRole("link", {
        name: "Test Vokabular",
      })
    ).toBeInTheDocument()
  })

  it(`renders header component with multiple language tags (slash URIs)`, async () => {
    const languages = ["de", "en"]
    const language = "de"
    const route = "/w3id.org/index.de.html"
    const history = createHistory(createMemorySource(route))
    await act(() => {
      renderHeader(history, siteTitle, languages, language)
    })
    // check for language menu
    expect(screen.getByRole("list")).toBeInTheDocument()
    // check for language items
    expect(screen.getAllByRole("listitem").length).toBe(2)
  })

  it("renders header component with multiple language tags (hash URIs)", async () => {
    // setting three languages here, but we only have two in the cs
    // so test should return only two

    const languages = ["de", "en", "uk"]
    const language = "de"
    const route = "/example.org/hashURIConceptScheme.de.html"
    const history = createHistory(createMemorySource(route))
    await act(() => {
      renderHeader(history, siteTitle, languages, language)
    })
    // skohub concept scheme link
    expect(
      screen.getByRole("link", {
        name: "Hash URI Konzept Schema",
      })
    ).toBeInTheDocument()
    // check for language menu
    expect(screen.getByRole("list")).toBeInTheDocument()
    // check for language items
    expect(screen.getAllByRole("listitem").length).toBe(2)
  })

  it("renders header, shows concept id if title in language is not present", async () => {
    const languages = ["de"]
    const language = "en"
    const route = "/no-title-in-en/w3id.org/index.de.html"
    const history = createHistory(createMemorySource(route))
    await act(() => {
      renderHeader(history, siteTitle, languages, language)
    })
    // skohub concept scheme link
    expect(
      screen.getByRole("link", {
        name: "http://w3id.org/",
      })
    ).toBeInTheDocument()
  })

  it("render component with concept data", async () => {
    // we reduce language array here artifically, because two languages should be found
    const languages = ["de"]
    const language = "de"
    const route = "/w3id.org/c1.de.html"
    const history = createHistory(createMemorySource(route))
    await act(() => {
      renderHeader(history, siteTitle, languages, language)
    })
    // check for language menu
    expect(screen.getByRole("list")).toBeInTheDocument()
    // check for language items
    expect(screen.getAllByRole("listitem").length).toBe(2)
  })

  it("render component with collection data", async () => {
    // we reduce language array here artifically, because two languages should be found
    const languages = ["de"]
    const language = "de"
    const route = "/w3id.org/collection.de.html"
    const history = createHistory(createMemorySource(route))
    await act(() => {
      renderHeader(history, siteTitle, languages, language)
    })
    // check for language menu
    expect(screen.getByRole("list")).toBeInTheDocument()
    // check for language items
    expect(screen.getAllByRole("listitem").length).toBe(2)
  })

  it("render languages if type is neither ConceptScheme, Concept or Collection", async () => {
    const languages = ["de", "en", "uk"]
    const language = "de"
    const route = "/no-in-scheme/w3id.org/collection.de.html"
    const history = createHistory(createMemorySource(route))
    await act(() => {
      renderHeader(history, siteTitle, languages, language)
    })
    // check for language menu
    expect(screen.getByRole("list")).toBeInTheDocument()
    // check for language items
    expect(screen.getAllByRole("listitem").length).toBe(3)
  })
  it("render default languages if langs can't be received (e.g. if rendered on overview index", async () => {
    const languages = ["de", "en", "uk"]
    const language = "de"
    const route = "/no-valid-json/not-valid.de.html"
    const history = createHistory(createMemorySource(route))
    await act(() => {
      renderHeader(history, siteTitle, languages, language)
    })
    // check for language menu
    expect(screen.getByRole("list")).toBeInTheDocument()
    // check for language items
    expect(screen.getAllByRole("listitem").length).toBe(3)
  })

  it(`shows only one Concept Scheme link in header, 
  if a concept is present in multiple concept schemes.
  Defaults to concept scheme id if no title in language provided.`, async () => {
    const languages = ["de", "en"]
    const language = "de"
    const route = "/w3id.org/c1.de.html"
    const history = createHistory(createMemorySource(route))
    await act(() => {
      renderHeader(history, siteTitle, languages, language)
    })
    // skohub concept scheme link
    expect(
      screen.getByRole("link", {
        name: "Test Vokabular",
      })
    ).toBeInTheDocument()
  })
})
