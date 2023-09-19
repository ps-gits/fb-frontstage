import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from '../Header/Header';

useEffect(() => {
    
  const gtmScript = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WHMT2ZS3');
  `;

  try {
    const executeAdrollScript = new Function(gtmScript);
    executeAdrollScript();
  } catch (error) {
    console.error("Error executing script:", error);
  }
}, []);

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <>
      <div>
        <>
          {router.asPath !== '/' && (
            <div className="w-full">
              <Header />
            </div>
          )}
        </>
        <div>
          <div
            className="
          layout-content"
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout;

