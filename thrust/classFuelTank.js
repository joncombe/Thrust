function FuelTank(iX, iY) {
  this.iPositionX = iX;
  this.iPositionY = iY;
  this.iFuelLoad  = 300;

  // calculate vectors for fast collision detection
  this.aPosition = [ [this.iPositionX - 17, this.iPositionY + 16],
                     [this.iPositionX - 17, this.iPositionY - 14],
                     [this.iPositionX + 17, this.iPositionY - 14],
                     [this.iPositionX + 17, this.iPositionY + 16] ];

  // calculate refuelling zone
  this.oRefuelZone = {   iLeft: this.iPositionX - 21,
                        iRight: this.iPositionX + 21,
                          iTop: this.iPositionY - 82,
                       iBottom: this.iPositionY - 18 };

  this.CheckIntersect = function(iX1, iY1, iX2, iY2) {
    for (var i = 0; i < (this.aPosition.length - 1); i++) {
      var aCollision = CheckIntersect(iX1, iY1, iX2, iY2,
                                      this.aPosition[i][0], this.aPosition[i][1],
      this.aPosition[i + 1][0], this.aPosition[i + 1][1]);
      if (aCollision[0] == true) { return aCollision; }
    }

    // no collision
    return [ false ];
  };

  this.Draw = function() {
    oCTX.save();
    oCTX.translate((this.iPositionX - oGame.oArena.iViewportOffsetX - oGame.oArena.iSlideX),
                   (this.iPositionY - oGame.oArena.iViewportOffsetY - oGame.oArena.iSlideY));

    // tank
    oCTX.strokeStyle = oGame.oLevel.sFuelTankColor;
    oCTX.beginPath();
    oCTX.moveTo(16,  6);
    oCTX.arc(0, 25, 40, DegreesToRadians(24), DegreesToRadians(336), true);
    oCTX.arc(0, -30, 40, DegreesToRadians(204), DegreesToRadians(156), true);
    oCTX.stroke();

    // legs
    oCTX.strokeStyle = oCTX.strokeStyle = oGame.oLevel.sFuelTankLegs;
    oCTX.beginPath();
    oCTX.moveTo(-11, 20);
    oCTX.lineTo(-8, 9);
    oCTX.stroke();
    oCTX.beginPath();
    oCTX.moveTo(11, 20);
    oCTX.lineTo(8, 9);
    oCTX.stroke();

    // label
    oCTX.strokeStyle = oCTX.strokeStyle = oGame.oLevel.sFuelTankLabel;
    oCTX.lineCap = "square";
    oCTX.beginPath();

    // f
    oCTX.moveTo(-11.5, -7.5);
    oCTX.lineTo(-11.5,  2.5);
    oCTX.moveTo(-10.5, -7.5);
    oCTX.lineTo( -7.5, -7.5);
    oCTX.moveTo(-10.5, -2.5);
    oCTX.lineTo( -8.5, -2.5);

    // u
    oCTX.moveTo( -4.5, -7.5);
    oCTX.lineTo( -4.5,  2.5);
    oCTX.moveTo( -3.5,  2.5);
    oCTX.lineTo( -1.5,  2.5);
    oCTX.moveTo( -0.5, -7.5);
    oCTX.lineTo( -0.5,  2.5);

    // e
    oCTX.moveTo(  2.5, -7.5);
    oCTX.lineTo(  2.5,  2.5);
    oCTX.moveTo(  3.5, -7.5);
    oCTX.lineTo(  7.5, -7.5);
    oCTX.moveTo(  3.5, -2.5);
    oCTX.lineTo(  6.5, -2.5);
    oCTX.moveTo(  3.5,  2.5);
    oCTX.lineTo(  7.5,  2.5);

    // l
    oCTX.moveTo(  9.5, -7.5);
    oCTX.lineTo(  9.5,  2.5);
    oCTX.moveTo( 10.5,  2.5);
    oCTX.lineTo( 13.5,  2.5);

    oCTX.stroke();
    oCTX.restore();
  };

  this.WithinZone = function(iX, iY) {
    if ((iX >= this.oRefuelZone.iLeft) &&
        (iX <= this.oRefuelZone.iRight) &&
        (iY >= this.oRefuelZone.iTop) &&
        (iY <= this.oRefuelZone.iBottom)) {
      return true;
    }
    return false;
  };
}
