import { ProductsNav } from "@/components/products/products-nav";
import { ProductFeedback } from "@/components/products/product-feedback";
import { ProductsBackgroundVisualization } from "@/components/products-background-visualization";


export default function ProductReviewsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background Visualization */}
      <ProductsBackgroundVisualization />
      
      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-12">
        {/* Breadcrumbs and Navigation */}
        <nav className="mb-4 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">Home</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-foreground">Products</a>
          <span className="mx-2">/</span>
          <span className="text-foreground">Reviews</span>
        </nav>
        
        <ProductsNav />
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Customer <span className="text-primary">Reviews</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            See what our customers are saying about our products and services
          </p>
        </div>
        
        {/* Product Feedback Component */}
        <ProductFeedback />
      </div>
    </div>
  );
}