# ✨ Canvas Based Pie Chart Generator
- An easy-to-use canvas based pie chart generator 👀
- specify labels and size, and leave the rest to the system. 🦄

# 🔥 Installation
- Download package with command `npm install canvas-pie-chart` or `yarn add canvas-pie-chart`

# 💡 CommonJS Example
```js
const { PieChart } = require("canvas-pie-chart"); // import chart generator
/* 
    Create a new PieChard instance
    options:
        - labels: { 
            text: label text
            size: label size
        }
        blackOrWhiteInvert: if true, labels are written on a black-and-white basis else written in contrasting colors
        size: chart image size
*/
const chart = new PieChart({
    labels: [
        {
            text: "Option one",
            size: 4
        },
        {
            text: "Option two",
            size: 7
        },
        {
            text: "Option three",
            size: 15
        }
    ],
    blackOrWhiteInvert: true,
    size: 1024
});

// draw chart output
const buffer = chart.draw();
```
# 💡 ES6 Example
```js
import { PieChart } from "canvas-pie-chart"; // import chart generator
/* 
    Create a new PieChard instance
    options:
        - labels: { 
            text: label text
            size: label size
        }
        blackOrWhiteInvert: if true, labels are written on a black-and-white basis else written in contrasting colors
        size: chart image size
*/
const chart = new PieChart({
    labels: [
        {
            text: "Option one",
            size: 4
        },
        {
            text: "Option two",
            size: 7
        },
        {
            text: "Option three",
            size: 15
        }
    ],
    blackOrWhiteInvert: true,
    size: 1024
});

// draw chart output
const buffer = chart.draw();
```