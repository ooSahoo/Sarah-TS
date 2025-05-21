# ✅ Mintlify Migration Capability Summary

This table summarizes which features are supported by Mintlify and what actions might be needed for migration.

| Feature / Capability                         | Supported | Notes                                                                                 | Docs Link                                                                 |
|----------------------------------------------|-----------|----------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| **MDX Support**                              | ✅        | Mix Markdown with JSX inside `.mdx` files                                             | [MDX Docs](https://mintlify.com/docs/structure/mdx)                     |
| **React Components (inline in MDX)**         | ✅        | You can define components directly in `.mdx` files                                    | [React Components](https://mintlify.com/docs/react-components)          |
| **React Components (import from file)**      | ✅        | Supports `.jsx` or `.tsx` imports into `.mdx`                                         | [React Components](https://mintlify.com/docs/react-components)          |
| **Standard HTML in MDX**                     | ✅        | Raw HTML tags like `<img>` and `<iframe>` are allowed                                | [HTML Embeds](https://mintlify.com/docs/image-embeds)                   |
| **JSX Syntax in HTML**                       | ✅        | Use camelCase for attributes (`autoPlay`, not `autoplay`)                             | [HTML Embeds](https://mintlify.com/docs/image-embeds)                   |
| **Custom Scripts (JS injection)**            | ✅        | Inject JS for analytics or customization                                              | [Custom Scripts](https://mintlify.com/docs/settings/custom-scripts)     |
| **Custom CSS**                               | ✅        | Use `.css` files to override default styling                                          | [Custom Styling](https://mintlify.com/docs/settings/custom-styling)     |
| **YAML Frontmatter**                         | ❌        | Not supported. Use `export const` syntax for metadata                                 | [Metadata in MDX](https://mintlify.com/docs/structure/mdx#defining-metadata-with-exports) |
| **Importing YAML Data**                      | ❌        | Not supported. Convert YAML to `.js` or `.json`                                       | —                                                                        |
| **Navigation Configuration**                 | ✅        | Managed via `navigation.json`                                                         | [Navigation](https://mintlify.com/docs/navigation)                      |
| **Versioning (Documentation)**               | 🔸 Limited | No official support; must be implemented manually                                     | [Versioning](https://mintlify.com/docs/versioning)                      |
| **Search (Built-in Algolia)**                | ✅        | Built-in and configurable from dashboard                                              | [Search](https://mintlify.com/docs/search)                              |
| **Sidebar Grouping & Styling**               | ✅        | Configure icons, separators, and groups in `navigation.json`                         | [Navigation Options](https://mintlify.com/docs/navigation#navigation-json-options) |
| **Multi-language Support (i18n)**            | ❌        | No native support. Requires manual routing workaround                                 | —                                                                        |

---

## 📌 Migration Tips

- Convert YAML files to `.js` or `.json` if used as data/config source
- Replace frontmatter with `export const` at the top of MDX files
- Organize reusable components in `components/` or `snippets/` folder
- Consider your need for versioning if your current platform supports it