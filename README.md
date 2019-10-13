Implementation of [ConnectFour](http://en.wikipedia.org/wiki/Connect_Four) game using [jQuery](https://jquery.com/).

## Demo

**Hosted At**|**Continuous Delivery (`git push` to deploy)**|**Automatic Documentation Generation**|**Application Link**|**Source Code Documentation Link**
:-----:|:-----:|:-----:|:-----:|:-----:
[Github Pages](https://pages.github.com/)| YES| NO| [See](http://samyakbhuta.github.io/connect-four/) | [See](http://samyakbhuta.github.io/connect-four/docs/js/app) (Can be older version!)
[Netlify](https://www.netlify.com/)| YES| YES| [See](https://connectfour-jquery.samyakbhuta.com/) | [See](https://connectfour-jquery.samyakbhuta.com/docs/js/app)
[Netlify](https://www.netlify.com/) (['Manual deploys'](https://www.netlify.com/docs/manual-deploys/))| NO (Deployed as web bundle. Not guranteed to be latest version!!)| NO (Should be possible. Not supported yet. Hopefully in future. Finger crossed.)| [See](https://connectfour-web-bundle.samyakbhuta.com/) (Can be older version!) | [See](https://connectfour-web-bundle.samyakbhuta.com/docs/app) (Can be older version!)

## How to start the game on your local machine?
 * Clone the repo to your local machine. On your command line, type following.

    ```git clone https://github.com/samyakbhuta/connect-four.git```
 * Go to the folder where game is located. That would be project root. On your command line, type following.

    ```cd connect-four```
 * Run local web server by typing following in command line.

    ```python -m SimpleHTTPServer```
 * Go to your browser and open the game on port 8000.  

    Type ```localhost:8000``` in your browser's location bar.
 * Enjoy the game!

## How to generate documentation on your local machine?

There are two ways to build the documentation. Both are described here. Choose either of them. Forner is recommended as it doesn't clutter your global NPM package space.

### Install `docco` as local package (Recommended)
 * In the project root, type following. It will install `docco` locally.

   ```npm install```
 
 * To generate the documentation, type following. It will generate the documentation in the `docs` folder.

    ```npx docco js/*.*```
 
### Install `docco` as global package
 * This project is using [Docco](http://ashkenas.com/docco/) to create documentation.

 * Download and install `docco` as per the instructions given in the official website.

 * Type following command, while you are in project root.

   ```docco js/*.*```

 The annonated documentation is generated in the `docs` folder. One can serve the generated `.html` files, in a browser. E.g. `http://localhost:8080/docs/js/app.html`
