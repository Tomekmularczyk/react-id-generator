# react-id-generator [![npm][npm-badge]](https://www.npmjs.com/package/react-id-generator)

The motivation for this package is to ease generating unique ids for components (e.g. for accessibility):


```javascript
import React from 'react';
import idGenerator from 'react-id-generator';

class RadioButton extends React.Component {
    constructor(props) {
      super(props);
      this.htmlId = idGenerator();
    }

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

Each instance of `RadioButton` will have unique `htmlId` like: *id-1*, *id-2*, *id-3*, *id-4* and so on.

Alternatively you can initialize `htmlId` in constructor, however, don't do it in *render()* method because
`htmlId` will then change on each re-render!


### What about server-side rendering?

On each server-side rendering `id` will keep increasing while in browser it will start from 1 again
([read more](https://stackoverflow.com/a/45066550/4443323)). That's why it's necessary to reset generator with each server-side rendering. We do this by placing `ResetHtmlIdGenerator` component on root of the components hierarchy:

```javascript
import { ResetHtmlIdGenerator } from 'react-id-generator';

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
    document.getElementById('app'),
);
```

This should keep ids in sync both on server and browser generated markup.

#### Custom prefixes

You can set custom prefix for each function call like:

```javascript
this.htmlId = idGenerator('my-prefix');
```

or globally:

```javascript
<ResetHtmlIdGenerator prefix="my-prefix" />
```

Props go to people that shared their ideas in [this SO topic](https://stackoverflow.com/q/29420835/4443323).

[npm-badge]: https://badge.fury.io/js/react-id-generator.svg