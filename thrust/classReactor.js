function Reactor() {
  this.iPositionX  = oGame.oLevel.iReactorX;
  this.iPositionY  = oGame.oLevel.iReactorY;
  this.iRadius     = 20;
  this.iDamage     = 0;
  this.iMaxDamage  = 1400;
  this.iCountdown  = 10;
  this.iTimer      = 0;
  this.bActive     = true;
  this.aSmoke      = [ new ReactorSmoke(-25), new ReactorSmoke(-16) ];
  this.iDrawSmoke  = -1;
  this.bCountdown  = false;

  this.Damage = function() {
    this.iDamage += 100;
    if (this.iDrawSmoke < (oGame.iAge + 50)) {
        this.iDrawSmoke = (oGame.iAge + 50);
    }
    this.iDrawSmoke += 20;
    this.aSmoke[0].iPositionY = 0;
    this.aSmoke[1].iPositionY = 9;
    if ((this.bCountdown == false) && (this.iDamage >= this.iMaxDamage)) {
      this.bCountdown = true;
      ReactorCountdown();
    }
  };

  this.Draw = function() {
    if ((this.bActive != true) || ((this.iDamage >= this.iMaxDamage) && (oGame.iAge % 6 < 3))) {
      return;
    }

    // self repair
    if (this.iDamage > 0) {
        this.iDamage -= 0.02;
    }

    // save canvas
    oCTX.save();
    oCTX.translate((this.iPositionX - oGame.oArena.iViewportOffsetX - oGame.oArena.iSlideX),
                   (this.iPositionY - oGame.oArena.iViewportOffsetY - oGame.oArena.iSlideY));

    // circle
    oCTX.strokeStyle = oGame.oLevel.sReactorColor;
    oCTX.beginPath();
    oCTX.arc(0, 0, this.iRadius, DegreesToRadians(0), DegreesToRadians(360), false);
    oCTX.stroke();

    // draw smoke
    oCTX.fillStyle = oGame.oLevel.sReactorChimney;
    if (oGame.iAge > this.iDrawSmoke) {
      for (var i = 0; i < 2; i++) {
        this.aSmoke[i].Draw(this.iDamage / 100);
      }
    }

    // building / chimney
    oCTX.strokeStyle = oGame.oLevel.sReactorChimney;
    oCTX.fillStyle = "#000000";
    oCTX.beginPath();
    oCTX.moveTo( -20,  22);
    oCTX.lineTo( -20,  12);
    oCTX.lineTo(  12,  12);
    oCTX.lineTo(  12, -20);
    oCTX.lineTo(  17, -20);
    oCTX.lineTo(  17,  12);
    oCTX.lineTo(  20,  12);
    oCTX.lineTo(  20,  22);
    oCTX.fill();
    oCTX.stroke();

    // door
    oCTX.fillStyle = oGame.oLevel.sReactorDoor;
    oCTX.beginPath();
    oCTX.moveTo(-17, 20);
    oCTX.lineTo(-17, 14);
    oCTX.lineTo(-13, 14);
    oCTX.lineTo(-13, 20);
    oCTX.fill();

    // finish up
    oCTX.restore();
  };
}

function ReactorSmoke(iY, iDamage) {
  this.iPositionY = iY;

  this.Draw = function(iDamage) {
    oCTX.fillRect(13, this.iPositionY, 3, 3);
    this.iPositionY -= (1 + (iDamage / 6));
    if (this.iPositionY < -36) {
      this.iPositionY += 20;
    }
  }
}
