Implementation of [ConnectFour](http://en.wikipedia.org/wiki/Connect_Four) game using [jQuery](https://jquery.com/).

* Hosted versions at
  *  http://samyakbhuta.github.io/connect-four/ (Github Pages)
  *  https://connectfour-jquery.samyakbhuta.com/ (On Netlify, Git push to deploy)
  *  https://connectfour-web-bundle.samyakbhuta.com (On Netlify, as web bundle - manual deploy. Not guranteed to be latest!!)
* [Docco](http://ashkenas.com/docco/) documentation at http://samyakbhuta.github.io/connect-four/docs/js/app.html, also at the other two deployements.

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

## How to generate documentation?

 * This project is using [Docco](http://ashkenas.com/docco/) to create documentation.

 * Download and install `docco` as per the instructions given in the official website.

 * Type following command, while you are in project root.

   ```docco js/*.*```

 * The annonated documentation is generated in the `docs` folder. One can serve the generated `.html` files, in a browser. E.g. `http://localhost:8080/docs/js/app.html`
