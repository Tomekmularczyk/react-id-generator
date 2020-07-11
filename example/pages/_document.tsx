import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import { resetId } from "../../lib";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    // _document is only rendered on the server side and not on the client side
    // this will reset id keeping markup consistent across server and browser
    resetId();

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
}

export default MyDocument;
