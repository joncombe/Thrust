function Enemy(iX, iY, iOrientation, iGunAngleRange, iGunAngleOffset, iAggression) {
  this.iPositionX      = iX;
  this.iPositionY      = iY;
  this.iOrientation    = DegreesToRadians(iOrientation);
  this.iGunAngleRange  = iGunAngleRange;
  this.iGunAngleOffset = iGunAngleOffset;
  this.iAggression     = iAggression;
  this.oBlueprint      = { aBody:[ [18,-3],[28,11],[12,4],[-12,4],[-28,11],[-18,-3] ],
                           aGun:[0,-10],
                           aDome:[0,19],
                           iDomeRadius:26, fDomeCurveStart:3.7, fDomeCurveEnd:2.58 };
  this.oCoordinates    = { aBody:[], aDome:[] };

  // calculate coordinates of rotated object
  for (var i = 0; i < this.oBlueprint.aBody.length; i++) {
    this.oCoordinates.aBody.push( RotateObject(this.oBlueprint.aBody[i][0],
                                              this.oBlueprint.aBody[i][1],
                                              this.iOrientation,
                                              this.iPositionX,
                                              this.iPositionY) );
  }
  this.oCoordinates.aDome = RotateObject(this.oBlueprint.aDome[0],
                                         this.oBlueprint.aDome[1],
                                         this.iOrientation,
                                         this.iPositionX,
                                         this.iPositionY);
  this.oCoordinates.aGun = RotateObject(this.oBlueprint.aGun[0],
                                        this.oBlueprint.aGun[1],
                                        this.iOrientation,
                                        this.iPositionX,
                                        this.iPositionY);

  this.CheckIntersect = function(iX1, iY1, iX2, iY2) {
    // top plane
    var aCollision = CheckIntersect(iX1, iY1, iX2, iY2,
                                    this.oCoordinates.aBody[5][0], this.oCoordinates.aBody[5][1],
                                    this.oCoordinates.aBody[0][0],this.oCoordinates.aBody[0][1]);
    if (aCollision[0] == true) { return aCollision; }

    // right side
    aCollision = CheckIntersect(iX1, iY1, iX2, iY2,
                                this.oCoordinates.aBody[0][0], this.oCoordinates.aBody[0][1],
                                this.oCoordinates.aBody[1][0],this.oCoordinates.aBody[1][1]);
    if (aCollision[0] == true) { return aCollision; }

    // left side
    aCollision = CheckIntersect(iX1, iY1, iX2, iY2,
                                this.oCoordinates.aBody[4][0], this.oCoordinates.aBody[4][1],
                                this.oCoordinates.aBody[5][0],this.oCoordinates.aBody[5][1]);
    if (aCollision[0] == true) { return aCollision; }

    // no collision
    return [ false ];
  };

  this.Draw = function() {
    oCTX.strokeStyle = oGame.oLevel.sEnemyColor;

    // draw body
    oCTX.beginPath();
    oCTX.moveTo((this.oCoordinates.aBody[this.oCoordinates.aBody.length - 1][0] - oGame.oArena.iViewportOffsetX - oGame.oArena.iSlideX),
                (this.oCoordinates.aBody[this.oCoordinates.aBody.length - 1][1] - oGame.oArena.iViewportOffsetY - oGame.oArena.iSlideY));
    for (var i = 0; i < this.oCoordinates.aBody.length; i++) {
      oCTX.lineTo((this.oCoordinates.aBody[i][0] - oGame.oArena.iViewportOffsetX - oGame.oArena.iSlideX),
                  (this.oCoordinates.aBody[i][1] - oGame.oArena.iViewportOffsetY - oGame.oArena.iSlideY));
    }
    oCTX.stroke();

    // draw dome
    oCTX.beginPath();
    oCTX.arc((this.oCoordinates.aDome[0] - oGame.oArena.iViewportOffsetX - oGame.oArena.iSlideX),
             (this.oCoordinates.aDome[1] - oGame.oArena.iViewportOffsetY - oGame.oArena.iSlideY),
             this.oBlueprint.iDomeRadius,
             (this.oBlueprint.fDomeCurveStart + this.iOrientation),
             (this.oBlueprint.fDomeCurveEnd + this.iOrientation),
             true);
    oCTX.stroke();
  };

  this.Fire = function() {
    if ((oGame.iAge > oGame.oReactor.iDrawSmoke) &&
        (Math.random() < this.iAggression) &&
        (this.oCoordinates.aGun[1] > (oGame.oArena.iViewportOffsetY - 100)) &&
        (this.oCoordinates.aGun[1] < (oGame.oArena.iViewportHeight + oGame.oArena.iViewportOffsetY + 100))) {
      var iBulletAngle = (RadiansToDegrees(this.iOrientation) -
                          (Math.random() * this.iGunAngleRange) -
                          this.iGunAngleOffset);
      oSound.Play("EnemyBullet");
      oGame.aBullet.push(new Bullet(this.oCoordinates.aGun[0], this.oCoordinates.aGun[1], 0, 0, iBulletAngle, true));
      oGame.aBullet[oGame.aBullet.length -1].Draw();
    }
  };
}
