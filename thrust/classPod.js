function Pod() {
  this.iPositionX   = oGame.oLevel.iPodPositionX;
  this.iPositionY   = oGame.oLevel.iPodPositionY;
  this.iPreviousX   = oGame.oLevel.iPodPositionX;
  this.iPreviousY   = oGame.oLevel.iPodPositionY;
  this.iVectorX     = 0;
  this.iVectorY     = 0;
  this.iRotation    = 180;
  this.iRadius      = 9;
  this.bActive      = true;

  this.Draw = function() {
    if (this.bActive == true) {
      oCTX.strokeStyle = oGame.oLevel.sPodColor;
      oCTX.beginPath();
      oCTX.arc(this.iPositionX - oGame.oArena.iViewportOffsetX, this.iPositionY - oGame.oArena.iViewportOffsetY,
               this.iRadius, -1.5707963267948966,  0.5235987755982988, false);
      oCTX.arc(this.iPositionX - oGame.oArena.iViewportOffsetX, this.iPositionY - oGame.oArena.iViewportOffsetY,
               this.iRadius,  0.5235987755982988,  2.6179938779914944, false);
      oCTX.arc(this.iPositionX - oGame.oArena.iViewportOffsetX, this.iPositionY - oGame.oArena.iViewportOffsetY,
               this.iRadius,  2.6179938779914944, -1.5707963267948966, false);
      oCTX.stroke();

      // draw pod base
      if (oGame.oShip.bPodConnected != true) {
        oCTX.strokeStyle = oGame.oLevel.sPodBaseColor;
        oCTX.save();
        oCTX.translate((this.iPositionX - oGame.oArena.iViewportOffsetX), (this.iPositionY - oGame.oArena.iViewportOffsetY));
        oCTX.beginPath();
        oCTX.arc(0, 0, (this.iRadius + 3), DegreesToRadians(130), DegreesToRadians(230), false);
        oCTX.arc(0, 0, (this.iRadius + 8), DegreesToRadians(230), DegreesToRadians(196), true);
        oCTX.lineTo(-5, 27);
        oCTX.lineTo(-8, 27);
        oCTX.lineTo(-8, 31);
        oCTX.lineTo( 8, 31);
        oCTX.lineTo( 8, 27);
        oCTX.lineTo( 5, 27);
        oCTX.arc(0, 0, (this.iRadius + 8), DegreesToRadians(164), DegreesToRadians(130), true);
        oCTX.lineTo( 9,  9);
        oCTX.stroke();
        oCTX.restore();
      }
    }
  }
}
