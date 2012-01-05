function Arena() {
  // get viewport dimensions
  this.iViewportWidth    = $("#thrust_arena").width();
  this.iViewportHeight   = $("#thrust_arena").height();
  this.iUpperLimit       = this.iViewportHeight;

  // adopt level specific information
  this.iArenaWidth       = oGame.oLevel.iArenaWidth;
  this.iArenaHeight      = oGame.oLevel.iArenaHeight;
  this.iViewportOffsetX  = oGame.oLevel.iViewportOffsetX;
  this.iViewportOffsetY  = oGame.oLevel.iViewportOffsetY;
  this.aLandscape        = oGame.oLevel.aLandscape;

  // define other vars
  this.iSlideX           = 0;
  this.iSlideY           = 0;
  this.aStars            = [];

  this.DrawLandscape = function (bInvisibleTerrain) {
    // draw landscape
    if (bInvisibleTerrain == true) {
        oCTX.fillStyle = "#000000";
    } else {
        oCTX.fillStyle = oGame.oLevel.sLandscapeColor;
    }
    oCTX.beginPath();
    oCTX.moveTo((0 - this.iArenaWidth - this.iViewportOffsetX),
                (this.aLandscape[0][1] - this.iViewportOffsetY));

    // draw left-side terrain
    for (var i = 1; i < this.aLandscape.length; i++) {
      oCTX.lineTo((this.aLandscape[i][0] - this.iViewportOffsetX - this.iArenaWidth),
                  (this.aLandscape[i][1] - this.iViewportOffsetY));
    }

    // draw central terrain
    for (var i = 1; i < this.aLandscape.length; i++) {
      oCTX.lineTo((this.aLandscape[i][0] - this.iViewportOffsetX),
                  (this.aLandscape[i][1] - this.iViewportOffsetY));
    }

    // draw right-side terrain
    for (var i = 1; i < this.aLandscape.length; i++) {
      oCTX.lineTo((this.aLandscape[i][0] - this.iViewportOffsetX + this.iArenaWidth),
                  (this.aLandscape[i][1] - this.iViewportOffsetY));
    }

    // fill in landscape colour
    oCTX.lineTo(((this.iArenaWidth * 2) - this.iViewportOffsetX),
                (this.iArenaHeight - this.iViewportOffsetY));
    oCTX.lineTo((0 - this.iArenaWidth - this.iViewportOffsetX),
                (this.iArenaHeight - this.iViewportOffsetY));
    oCTX.fill();
  };

  this.DrawStar = function(i) {
    var iPositionX = (this.aStars[i].iPositionX - this.iViewportOffsetX);
    var iPositionY = (this.aStars[i].iPositionY - this.iViewportOffsetY);
    oCTX.fillStyle = this.aStars[i].sColour;
    oCTX.fillRect(iPositionX - this.iArenaWidth, iPositionY, 3, 3);
    oCTX.fillRect(iPositionX, iPositionY, 3, 3);
    oCTX.fillRect(iPositionX + this.iArenaWidth, iPositionY, 3, 3);
  };

  this.DrawStars = function() {
    // draw stars if within viewport
    if (this.iViewportOffsetY < oGame.oLevel.iStarLowerLimit) {
      this.aStars[Math.floor(Math.random() * this.aStars.length)] = this.GenerateStar();
      for (var i = 0; i < this.aStars.length; i++) {
        this.DrawStar(i);
      }
    }
  };

  // randomly generate star coordinates
  this.GenerateStar = function() {
    var sColour = oGame.oLevel.sStarColourA;
    if (Math.random() > 0.7) {
      sColour = oGame.oLevel.sStarColourB;
    }
    return { iPositionX: Math.floor(Math.random() * this.iArenaWidth) - 1.5,
             iPositionY: Math.floor(Math.random() * oGame.oLevel.iStarLowerLimit) - 1.5,
             sColour: sColour };
  };

  // generate stars
  for (var i = 0; i < oGame.oLevel.iStarCount; i++) {
    this.aStars.push( this.GenerateStar() );
  }
}
