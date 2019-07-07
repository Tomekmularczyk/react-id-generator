# react-id-generator [![npm][npm-badge]][npm-badge] [![Build Status][build-status]](https://travis-ci.org/Tomekmularczyk/react-id-generator)

The motivation for this package is to ease generating unique ids for components (e.g. for accessibility):

```javascript
import React from "react";
import nextId from "react-id-generator";

class RadioButton extends React.Component {
  htmlId = nextId();

  render() {
    const { children, ...rest } = this.props;
    return (
      <label htmlFor={this.htmlId}>
        <input id={this.htmlId} type="radio" {...rest} />
        <div className="fake-radio" />
        {children}
      </label>
    );
  }
}
```

Each instance of `RadioButton` will have unique `htmlId` like: _id-1_, _id-2_, _id-3_, _id-4_ and so on.

NOTE: Don't initialize `htmlId` in React lifecycle methods like _render()_. `htmlId` should stay the same during component lifetime.

### What about server-side rendering?

On each server-side rendering `id` will keep increasing while in browser it will start from 1 again
([read more](https://stackoverflow.com/a/45066550/4443323)). That's why it's necessary to reset generator with each server-side rendering. We do this by placing `ResetHtmlIdGenerator` component on root of the components hierarchy:

```javascript
import { ResetHtmlIdGenerator } from "react-id-generator";

const store = configureStore();
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <ResetHtmlIdGenerator />
        ...
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
```

This should keep ids in sync both on server and browser generated markup.

See an example for [Nextjs](https://nextjs.org/) app:
<br />
[![Edit react-id-generator-example][cs-button]](https://codesandbox.io/s/react-id-generator-example-udjzm?fontsize=14)

#### Custom prefixes

You can set custom prefix for each function call like:

```javascript
this.htmlId = nextId("my-prefix");
```

or globally:

```javascript
<ResetHtmlIdGenerator prefix="my-prefix" />
```

Props go to people that shared their ideas in [this SO topic](https://stackoverflow.com/q/29420835/4443323).

[npm-badge]: https://badge.fury.io/js/react-id-generator.svg
[build-status]: https://travis-ci.org/Tomekmularczyk/react-id-generator.svg?branch=master
[cs-button]: https://codesandbox.io/static/img/play-codesandbox.svg
