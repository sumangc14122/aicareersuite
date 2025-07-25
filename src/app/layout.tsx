// import { Toaster } from "@/components/ui/toaster";
// import { ClerkProvider } from "@clerk/nextjs";
// import type { Metadata } from "next";
// import { ThemeProvider } from "next-themes";
// import { Inter } from "next/font/google";
// import Script from "next/script";
// import "./globals.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: {
//     template: "%s - AI Resume Builder",
//     absolute: "AI Resume",
//   },
//   description:
//     "AI Resume Builder is the easiest way to create a professional resume that will help you land your dream job.",
//   openGraph: {
//     title: "AI Resume Builder",
//     description:
//       "AI Resume Builder is the easiest way to create a professional resume that will help you land your dream job.",
//     images: [
//       {
//         url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
//         width: 1200,
//         height: 630,
//         alt: "AI Resume Builder",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "AI Resume Builder",
//     description:
//       "AI Resume Builder is the easiest way to create a professional resume that will help you land your dream job.",
//     images: [
//       {
//         url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
//         width: 1200,
//         height: 630,
//         alt: "AI Resume Builder",
//       },
//     ],
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en" suppressHydrationWarning>
//         <head>
//           <Script
//             strategy="afterInteractive"
//             src="https://www.googletagmanager.com/gtag/js?id=G-N3B99NNZ3C"
//           />
//           <Script id="google-analytics" strategy="afterInteractive">
//             {`
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', 'G-N3B99NNZ3C');
//             `}
//           </Script>

//           {/* <!-- Google tag (gtag.js) --> */}
//           <script
//             async
//             src="https://www.googletagmanager.com/gtag/js?id=AW-17044519731"
//           ></script>
//           <script>
//             {`  window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'AW-17044519731');
// `}
//           </script>

//           <Script
//             async
//             src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1093044909932327"
//             crossOrigin="anonymous"
//           ></Script>

//           <Script id="adroll-init" strategy="afterInteractive">
//             {`
//     adroll_adv_id = "N22Q7E234NDEDM6B4RLREI";
//     adroll_pix_id = "XIBD34PI4VAJPAAXQO5Q2Z";
//     adroll_version = "2.0";

//     (function(w, d, e, o, a) {
//         w.__adroll_loaded = true;
//         w.adroll = w.adroll || [];
//         w.adroll.f = ['setProperties', 'identify', 'track', 'identify_email', 'get_cookie'];
//         var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id + "/roundtrip.js";
//         for (a = 0; a < w.adroll.f.length; a++) {
//             w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) {
//                 return function() {
//                     w.adroll.push([n, arguments])
//                 }
//             })(w.adroll.f[a])
//         }

//         e = d.createElement('script');
//         o = d.getElementsByTagName('script')[0];
//         e.async = 1;
//         e.src = roundtripUrl;
//         o.parentNode.insertBefore(e, o);
//     })(window, document);
//     adroll.track("pageView");
//   `}
//           </Script>
//         </head>
//         <body className={inter.className}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {children}
//             <Toaster />
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }


import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Resume Builder",
  description: "AI Resume Builder is the easiest way to create a professional resume that will help you land your dream job.",
  metadataBase: new URL('https://www.airesumepro.app'),
  openGraph: {
    type: 'website',
    url: 'https://www.airesumepro.app/',
    title: 'AI Resume Builder',
    description: 'AI Resume Builder is the easiest way to create a professional resume that will help you land your dream job.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Resume Builder - Create professional resumes easily',
      },
    ],
    siteName: 'AI Resume Builder',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ai_career_suite',
    creator: '@ai_career_suite',
    title: 'AI Resume Builder',
    description: 'AI Resume Builder is the easiest way to create a professional resume that will help you land your dream job.',
    images: ['/og-image.png'],
  },
  other: {
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* WhatsApp-specific cache control */}
          <meta httpEquiv="cache-control" content="no-cache" />
          <meta httpEquiv="expires" content="0" />
          <meta httpEquiv="pragma" content="no-cache" />
          
          {/* Canonical URL */}
          <link rel="canonical" href="https://www.airesumepro.app/" />
          
          {/* Google Analytics */}
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-N3B99NNZ3C"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N3B99NNZ3C');
            `}
          </Script>

          {/* Google Ads */}
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=AW-17044519731"
          />
          <Script id="google-ads" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17044519731');
            `}
          </Script>

          {/* AdSense */}
          <Script
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1093044909932327"
            crossOrigin="anonymous"
          />

          {/* AdRoll */}
          <Script id="adroll-init" strategy="afterInteractive">
            {`
              adroll_adv_id = "N22Q7E234NDEDM6B4RLREI";
              adroll_pix_id = "XIBD34PI4VAJPAAXQO5Q2Z";
              adroll_version = "2.0";

              (function(w, d, e, o, a) {
                  w.__adroll_loaded = true;
                  w.adroll = w.adroll || [];
                  w.adroll.f = ['setProperties', 'identify', 'track', 'identify_email', 'get_cookie'];
                  var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id + "/roundtrip.js";
                  for (a = 0; a < w.adroll.f.length; a++) {
                      w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) {
                          return function() {
                              w.adroll.push([n, arguments])
                          }
                      })(w.adroll.f[a])
                  }

                  e = d.createElement('script');
                  o = d.getElementsByTagName('script')[0];
                  e.async = 1;
                  e.src = roundtripUrl;
                  o.parentNode.insertBefore(e, o);
              })(window, document);
              adroll.track("pageView");
            `}
          </Script>
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}