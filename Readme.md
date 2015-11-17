# onefootball-template generator

## Web App with Express.js

### Usage

- `$ npm install` (just the first time)
- `$ npm start`
- use your browser and go to http://localhost:3000/

This demo will redirect you to http://localhost:3000/player/134 if you try to
visit the root.

### How it works

It is basically an Express app generated with the generator.
It crates already organized, good looking web apps.

Basically, I removed all the unused stuff and created the player route. You can find it at `server/routes/player.js`

In order to make it a bit more pleasant, I used the promise framework "bluebird".

#### How it is organized

```
server/
├── app.js
├── bin
│   └── www
├── datastore
│   ├── 134.json
│   └── 135.json
├── less
│   └── style.less
├── public
│   └── images
│       ├── bg-player-template.png
│       └── logo.png
├── routes
│   └── player.js
└── views
    ├── error.ejs
    └── player-card.ejs
```

* `server/`: contains the whole web app
* `server/datastore/`: where the json are stored, atm I've put 2 of them just for demo purpose.
* `server/less/style.less`: the less file needed to render this player card. It is read by player.js
* `server/public`: static folder connected with express
* `server/routes/player.js`: It is the responsible for routing /player url
* `server/views/player-card`: the html template, more or less the same version of the grunt one

### Notes

Since It renders a template at runtime I preferred not to write to disk the css file. But to embed the generated css within the html.

Further optimization can occurs if the requests are so many and if the data jsons don't change so often.

It is appropriate to think about caching depending on the desired performance.

----

## Static Compiler with Grunt

### Usage

- `$ npm install` (just the first time)
- `$ grunt`

Then navigate the `dist/` folder, you'll find the output.

Other available tasks:

- `grunt dev`: will watch for changes form the `src/` folder and re-build automagically

### Customization

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

### Improvements

- **multiple generator**: change the behavior of grunt in order to read all the json files within the src directory and output a html with the same name (this is helpful if need to generate a lot of them)
- **uglify** the generated css (easy task, just use some grunt module)
- **sprites**: use a sprite for the images (could lead to better performance on mobile if the template is embedded in bloated pages)
- **use local assets**: at the moment some assets (see bootstrap) are loaded from the cdn, in production probably we don't want that

### Nice to know

- I wanted to do it really in few hours, that's why I used bootstrap. Those nice grids and responsive utilites help a bit :)
- Grunt: well, I could write an entire module and write everything from scratch. But, why? There are a lot of cool tools out there.
