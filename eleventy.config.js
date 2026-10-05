export default function (eleventyConfig) {
  // File copiati così come sono nel sito finale
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  // Collezioni
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/blog/posts/*.md").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("corsi", (api) =>
    api.getFilteredByGlob("src/corsi/*.md").sort((a, b) => (a.data.ordine || 0) - (b.data.ordine || 0))
  );
  eleventyConfig.addCollection("categorie", (api) =>
    api.getFilteredByGlob("src/categorie/*.md").sort((a, b) => a.data.title.localeCompare(b.data.title, "it"))
  );
  eleventyConfig.addCollection("tagList", (api) => {
    const set = new Set();
    api.getFilteredByGlob("src/blog/posts/*.md").forEach((p) => (p.data.tags || []).forEach((t) => set.add(t)));
    return [...set].sort((a, b) => a.localeCompare(b, "it"));
  });

  // Le immagini caricate dal pannello usano /assets/uploads/...: aggiungo il prefisso se serve
  eleventyConfig.addTransform("prefisso-upload", function (content) {
    const prefix = process.env.PATH_PREFIX || "/";
    if (prefix === "/" || !(this.page.outputPath || "").endsWith(".html")) return content;
    return content.replaceAll('src="/assets/uploads/', `src="${prefix}assets/uploads/`);
  });

  // Filtri
  eleventyConfig.addFilter("dataIt", (d) =>
    new Date(d).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("perCategoria", (posts, slug) => posts.filter((p) => p.data.categoria === slug));
  eleventyConfig.addFilter("perTag", (posts, tag) => posts.filter((p) => (p.data.tags || []).includes(tag)));
  eleventyConfig.addFilter("trovaCategoria", (cats, slug) => cats.find((c) => c.fileSlug === slug));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    // Su GitHub Pages l'indirizzo è /nome-repo/, la variabile la imposta il workflow
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
