function Explosion(iPositionX, iPositionY, sSize, sColor, bAudible) {
  this.iPositionX     = iPositionX;
  this.iPositionY     = iPositionY;
  this.aParticles     = [];
  this.iParticleCount = 50;

  // generate explosion debris
  if (bAudible == true) {
      oSound.Play("Explosion");
  }
  if (sSize == "small") { this.iParticleCount = 7; }
  for (var i = 0; i < this.iParticleCount; i++) {
    this.aParticles.push(new ExplosionParticle(this.iPositionX, this.iPositionY, sColor));
  }

  // draw particles
  this.Draw = function() {
    for (var i = (this.aParticles.length - 1); i > -1; i--) {
      if (this.aParticles[i].iAge > this.aParticles[i].iMaxAge) {
        this.aParticles.splice(i, 1);
      } else {
        this.aParticles[i].Draw();
      }
    }
  }
}

function ExplosionParticle(iPositionX, iPositionY, sColor) {
  this.iPositionX  = (iPositionX - 1.5);
  this.iPositionY  = (iPositionY - 1.5);
  this.sColor      = sColor;
  this.iVectorX    = 0;
  this.iVectorY    = 0;
  this.iGravity    = (oGame.oLevel.iGravity * 2);
  this.iAge        = 0;
  this.iMaxAge     = 0;

  // create random vector
  this.iVectorX = ((Math.random() * 8) - 4);
  this.iVectorY = ((Math.random() * 8) - 4);
  this.iMaxAge = ((Math.random() * 20) + 5);

  this.Draw = function() {
    // calculate new position
    this.iVectorY += this.iGravity;
    this.iPositionX += (this.iVectorX - oGame.oArena.iSlideX);
    this.iPositionY += (this.iVectorY - oGame.oArena.iSlideY);

    // draw particle
    oCTX.fillStyle = this.sColor;
    oCTX.fillRect(this.iPositionX, this.iPositionY, 3, 3);

    // increment age
    this.iAge++;
  }
}
