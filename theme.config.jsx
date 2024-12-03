export default {
  logo: <span>Ayobami Adesina</span>,
  project: {
    link: 'https://github.com/ayobami11/portfolio',
  },
  docsRepositoryBase: 'https://github.com/ayobami11/portfolio/tree/main',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Ayobami Adesina'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Ayobami Adesina's Portfolio and Blog" />
      <meta name="og:title" content="Ayobami Adesina" />
    </>
  ),
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://github.com/ayobami11" target="_blank">
          Ayobami Adesina
        </a>
      </span>
    )
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  toc: {
    backToTop: true
  }
}
