import 'flowbite';
import Script from 'next/script';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';

import 'assets/main.scss';
import 'styles/globals.css';
import store from 'src/redux/store';
import 'react-intl-tel-input/dist/main.css';
import Layout from 'components/Layout/Layout';
import 'react-datepicker/dist/react-datepicker.css';

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  const [mount, setMount] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setMount(true);
    function disableForwardButton() {
      let flag: boolean,
        loop = false;
      window.addEventListener('popstate', function () {
        if (flag) {
          if (history.state && history.state.hasOwnProperty('page')) {
            loop = true;
            history.go(-1);
          } else {
            loop = false;
            history.go(-1);
          }
        } else {
          history.pushState(
            {
              page: true,
            },
            null as unknown as string,
            null
          );
        }
        flag = loop ? true : !flag;
      });

      window.onclick = function () {
        flag = false;
      };
    }
    disableForwardButton();
  }, []);

  useEffect(() => {
    console.log("Here",isLoad);
    isLoad && (
  //     <Script id="g-pixel" type="text/javascript">
  //       {`consenTag.init({
  //   containerId: "79117570",
  //   silentMode: true
  //  }, true)`}
  //     </Script>
  
  <Script
          id="g-pixel"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            console.log("InConsen",consenTag);
              consenTag.init({
                containerId: "79117570",
                silentMode: true
              }, true);
            `,
          }}
        />
    );
    console.log("Inside")
    const timer = setTimeout(() => {
      setIsLoad(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoad]);

  return (
    <>
      <Script
        id="google-pixel"
        src="https://consentag.eu/public/3.1.1/consenTag.js"
        onLoad={() => setIsLoad(true)}
      />
      {mount && (
        <Provider store={store}>
          <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
            <Layout>
              <Component {...rest} />
            </Layout>
          </I18nProvider>
        </Provider>
      )}
    </>
  );
}

export default App;