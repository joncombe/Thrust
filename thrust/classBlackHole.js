function BlackHole(iX, iY, sColor, sCallback) {
  this.iPositionX = iX;
  this.iPositionY = iY;
  this.sColor     = sColor;
  this.sCallback  = sCallback;
  this.aBlocks    = [ 1, 1, 1, 1, 1 ];
  this.iAge       = 0;

  this.Draw = function() {
    oCTX.fillStyle = this.sColor;
    for (var iAngle = 0; iAngle < 360; iAngle += 90) {
      var iDistance = 16;

      oCTX.save();
      oCTX.translate((this.iPositionX - oGame.oArena.iViewportOffsetX), (this.iPositionY - oGame.oArena.iViewportOffsetY));
      oCTX.rotate(DegreesToRadians(iAngle));
      for (var i = 0; i < this.aBlocks.length; i++) {
        if (this.aBlocks[i] >= 1) {
          oCTX.beginPath();
          oCTX.moveTo(iDistance, -9);
          oCTX.lineTo(iDistance + this.aBlocks[i], -9);
          oCTX.lineTo(iDistance + this.aBlocks[i],  9);
          oCTX.lineTo(iDistance,  9);
          oCTX.fill();
        }
        iDistance += 21;
      }
      oCTX.restore();
    }

    // change sizes
    this.iAge++;
    if (this.iAge < 7) {
      this.aBlocks[0] += 4.5;
    } else {
      this.aBlocks[0] -= 2;
    }
    for (var i = 1; i < this.aBlocks.length; i++) {
      this.aBlocks[i] = (this.aBlocks[i - 1] / 1.6);
    }

    // do callback
    if (this.aBlocks[0] < 0) {
      return true;
    } else {
      return false;
    }
  }
}