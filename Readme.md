# onefootball-template generator

**Usage**:

- ``$ npm install`` (just the first time)
- ``$ grunt``

Then navigate the `dist/` folder, you'll find the output.

Other available tasks:

- ``grunt dev`: will watch for changes form the `src/` folder and re-build automagically

## Customization

the `src` folder contains this files:

```
src/
├── app.less
├── assets
│   ├── bg-player-template.png
│   └── logo.png
├── data.json
└── template.ejs
```

- **data.json**: the data source, our grunt tasks will read the data from this file
- **template.ejs**: it will produce the `dist/index.html` file, run it from your browser
- **app.less**: put here your LESS code, it will be parsed and transformed to dist/assets/app.css
- **assets/**: this folder contain static files that will be copied to `dist/assets/`
