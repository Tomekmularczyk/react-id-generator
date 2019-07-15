# react-id-generator [![npm][npm-badge]][npm-badge] [![Build Status][build-status]](https://travis-ci.org/Tomekmularczyk/react-id-generator) [![ts][typescript]][typescript]

The motivation for this package is to ease generating unique ids for components (e.g. for accessibility):

```jsx
import React from "react";
import nextId from "react-id-generator";

class RadioButton extends React.Component {
  htmlId = nextId();

  render() {
    const { children, ...rest } = this.props;
    return (
      <div>
        <label htmlFor={this.htmlId}>
          {children}
        </label>
        <input id={this.htmlId} type="radio" {...rest} />
      </div>
    );
  }
}

// Or with hooks:
import React from "react";
import { useId } from "react-id-generator";

const RadioButton = ({ children, ...rest }) => {
  const [htmlId] = useId();

  return (
    <div>
      <label htmlFor={htmlId}>
        {children}
      </label>
      <input id={htmlId} type="radio" {...rest} />
    </div>
  )
}
```

Each instance of `RadioButton` will have unique `htmlId` like: _id-1_, _id-2_, _id-3_, _id-4_ and so on.

### `nextId`

This is simple function that returns unique id that's incrementing on each call. It can take an argument which will be used as prefix:

```js
import nextId from "react-id-generator";

const id1 = nextId(); // id: id-1
const id2 = nextId('test-id-'); // id: test-id-2
const id3 = nextId(); // id: id-3
```

NOTE: Don't initialize `htmlId` in React lifecycle methods like _render()_. `htmlId` should stay the same during component lifetime.

### `useId`

This is a hook that will generate id (or id's) which will stay the same across re-renders - it's a function component equivalent of `nextId`. However, with some additional features.

By default it will return an array with single element:
```jsx
const idList = useId(); // idList: ["id1"]
```

but you can specify how many id's it should return:
```jsx
const idList = useId(3); // idList: ["id1", "id2", "id3"]
```

you can also set prefix for them:
```jsx
const idList = useId(3, "test"); // idList: ["test1", "test2", "test3"]
```

and you can generate new id's with dependencies list:
```jsx
const Fields = ({ count }) => {
  const idList = useId(count, null, [count]); // idList will stay the same unless "count" prop changes
  ...
}
```

### `resetId`

This function will reset the id counter. Main purpose of this function is to avoid warnings thrown by React durring server-side rendering (and also avoid counter exceeding `Number.MAX_SAFE_INTEGER`):

> Warning: Prop `id` did not match. Server: "test-5" Client: "test-1"

While in browser generator will always start from "1", durring SSR we need to manually reset it before generating markup for client:

```javascript
import { resetId } from "react-id-generator";

server.get("*", (req, res) => {
  resetId();

  const reactApp = (
    <ServerLocation url={req.url}>
      <StyleSheetManager sheet={sheet.instance}>
        <Provider store={store}>
          <App />
        </Provider>
      </StyleSheetManager>
    </ServerLocation>
  );
  const html = renderToString(reactApp);

  res.render("index", { html });
}
```

This should keep ids in sync both in server and browser generated markup.

### `setPrefix`

You can set prefix globally for every future id that will be generated:

```javascript
import { setPrefix } from 'react-id-generator';

setPrefix('test-id-');

const id1 = nextId(); // id: test-id-1
const id2 = nextId(); // id: test-id-2
const id3 = nextId('local'); // id: local-3 - note that local prefix has precedence
```

See an example for [Nextjs](https://nextjs.org/) app:
<br />
[![Edit react-id-generator-example][cs-button]](https://codesandbox.io/s/react-id-generator-example-udjzm?fontsize=14)


Props go to people that shared their ideas in [this SO topic](https://stackoverflow.com/q/29420835/4443323).

### Running example in the repo:
1. First build the package: `yarn build && yarn build:declarations`
2. Go to `example/` directory and run `yarn dev`

[npm-badge]: https://badge.fury.io/js/react-id-generator.svg
[build-status]: https://travis-ci.org/Tomekmularczyk/react-id-generator.svg?branch=master
[cs-button]: https://codesandbox.io/static/img/play-codesandbox.svg
[typescript]: https://badges.frapsoft.com/typescript/code/typescript.svg?v=101