import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Legal & Policies — EncryptArx",
	description: "Privacy, Terms, Cookies, Accessibility, and DPA.",
};

export default function LegalCenterPage() {
	return (
		<main className="container mx-auto max-w-3xl px-4 py-12">
			<h1 className="text-3xl font-bold tracking-tight">Legal & Policies</h1>
			<nav className="mt-4 flex flex-wrap gap-3 text-sm">
				<a href="#privacy" className="underline underline-offset-4">Privacy</a>
				<a href="#terms" className="underline underline-offset-4">Terms</a>
				<a href="#cookies" className="underline underline-offset-4">Cookies</a>
				<a href="#accessibility" className="underline underline-offset-4">Accessibility</a>
				<a href="#dpa" className="underline underline-offset-4">DPA</a>
			</nav>
			<section id="privacy" className="mt-10">
				<h2 className="text-2xl font-semibold">Privacy Policy</h2>
				<p className="mt-2 text-sm text-muted-foreground">Data collection, retention, and rights.</p>
			</section>
			<section id="terms" className="mt-10">
				<h2 className="text-2xl font-semibold">Terms of Service</h2>
				<p className="mt-2 text-sm text-muted-foreground">User obligations and licensing.</p>
			</section>
			<section id="cookies" className="mt-10 scroll-mt-20">
				<h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
				<div className="prose prose-invert max-w-none space-y-6">
					<p className="text-muted-foreground leading-relaxed">
						Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
					</p>
					
					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">What Are Cookies?</h3>
						<p className="text-muted-foreground leading-relaxed">
							Cookies are small text files that are placed on your device when you visit our website. 
							They help us provide you with a better experience by remembering your preferences and 
							understanding how you use our site.
						</p>
					</div>

					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">How We Use Cookies</h3>
						<p className="text-muted-foreground leading-relaxed">
							We use cookies to enhance your browsing experience, analyze site traffic, personalize content, 
							and improve our services. We respect your privacy and give you control over which cookies you accept.
						</p>
					</div>

					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">Cookie Categories</h3>
						
						<div className="space-y-6 mt-6">
							<div className="p-6 rounded-xl border border-primary/20 bg-slate-800/30">
								<h4 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
									Necessary Cookies
								</h4>
								<p className="text-muted-foreground mb-3">
									These cookies are essential for the website to function properly. They cannot be disabled 
									as they are required for core functionality such as security, authentication, and session management.
								</p>
								<ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
									<li>Authentication and login sessions</li>
									<li>Security and fraud prevention</li>
									<li>Load balancing and performance</li>
									<li>Cookie consent preferences</li>
								</ul>
							</div>

							<div className="p-6 rounded-xl border border-purple-500/20 bg-slate-800/30">
								<h4 className="text-lg font-semibold text-purple-400 mb-2 flex items-center gap-2">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
									</svg>
									Analytics Cookies
								</h4>
								<p className="text-muted-foreground mb-3">
									These cookies help us understand how visitors interact with our website by collecting 
									anonymous information about page views, user behavior, and site performance.
								</p>
								<ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
									<li>Page views and navigation patterns</li>
									<li>User behavior and interactions</li>
									<li>Performance metrics and error tracking</li>
									<li>Feature usage statistics</li>
								</ul>
							</div>

							<div className="p-6 rounded-xl border border-orange-500/20 bg-slate-800/30">
								<h4 className="text-lg font-semibold text-orange-400 mb-2 flex items-center gap-2">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
									</svg>
									Marketing Cookies
								</h4>
								<p className="text-muted-foreground mb-3">
									These cookies are used to deliver personalized advertisements and track the effectiveness 
									of our marketing campaigns. They may be set by our advertising partners.
								</p>
								<ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
									<li>Ad targeting and personalization</li>
									<li>Campaign tracking and attribution</li>
									<li>Social media integration</li>
									<li>Retargeting and remarketing</li>
								</ul>
							</div>

							<div className="p-6 rounded-xl border border-green-500/20 bg-slate-800/30">
								<h4 className="text-lg font-semibold text-green-400 mb-2 flex items-center gap-2">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
									Functional Cookies
								</h4>
								<p className="text-muted-foreground mb-3">
									These cookies enable enhanced functionality and personalization, such as remembering 
									your preferences, language settings, and other choices you make.
								</p>
								<ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
									<li>Language and region preferences</li>
									<li>Theme and display settings</li>
									<li>User preferences and customizations</li>
									<li>Chat and support functionality</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">Managing Your Cookie Preferences</h3>
						<p className="text-muted-foreground leading-relaxed">
							You can manage your cookie preferences at any time by clicking the cookie settings button 
							(found in the bottom-right corner of the page) or by visiting this page. You can accept all 
							cookies, reject non-essential cookies, or customize your preferences for each category.
						</p>
					</div>

					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">Third-Party Cookies</h3>
						<p className="text-muted-foreground leading-relaxed">
							Some cookies on our website are set by third-party services such as analytics providers, 
							advertising networks, and social media platforms. We do not control these cookies, and you 
							should refer to their respective privacy policies for more information.
						</p>
					</div>

					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">Cookie Retention</h3>
						<p className="text-muted-foreground leading-relaxed">
							Cookies are stored on your device for different periods depending on their type:
						</p>
						<ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
							<li><strong>Session cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
							<li><strong>Persistent cookies:</strong> Remain on your device for a set period (typically up to 12 months) or until you delete them</li>
							<li><strong>Preference cookies:</strong> Stored for up to 12 months to remember your settings</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">Your Rights</h3>
						<p className="text-muted-foreground leading-relaxed">
							Under GDPR, CCPA, and other privacy regulations, you have the right to:
						</p>
						<ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
							<li>Be informed about the use of cookies</li>
							<li>Give or withdraw consent for non-essential cookies</li>
							<li>Access information about cookies we use</li>
							<li>Delete cookies from your device at any time</li>
							<li>Request information about data collected through cookies</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-foreground">Contact Us</h3>
						<p className="text-muted-foreground leading-relaxed">
							If you have any questions about our use of cookies or this Cookie Policy, please contact us at{' '}
							<a href="/contact" className="text-primary hover:underline">our contact page</a>.
						</p>
					</div>
				</div>
			</section>
			<section id="accessibility" className="mt-10">
				<h2 className="text-2xl font-semibold">Accessibility Statement</h2>
				<p className="mt-2 text-sm text-muted-foreground">Commitment and contact.</p>
			</section>
			<section id="dpa" className="mt-10">
				<h2 className="text-2xl font-semibold">Data Processing Addendum</h2>
				<p className="mt-2 text-sm text-muted-foreground">Request DPA via contact.</p>
			</section>
		</main>
	);
}


