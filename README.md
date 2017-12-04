###React npm module boilerplate with webpack and babel-preset-env

1. Clone the repo.
2. Initialize new git repo (`rm -rf .git` and `git init`)
3. Change _name_, _author_ and _description_ in **package.json** file.

While development it is recommended to make sym-link of this package and use it in test project.

1. Go to root directory and execute `npm link`.
2. Go to test project and execute `npm link [package name]`.
3. Now you can import your package as anything else like `import MyComponent from "my-test-package";`.
4. Go back to your package and start development in watch-mode by `npm run dev`
5. Now everything you change in **src** will be automatically transpiled by webpack to es5 
and exported to **lib/index.js** file. Changes will also be reflected in your test project without needing 
to reinstall packages every time something has changed.

Good luck.