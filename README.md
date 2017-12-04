# react-id-generator

Motivation for this package is to ease generating unique id's for components (e.g. for accessiblity):


```javascript
import React from 'react';
import idGenerator from 'react-id-generator';

class RadioButton extends React.Component {
  componentWillMount() {
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

Alternatively you can initialize `htmlId` in constructor, however don't do it in *render()* method because
id will change on each re-render! 


### What about server-side rendering?

On each server-side rendering `id` will keep increasing while in browser it will start from 1 again 
([read more](https://stackoverflow.com/a/45066550/4443323)). Thats why it's neccessary to reset generator on each server-side rendering. We do this by placing `ResetHtmlIdGenerator` component on root of the component hierarchy:

````javascript
import { ResetHtmlIdGenerator } from 'react-id-generator';

const store = configureStore();
function render() {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
	    <ResetHtmlIdGenerator />
        ...
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
  );
}
````

This should keep id's in sync both on server and browser generated markup.

Props go to people that shared their ideas in [this SO topic](https://stackoverflow.com/q/29420835/4443323).