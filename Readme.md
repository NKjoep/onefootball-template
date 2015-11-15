# onefootball-template generator

## Usage

- `$ npm install` (just the first time)
- `$ grunt`

Then navigate the `dist/` folder, you'll find the output.

Other available tasks:

- `grunt dev`: will watch for changes form the `src/` folder and re-build automagically

## Customization

the `src` folder contains:

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
- **template.ejs**: it will produce the `dist/index.html` file
- **app.less**: put here your LESS code, it will be parsed and transformed to dist/assets/app.css
- **assets/**: this folder contain static files that will be copied to `dist/assets/`

## Improvements

- **multiple generator**: change the behavior of grunt in order to read all the json files within the src directory and output a html with the same name (this is helpful if need to generate a lot of them)
- **uglify** the generated css (easy task, just use some grunt module)
- **sprites**: use a sprite for the images (could lead to better performance on mobile if the template is embedded in bloated pages)
- **use local assets**: at the moment some assets (see bootstrap) are loaded from the cdn, in production probably we don't want that

## Nice to know

- I wanted to do it really in few hours, that's why I used bootstrap. Those nice grids and responsive utilites help a bit :)
- Grunt: well, I could write an entire module and write everything from scratch. But, why? There are a lot of cool tools out there.
