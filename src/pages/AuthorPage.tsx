import { Link, Navigate, useParams } from "react-router-dom";
import { Calendar, Linkedin } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogAuthors, blogPosts } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "@/lib/helmet";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const AuthorPage = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const author = blogAuthors.find((entry) => entry.id === authorId);

  if (!author) {
    return <Navigate to="/404" replace />;
  }

  const authorPosts = blogPosts
    .filter((post) => post.status === "published" && post.author.id === author.id)
    .sort(
      (left, right) =>
        new Date(right.modifiedDate || right.publishedDate).getTime() -
        new Date(left.modifiedDate || left.publishedDate).getTime()
    );

  const canonicalUrl = `https://legalretainers.com${author.url}`;
  const personSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${author.name} | LegalRetainers`,
        mainEntity: {
          "@id": `${canonicalUrl}#person`,
        },
        isPartOf: {
          "@id": "https://legalretainers.com/#website",
        },
      },
      {
        "@type": "Person",
        "@id": `${canonicalUrl}#person`,
        name: author.name,
        jobTitle: author.title,
        description: author.bio,
        image: `https://legalretainers.com${author.image}`,
        url: canonicalUrl,
        worksFor: {
          "@id": "https://legalretainers.com/#organization",
        },
        ...(author.linkedin ? { sameAs: [author.linkedin] } : {}),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${author.name} | LegalRetainers Insights`}
        description={author.bio}
        canonical={canonicalUrl}
        keywords={`${author.name}, ${author.title}, LegalRetainers author, legal insights`}
        ogImage={author.image}
        ogImageAlt={author.name}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>
      <Header />

      <section className="bg-primary py-12 text-primary-foreground md:py-16">
        <div className="lr-width-container">
          <Breadcrumbs
            items={[
              { label: "Insights", href: "/insights" },
              { label: author.name, href: author.url },
            ]}
            variant="light"
          />
          <div className="mt-6 grid gap-6 md:grid-cols-[auto,1fr] md:items-center">
            <img
              src={author.image}
              alt={author.name}
              width="160"
              height="160"
              className="h-32 w-32 rounded-full border-4 border-white/30 object-cover md:h-40 md:w-40"
            />
            <div className="max-w-3xl">
              <h1 className="lr-heading-xl mb-3 text-white">{author.name}</h1>
              <p className="mb-3 text-lg font-semibold text-white/90">
                {author.credentials || author.title}
              </p>
              <p className="lr-body text-white/90">{author.bio}</p>
              {author.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="py-8 md:py-12">
        <div className="lr-width-container">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="lr-heading-l mb-2">Articles by {author.name}</h2>
              <p className="lr-body text-muted-foreground">
                Published insights and practical analysis for plaintiff law firms.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/insights">Back to Insights</Link>
            </Button>
          </div>

          <div className="grid gap-6">
            {authorPosts.map((post) => (
              <Card key={post.id} className="border-2 border-black bg-white">
                <CardContent className="p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-black/60">
                    <span>{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                    </span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-black">
                    <Link to={`/insights/${post.slug}`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mb-4 text-black/75">{post.excerpt}</p>
                  <Button asChild variant="brutalist-green">
                    <Link to={`/insights/${post.slug}`}>Read article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorPage;
