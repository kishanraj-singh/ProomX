function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function generateSlug(title) {
  let slug = `${slugify(title)}`;
  return slug;
}
