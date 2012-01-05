function Door(iX, iY, aDimensions, aKeyholes, sDoorColour, sKeyColour) {
  this.iPositionX    = iX;
  this.iPositionY    = iY;
  this.aDimensions   = aDimensions.slice();
  this.aKeyholes     = aKeyholes.slice();
  this.sDoorColour   = sDoorColour;
  this.sKeyColour    = sKeyColour;
  this.iKeyRadius    = 13;
  this.iState        = 0;
  this.iMovement     = 0; // 0 = dormant, 1 = opening, -1 = closing
  this.bInProgress   = false;
  this.iBeginClose   = -1;

  this.OpenDoor = function() {
    if (this.bInProgress != true) {
        this.bInProgress = true;
        this.iMovement = 1;
    }
  };

  this.UpdatePositionAndDraw = function(bInvisibleTerrain) {
    // start close door process if needed
    if (this.iBeginClose == oGame.iAge) {
      this.iMovement = -1;
      this.iBeginClose = -1;
    }

    // slide door if needed
    if (this.iMovement != 0) {
      this.iState += this.iMovement;
      if (this.iState == 0) {
        this.iMovement = 0;
        this.bInProgress = false;
      } else if (this.iState == (this.aDimensions.length - 1)) {
        this.iMovement = 0;
        this.iBeginClose = (oGame.iAge + 140);
      }
    }

    // draw door
    if (bInvisibleTerrain == true) {
        oCTX.fillStyle = "#000000";
    } else {
        oCTX.fillStyle = this.sDoorColour;
    }
    oCTX.beginPath();
    oCTX.moveTo((this.iPositionX - oGame.oArena.iViewportOffsetX),
                (this.iPositionY - oGame.oArena.iViewportOffsetY));
    for (var i = 1; i < this.aDimensions[this.iState].length; i++) {
      oCTX.lineTo(((this.iPositionX + this.aDimensions[this.iState][i][0]) - oGame.oArena.iViewportOffsetX),
                  ((this.iPositionY + this.aDimensions[this.iState][i][1]) - oGame.oArena.iViewportOffsetY));
    }
    oCTX.fill();

    // draw keyholes
    oCTX.strokeStyle = this.sKeyColour;
    for (var i = 0; i < this.aKeyholes.length; i++) {
      oCTX.beginPath();
      oCTX.arc(this.aKeyholes[i][0] - oGame.oArena.iViewportOffsetX,
               this.aKeyholes[i][1] - oGame.oArena.iViewportOffsetY,
               this.iKeyRadius, -1.5707963267948966,  0.5235987755982988, false);
      oCTX.arc(this.aKeyholes[i][0] - oGame.oArena.iViewportOffsetX,
               this.aKeyholes[i][1] - oGame.oArena.iViewportOffsetY,
               this.iKeyRadius, 0.5235987755982988,  2.6179938779914944, false);
      oCTX.arc(this.aKeyholes[i][0] - oGame.oArena.iViewportOffsetX,
               this.aKeyholes[i][1] - oGame.oArena.iViewportOffsetY,
               this.iKeyRadius, 2.6179938779914944, -1.5707963267948966, false);
      oCTX.stroke();
    }
  };
}
