var TEXT_SPACING  = 2.3;
var TEXT_HEIGHT   = (TEXT_SPACING * 5);
var TEXT_WIDTH    = (TEXT_SPACING * 7);
var LINE_SPACING  = 2.4;
var oAlphabet = {
  a: [
     [ [0,5],[0,3],[1,3],[1,2],[2,2],[2,1],[3,1],[3,0],[7,0],[7,5],[5,5],[5,1],[4,1],[4,2],[3,2],[3,4],[2,4],[2,5] ],
     [ [1,3],[6,3],[6,4],[1,4] ]
     ],
  b: [
     [ [0,0],[2,0],[2,5],[0,5] ],
     [ [1,0],[6,0],[6,2],[7,2],[7,5],[1,5],[1,4],[5,4],[5,3],[1,3],[1,2],[4,2],[4,1],[1,1] ]
     ],
  c: [
     [ [0,0],[7,0],[7,2],[5,2],[5,1],[2,1],[2,4],[7,4],[7,5],[0,5] ]
     ],
  d: [
     [ [0,0],[7,0],[7,3],[6,3],[6,4],[5,4],[5,5],[1,5],[1,4],[4,4],[4,3],[5,3],[5,1],[2,1],[2,5],[0,5] ]
     ],
  e: [
     [ [0,0],[7,0],[7,1],[2,1],[2,2],[6,2],[6,3],[2,3],[2,4],[7,4],[7,5],[0,5] ]
     ],
  f: [
     [ [0,0],[7,0],[7,1],[2,1],[2,2],[6,2],[6,3],[2,3],[2,5],[0,5] ]
     ],
  g: [
     [ [0,0],[5,0],[5,1],[2,1],[2,4],[5,4],[5,3],[3,3],[3,2],[7,2],[7,5],[0,5] ]
     ],
  h: [
     [ [0,0],[2,0],[2,2],[5,2],[5,0],[7,0],[7,5],[5,5],[5,3],[2,3],[2,5],[0,5] ]
     ],
  i: [
     [ [0,0],[7,0],[7,1],[4,1],[4,4],[7,4],[7,4],[7,5],[0,5],[0,4],[2,4],[2,1],[0,1] ]
     ],
  j: [
     [ [1,0],[7,0],[7,1],[5,1],[5,5],[0,5],[0,3],[2,3],[2,4],[3,4],[3,1],[1,1] ]
     ],
  k: [
     [ [0,0],[2,0],[2,2],[3,2],[3,1],[4,1],[4,0],[6,0],[6,1],[5,1],[5,2],[7,2],[7,5],[5,5],[5,3],[2,3],[2,5],[0,5] ]
     ],
  l: [
     [ [0,0],[2,0],[2,4],[7,4],[7,5],[0,5] ]
     ],
  m: [
     [ [0,0],[7,0],[7,5],[5,5],[5,1],[4,1],[4,4],[3,4],[3,1],[2,1],[2,5],[0,5] ]
     ],
  n: [
     [ [0,0],[4,0],[4,4],[5,4],[5,0],[7,0],[7,5],[3,5],[3,1],[2,1],[2,5],[0,5] ]
     ],
  o: [
     [ [0,0],[7,0],[7,1],[2,1],[2,4],[7,4],[7,5],[0,5] ],
     [ [5,0],[7,0],[7,5],[5,5] ]
     ],
  p: [
     [ [0,0],[7,0],[7,4],[5,4],[5,1],[2,1],[2,5],[0,5] ],
     [ [1,3],[6,3],[6,4],[1,4] ]
     ],
  q: [
     [ [0,0],[7,0],[7,1],[2,1],[2,4],[7,4],[7,5],[0,5] ],
     [ [0,0],[7,0],[7,3],[6,3],[6,5],[4,5],[4,3],[5,3],[5,1],[0,1] ]
     ],
  r: [
     [ [0,0],[7,0],[7,3],[5,3],[5,1],[2,1],[2,5],[0,5] ],
     [ [0,2],[6,2],[6,4],[7,4],[7,5],[5,5],[5,4],[4,4],[4,3],[0,3] ]
     ],
  s: [
     [ [0,0],[6,0],[6,1],[2,1],[2,2],[7,2],[7,5],[0,5],[0,4],[5,4],[5,3],[0,3] ]
     ],
  t: [
     [ [0,0],[7,0],[7,1],[4,1],[4,5],[2,5],[2,1],[0,1] ]
     ],
  u: [
     [ [0,0],[2,0],[2,4],[5,4],[5,0],[7,0],[7,5],[0,5] ]
     ],
  v: [
     [ [0,0],[2,0],[2,4],[3,4],[3,3],[4,3],[4,2],[5,2],[5,0],[7,0],[7,2],[6,2],[6,3],[5,3],[5,4],[4,4],[4,5],[0,5] ]
     ],
  w: [
     [ [0,0],[2,0],[2,4],[3,4],[3,2],[4,2],[4,4],[5,4],[5,0],[7,0],[7,5],[0,5] ]
     ],
  x: [
     [ [0,0],[2,0],[2,1],[3,1],[3,2],[4,2],[4,1],[5,1],[5,0],[7,0],[7,1],[6,1],[6,2],[5,2],[5,3],[6,3],[6,4],[7,4],[7,5],[5,5],[5,4],[4,4],[4,3],[3,3],[3,4],[2,4],[2,5],[0,5],[0,4],[1,4],[1,3],[2,3],[2,2],[1,2],[1,1],[0,1] ]
     ],
  y: [
     [ [0,0],[2,0],[2,2],[5,2],[5,0],[7,0],[7,5],[1,5],[1,4],[5,4],[5,3],[0,3] ]
     ],
  z: [
     [ [0,0],[7,0],[7,3],[2,3],[2,4],[7,4],[7,5],[0,5],[0,2],[5,2],[5,1],[0,1] ]
     ],
  "0": [
       [ [0,0],[7,0],[7,5],[5,5],[5,1],[2,1],[2,5],[0,5] ],
       [ [0,5],[7,5],[7,3],[3,3],[3,4],[0,4] ]
       ],
  "1": [
       [ [0,0],[4,0],[4,3],[7,3],[7,5],[0,5],[0,3],[2,3],[2,1],[0,1] ]
       ],
  "2": [
       [ [1,0],[7,0],[7,3],[3,3],[3,4],[7,4],[7,5],[0,5],[0,2],[5,2],[5,1],[1,1] ]
       ],
  "3": [
       [ [1,0],[5,0],[5,2],[7,2],[7,5],[0,5],[0,4],[3,4],[3,3],[1,3],[1,2],[3,2],[3,1],[1,1] ]
       ],
  "4": [
       [ [0,0],[2,0],[2,2],[4,2],[4,1],[7,1],[7,5],[4,5],[4,3],[0,3] ]
       ],
  "5": [
       [ [0,0],[5,0],[5,1],[2,1],[2,2],[7,2],[7,5],[0,5],[0,4],[4,4],[4,3],[0,3] ]
       ],
  "6": [
       [ [0,0],[4,0],[4,1],[2,1],[2,2],[7,2],[7,2],[7,3],[2,3],[2,5],[0,5] ],
       [ [1,2],[7,2],[7,5],[1,5],[1,4],[4,4],[4,3],[1,3] ]
       ],
  "7": [
       [ [0,0],[7,0],[7,3],[4,3],[4,5],[1,5],[1,2],[5,2],[5,1],[1,1] ]
       ],
  "8": [
       [ [1,0],[6,0],[6,1],[3,1],[3,2],[5,2],[5,3],[3,3],[3,4],[7,4],[7,5],[0,5],[0,2],[1,2] ],
       [ [1,0],[6,0],[6,2],[7,2],[7,5],[4,5],[4,1],[1,1] ]
       ],
  "9": [
       [ [0,0],[7,0],[7,1],[2,1],[2,2],[4,2],[4,3],[0,3] ],
       [ [0,0],[7,0],[7,5],[3,5],[3,2],[5,2],[5,1],[0,1]  ]
       ],
  ".": [
       [ [2,5],[2,3],[4,3],[4,5] ]
       ],
  ",": [
       [ [2,5],[2,3],[4,3],[4,5],[3,6],[3,5] ]
       ],       
  ":": [
       [ [2,5],[2,3],[4,3],[4,5] ],
       [ [2,2],[2,0],[4,0],[4,2] ]
       ],
  "/": [
       [ [0,5],[0,4],[1,4],[1,3],[2,3],[2,2],[3,2],[3,1],[4,1],[4,0],[6,0],[6,1],[5,1],[5,2],[4,2],[4,3],[3,3],[3,4],[2,4],[2,5] ]
       ],
  "_": [
       [ [0,5],[7,5],[7,4],[0,4] ]
       ],
  "undefined": [
       [ [0,0],[7,0],[7,5],[0,5] ]
       ]
};

