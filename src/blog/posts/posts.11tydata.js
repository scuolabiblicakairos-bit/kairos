export default {
  layout: "layouts/post.njk",
  permalink: (data) => `/blog/${data.page.fileSlug}/`,
};
