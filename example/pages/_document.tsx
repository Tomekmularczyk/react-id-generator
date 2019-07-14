import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from "next/document";
import { ResetHtmlIdGenerator } from "../../lib";

// _document is only rendered on the server side and not on the client side
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* 
             this will reset id keeping markup 
             consistent across server and browser*/}
          <ResetHtmlIdGenerator />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