// increase letter size
for (sLetter in oAlphabet) {
  for (var iPattern = 0; iPattern < oAlphabet[sLetter].length; iPattern++) {
    for (var i = 0; i < oAlphabet[sLetter][iPattern].length; i++) {
      oAlphabet[sLetter][iPattern][i][0] = (oAlphabet[sLetter][iPattern][i][0] * TEXT_SPACING);
      oAlphabet[sLetter][iPattern][i][1] = (oAlphabet[sLetter][iPattern][i][1] * TEXT_SPACING);
    }
  }
}

function TextLetter(sLetter, iX, iY, oCanvas) {
  if (typeof oAlphabet[sLetter] == "object") {
      var aLetter = oAlphabet[sLetter].slice();
  } else {
      var aLetter = oAlphabet["undefined"].slice();
  }

  // draw pattern
  for (var iPattern = 0; iPattern < aLetter.length; iPattern++) {
    oCanvas.beginPath();
    oCanvas.moveTo( aLetter[iPattern][aLetter[iPattern].length - 1][0] + iX,
                    aLetter[iPattern][aLetter[iPattern].length - 1][1] + iY );
    for (var i = 0; i < aLetter[iPattern].length; i++) {
      oCanvas.lineTo( aLetter[iPattern][i][0] + iX,
                      aLetter[iPattern][i][1] + iY );
    }
    oCanvas.fill();
  }
}

function TextSentence(sString, iX, iY, sJustify, oCanvas) {
  // justification
  var sVisibleString = sString.replace(/\#[0-9a-fA-f]{6}/g, "");
  switch (sJustify) {
    case "center":
      iX -= (((sVisibleString.length * TEXT_WIDTH) + ((sVisibleString.length - 1) * TEXT_SPACING)) / 2);
      break;
    case "right":
      iX -= ((sVisibleString.length * TEXT_WIDTH) + ((sVisibleString.length - 1) * TEXT_SPACING));
      break;
  }

  // draw letters
  for (var i = 0; i < sString.length; i++) {
    if (sString.charAt(i) == "#") {
      oCanvas.fillStyle = sString.substr(i,7);
      i += 7;
    }
    if (sString.charAt(i) != " ") {
      TextLetter(sString.charAt(i), iX, iY, oCanvas);
    }
    iX += (TEXT_WIDTH + TEXT_SPACING);
  }
}
