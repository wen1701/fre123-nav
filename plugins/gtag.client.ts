// plugins/gtag.client.ts
export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();

    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=G-4BP006DNXY`,
          async: true,
        },
      ],
    });

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-4BP006DNXY');

    router.afterEach((to) => {
      gtag('config', 'G-4BP006DNXY', {
        page_path: to.fullPath,
      });
    });
});
