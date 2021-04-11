import Document, { Head, Html, Main, NextScript } from "next/document";
import { JSXElementConstructor, ReactElement } from "react";
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from "styled-components";

interface Props {
  styleTags: ReactElement<{}, string | JSXElementConstructor<any>>[];
}
export default class MyDocument extends Document<Props> {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}

          <link rel="stylesheet" href="style.css" />
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body style={{ backgroundColor: "#222" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
