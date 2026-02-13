# Blog Components

Modern, accessible blog components following GOV.UK design system standards.

## Components

### BlogArticleHeader

Displays article metadata including title, category, author, date, and reading time.

```tsx
<BlogArticleHeader
  category="Legal Analysis"
  title="Understanding Legal Retainers"
  excerpt="A comprehensive guide to legal retainers..."
  author="Dylan Bennett"
  publishedDate="2025-10-20"
  readingTime={25}
/>
```

### BlogAuthorBio

Displays author information with avatar, credentials, and social links.

```tsx
<BlogAuthorBio
  name="Dylan Bennett"
  title="Program Director"
  bio="Expert in mass tort litigation..."
  image="/author.jpg"
  linkedin="https://linkedin.com/in/..."
  twitter="https://twitter.com/..."
/>
```

### BlogCallout

Highlighted callout boxes for important information.

```tsx
<BlogCallout type="warning" title="Important Notice">
  This information is time-sensitive...
</BlogCallout>
```

Types: `info` | `warning` | `success` | `important`

### BlogInsetText

GOV.UK style inset text for secondary information.

```tsx
<BlogInsetText>
  This applies to cases filed after January 2025.
</BlogInsetText>
```

### BlogSummaryCard

Summary cards with bullet points for key takeaways.

```tsx
<BlogSummaryCard
  title="Key Takeaways"
  items={[
    "Retainers provide upfront funding for legal work",
    "Multiple retainer types exist with different rules",
    "Trust account compliance is critical"
  ]}
/>
```

### BlogTable

Accessible data tables with proper semantic markup.

```tsx
<BlogTable
  caption="Retainer Costs by Practice Area"
  headers={["Practice Area", "Typical Range", "Average"]}
  rows={[
    ["Criminal Defense", "$3,500 - $30,000", "$8,500"],
    ["Family Law", "$2,500 - $75,000", "$12,000"]
  ]}
/>
```

### BlogRelatedPosts

Related articles section with preview cards.

```tsx
<BlogRelatedPosts posts={relatedPosts} />
```

### BlogSkipLink

Skip-to-content link for keyboard navigation accessibility.

```tsx
<BlogSkipLink />
```

### BlogSection

Semantic section wrapper for content organization.

```tsx
<BlogSection>
  <h2>Section Title</h2>
  <p>Content...</p>
</BlogSection>
```

## Accessibility Features

- Semantic HTML5 elements (article, section, aside, time)
- ARIA labels and landmarks
- Skip links for keyboard navigation
- Proper heading hierarchy
- Focus states on all interactive elements
- Screen reader friendly metadata
- High contrast ratios
- Responsive text sizing

## Usage in Blog Posts

Instead of using `dangerouslySetInnerHTML`, structure blog content with these components:

```tsx
import {
  BlogArticleHeader,
  BlogCallout,
  BlogSummaryCard,
  BlogTable,
  BlogAuthorBio,
  BlogRelatedPosts
} from '@/components/blog';

<article>
  <BlogArticleHeader {...headerProps} />

  <BlogSummaryCard
    title="What You'll Learn"
    items={["...", "...", "..."]}
  />

  <p>Article content...</p>

  <BlogCallout type="info" title="Key Point">
    Important information here
  </BlogCallout>

  <BlogTable
    caption="Data Comparison"
    headers={["Column 1", "Column 2"]}
    rows={[...]}
  />

  <BlogAuthorBio {...authorProps} />

  <BlogRelatedPosts posts={related} />
</article>
```
