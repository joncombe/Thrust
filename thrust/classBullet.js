function Bullet(iX, iY, iMomentumX, iMomentumY, iAngle, bEnemyFire) {
  this.iOriginX    = iX;
  this.iOriginY    = iY;
  this.iPositionX  = iX;
  this.iPositionY  = iY;
  this.iPreviousX  = iX;
  this.iPreviousY  = iY;
  this.bEnemyFire  = bEnemyFire;
  this.iAge        = 0;
  this.iSpeed      = 17;

  // calculate vector
  var oXY = CalculatePoint(iAngle, this.iSpeed);
  this.iVectorX = (oXY.iX + iMomentumX);
  this.iVectorY = (oXY.iY + iMomentumY);

  // calculate max age
  this.iMaxAge = (Math.sqrt(Math.pow(oGame.oArena.iViewportWidth, 2) + Math.pow(oGame.oArena.iViewportHeight, 2)) / 15);

  // update bullet position
  this.CalculatePosition = function() {
    this.iPreviousX = this.iPositionX;
    this.iPreviousY = this.iPositionY;
    this.iPositionX += this.iVectorX;
    this.iPositionY += this.iVectorY;
    /*
    if (this.iPositionX < 0) {
      this.iPositionX += oGame.oArena.iArenaWidth;
    } else if (this.iPositionX > oGame.oArena.iArenaWidth) {
      this.iPositionX -= oGame.oArena.iArenaWidth;
    }
    */
  };

  // draw bullet
  this.Draw = function () {
    if (this.bEnemyFire == true) {
      oCTX.fillStyle = oGame.oLevel.sEnemyBulletColor;
    } else {
      oCTX.fillStyle = oGame.oLevel.sShipBulletColor;
    }
    oCTX.fillRect((this.iPositionX - 1.5 - oGame.oArena.iViewportOffsetX),
                  (this.iPositionY - 1.5 - oGame.oArena.iViewportOffsetY),
                  3, 3);

    // show tracers
    if (bTracers == true) {
      oCTX.strokeStyle = "#444400";
      oCTX.beginPath();
      oCTX.moveTo(this.iOriginX - oGame.oArena.iViewportOffsetX, this.iOriginY - oGame.oArena.iViewportOffsetY);
      oCTX.lineTo(this.iPositionX - oGame.oArena.iViewportOffsetX, this.iPositionY - oGame.oArena.iViewportOffsetY);
      oCTX.stroke();
    }

  };

  // check for expiry
  this.Expired = function() {
    this.iAge++;
    if (this.iAge > this.iMaxAge) return true;
    return false;
  }
}