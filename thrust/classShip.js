function Ship() {
  this.iPositionX           = oGame.oLevel.iShipPositionX;
  this.iPositionY           = oGame.oLevel.iShipPositionY;
  this.iPreviousX           = this.iPositionX;
  this.iPreviousY           = this.iPositionY;
  this.iVectorX             = 0;
  this.iVectorY             = 0;
  this.iActualVectorX       = 0;
  this.iActualVectorY       = 0;
  this.iOrientation         = 0;
  this.iApplyRotation       = 0;
  this.iThrustPower         = 0.9;
  this.iRotateSpeed         = 14;
  this.bActive              = true;
  this.bApplyThrust         = false;
  this.bApplyShield         = false;
  this.bApplyPause          = false;
  this.iRodLength           = 73;
  this.bPodInitiate         = false;
  this.bPodConnected        = false;
  this.bGunLoaded           = true;
  this.bRefuelling          = false;

  // collision points
  this.aCurrNosePos         = [0,0];
  this.aCurrTailPos         = [0,0];
  this.aCurrWingSPos        = [0,0];
  this.aCurrWingPPos        = [0,0];
  this.aPrevNosePos         = [0,0];
  this.aPrevTailPos         = [0,0];
  this.aPrevWingSPos        = [0,0];
  this.aPrevWingPPos        = [0,0];

  // bind keys
  $(document)
    .unbind()
    .bind("keydown", function(e) { oGame.oShip.KeyHandler(e, true);  })
    .bind("keyup", function(e) { oGame.oShip.KeyHandler(e, false);  });

  this.iCalculateCollisionPoints = function() {
    var iAngle = DegreesToRadians(this.iOrientation);
    this.aCurrNosePos  = RotateObject(    0,  18, iAngle, this.iPositionX, this.iPositionY);
    this.aCurrTailPos  = RotateObject(    0, -11, iAngle, this.iPositionX, this.iPositionY);
    this.aCurrWingSPos = RotateObject( 14.5,  -1, iAngle, this.iPositionX, this.iPositionY);
    this.aCurrWingPPos = RotateObject(-14.5,  -1, iAngle, this.iPositionX, this.iPositionY);
  };

  this.CalculatePosition = function() {
    this.iPreviousX = this.iPositionX;
    this.iPreviousY = this.iPositionY;

    // store previous collision points
    this.aPrevNosePos  = this.aCurrNosePos.slice();
    this.aPrevTailPos  = this.aCurrTailPos.slice();
    this.aPrevWingSPos = this.aCurrWingSPos.slice();
    this.aPrevWingPPos = this.aCurrWingPPos.slice();

    // dampen vector
    this.iVectorX *= 0.996;
    
    // apply vectors to ship
    this.iVectorY += oGame.oLevel.iGravity; // apply gravity to ship
    this.iOrientation += this.iApplyRotation; // apply rotation to ship
    if (this.iOrientation < 0) { this.iOrientation += 360; }
    if (this.iOrientation >= 360) { this.iOrientation -= 360; }

    // reduce fuel
    if ((oGame.iFuel > 0) && (this.bApplyShield == true)) {
      this.UpdateFuel(-1);
    } else {
      this.bApplyShield = false;
      if (oGame.iFuel == 0) {
        oSound.Stop("Shield");
        oSound.Stop("Thrust");
      }
    }

    // apply thrust
    if (oGame.iFuel > 0) {
        if (this.bApplyThrust == true) {
            var oXY = CalculatePoint(this.iOrientation, this.iThrustPower);
            this.iVectorX += oXY.iX;
            this.iVectorY += oXY.iY;
            this.UpdateFuel(-1);
        }
    } else {
          this.bApplyShield = false;
    }

    // recalculate position
    this.iPositionX += this.iVectorX;
    this.iPositionY += this.iVectorY;

    // calculate actual vector
    this.iActualVectorX = this.iVectorX;
    this.iActualVectorY = this.iVectorY;

    // pod
    if (this.bPodConnected == true) {
        // get last pod position
        oGame.oPod.iPreviousX = oGame.oPod.iPositionX;
        oGame.oPod.iPreviousY = oGame.oPod.iPositionY;

        // calculate new pod position 
        oGame.oPod.iPositionX += oGame.oPod.iVectorX;
        oGame.oPod.iPositionY += oGame.oPod.iVectorY + 0.1;

        // calculate push/pull of the rod
        var iDeltaX = (oGame.oPod.iPositionX - this.iPositionX);
        var iDeltaY = (oGame.oPod.iPositionY - this.iPositionY);
        var iDeltaLength = Math.sqrt((iDeltaX * iDeltaX) + (iDeltaY * iDeltaY));
        var iDiff = (iDeltaLength - this.iRodLength) / iDeltaLength;
        var iMovementX = (iDeltaX * 0.5 * iDiff);
        var iMovementY = (iDeltaY * 0.5 * iDiff);

        // move ship
        this.iPositionX += iMovementX;
        this.iPositionY += iMovementY;
        this.iVectorX += iMovementX; // weight of the pod's momentum
        this.iVectorY += iMovementY;        
        this.iActualVectorX += iMovementX; // don't slide off the viewport
        this.iActualVectorY += iMovementY;
 
        // move pod
        oGame.oPod.iPositionX -= iMovementX;
        oGame.oPod.iPositionY -= iMovementY;

        // calculate pod's vector for next time round
        oGame.oPod.iVectorX = (oGame.oPod.iPositionX - oGame.oPod.iPreviousX);
        oGame.oPod.iVectorY = (oGame.oPod.iPositionY - oGame.oPod.iPreviousY);
        //oGame.oPod.iVectorY += 0.01;
    }

    // collision points
    this.iCalculateCollisionPoints();

    // check if upper limit reached
    if ((this.iPositionY <= oGame.oArena.iUpperLimit) && (this.bActive == true)) {
      oSound.Play("Ping");
      oGame.oPod.bActive = false;
      if (this.bPodConnected == true) {
        oGame.aBlackHole.push(new BlackHole(this.iPositionX, this.iPositionY, "#ffff00", "MissionComplete"));
        oGame.aBlackHole.push(new BlackHole(oGame.oPod.iPositionX, oGame.oPod.iPositionY, oGame.oLevel.sPodColor, "MissionComplete"));
        if (oGame.oReactor.iCountdown < 10) {
          iBonusScore = (3600 + (oGame.iCurrentLevel * 400));
        } else {
          iBonusScore = (1600 + (oGame.iCurrentLevel * 400));
        }
      } else {
        if (oGame.oReactor.iCountdown < 10) {
          oGame.aBlackHole.push(new BlackHole(this.iPositionX, this.iPositionY, "#ffff00", "MissionFailed"));
        } else {
          oGame.aBlackHole.push(new BlackHole(this.iPositionX, this.iPositionY, "#ffff00", "MissionIncomplete"));
        }
      }
      sState = "BlackHole";
    }
  };

  this.CollisionDetectBullet = function(iFromX, iFromY, iToX, iToY) {
    // nose to tail
    var aCollision = CheckIntersect(iFromX, iFromY, iToX, iToY,
                                    this.aCurrNosePos[0], this.aCurrNosePos[1],
                                    this.aCurrTailPos[0], this.aCurrTailPos[1]);
    if (aCollision[0] == true) { return aCollision; }

    // wing to wing
    var aCollision = CheckIntersect(iFromX, iFromY, iToX, iToY,
                                    this.aCurrWingPPos[0], this.aCurrWingPPos[1],
                                    this.aCurrWingSPos[0], this.aCurrWingSPos[1]);
    if (aCollision[0] == true) { return aCollision; }

    // do we need to duplicate the above for the previous ship position also?

    // no collision
    return [ false ];
  };

  this.CollisionDetectLandscape = function(iFromX, iFromY, iToX, iToY) {
    var aCollision;

    // The if statements here measuring distance between Curr & Prev points are a bit of a hack.
    // There to protect the condition when a slow flying ship circles the planet, and the intersection
    // between Curr & Prev spans the planet causing a collision.
    // This should be fixed properly, but as it only occurs when the player is fooling around as opposed
    // to trying to complete the mission, it's not high on the priority list...

/*
    // ship's nose
    if (Math.abs(this.aCurrNosePos[0] - this.aPrevNosePos[0]) < 600) {
      aCollision = CheckIntersect(iFromX, iFromY, iToX, iToY,
                                  this.aPrevNosePos[0], this.aPrevNosePos[1],
                                  this.aCurrNosePos[0], this.aCurrNosePos[1]);
      if (aCollision[0] == true) { return aCollision; }
    }

    // ship's tail
    if (Math.abs(this.aCurrTailPos[0] - this.aPrevTailPos[0]) < 600) {
      aCollision = CheckIntersect(iFromX, iFromY, iToX, iToY,
                                  this.aPrevTailPos[0], this.aPrevTailPos[1],
                                  this.aCurrTailPos[0], this.aCurrTailPos[1]);
      if (aCollision[0] == true) { return aCollision; }
    }

    // ship's starboard wing
    if (Math.abs(this.aCurrWingSPos[0] - this.aPrevWingSPos[0]) < 600) {
      aCollision = CheckIntersect(iFromX, iFromY, iToX, iToY,
                                  this.aPrevWingSPos[0], this.aPrevWingSPos[1],
                                  this.aCurrWingSPos[0], tphis.aCurrWingSPos[1]);
      if (aCollision[0] == true) { return aCollision; }
    }

    // ship's port wing
    if (Math.abs(this.aCurrWingPPos[0] - this.aPrevWingPPos[0]) < 600) {
      aCollision = CheckIntersect(iFromX, iFromY, iToX, iToY,
                                  this.aPrevWingPPos[0], this.aPrevWingPPos[1],
                                  this.aCurrWingPPos[0], this.aCurrWingPPos[1]);
      if (aCollision[0] == true) { return aCollision; }
    }
*/

    // ship's nose to tail
    if (Math.abs(this.aCurrNosePos[0] - this.aCurrTailPos[0]) < 600) {
      aCollision = CheckIntersect(iFromX, iFromY, iToX, iToY,
                                  this.aCurrTailPos[0], this.aCurrTailPos[1],
                                  this.aCurrNosePos[0], this.aCurrNosePos[1]);
      if (aCollision[0] == true) { return aCollision; }
    }
    if (Math.abs(this.aPrevNosePos[0] - this.aPrevTailPos[0]) < 600) {
      aCollision = CheckIntersect(iFromX, iFromY, iToX, iToY,
                                  this.aPrevTailPos[0], this.aPrevTailPos[1],
                                  this.aPrevNosePos[0], this.aPrevNosePos[1]);
      if (aCollision[0] == true) { return aCollision; }
    }

    if (Math.abs(this.aCurrWingPPos[0] - this.aCurrWingSPos[0]) < 600) {
      // ship's wing to wing
      aCollision = CheckIntersect(iFromX, iFromY, iToX, iToY,
                                  this.aCurrWingPPos[0], this.aCurrWingPPos[1],
                                  this.aCurrWingSPos[0], this.aCurrWingSPos[1]);
      if (aCollision[0] == true) { return aCollision; }
    }
    if (Math.abs(this.aPrevWingPPos[0] - this.aPrevWingPPos[0]) < 600) {
      aCollision = CheckIntersect(iFromX, iFromY, iToX, iToY,
                                  this.aPrevWingPPos[0], this.aPrevWingPPos[1],
                                  this.aPrevWingSPos[0], this.aPrevWingSPos[1]);
      if (aCollision[0] == true) { return aCollision; }
    }


    // no collision
    return [ false ];
  };

  this.CollisionDetectCircle = function(iPositionX, iPositionY, iRadius) {
    // ship's nose
    var aCollision = CheckIntersectCircle(iPositionX, iPositionY, iRadius,
                                          this.aPrevNosePos[0], this.aPrevNosePos[1],
                                          this.aCurrNosePos[0], this.aCurrNosePos[1]);
    if (aCollision[0] == true) { return aCollision; }

    // ship's tail
    aCollision = CheckIntersectCircle(iPositionX, iPositionY, iRadius,
                                      this.aPrevTailPos[0], this.aPrevTailPos[1],
                                      this.aCurrTailPos[0], this.aCurrTailPos[1]);
    if (aCollision[0] == true) { return aCollision; }

    // starboard wing
    aCollision = CheckIntersectCircle(iPositionX, iPositionY, iRadius,
                                      this.aPrevWingSPos[0], this.aPrevWingSPos[1],
                                      this.aCurrWingSPos[0], this.aCurrWingSPos[1]);
    if (aCollision[0] == true) { return aCollision; }

    // port wing
    aCollision = CheckIntersectCircle(iPositionX, iPositionY, iRadius,
                                      this.aPrevWingPPos[0], this.aPrevWingPPos[1],
                                      this.aCurrWingPPos[0], this.aCurrWingPPos[1]);
    if (aCollision[0] == true) { return aCollision; }

    // no collision
    return [ false ];
  };

  this.Die =  function(iX, iY, bJumpLevel) {
    // set values
    this.bActive = false;
    this.iVectorX = 0;
    this.iVectorY = 0;

    // unbind key controls
    $(document).unbind();
    this.bApplyThrust = false;
    this.bApplyShield = false;

    // 'last die' values
    oGame.iLastDieYPos = this.iPositionY;
    oGame.bLastDieHasPod = this.bPodConnected;
    if ((oGame.oReactor.iCountdown < 10) && (oGame.bLastDieHasPod == true)) {
        oGame.bLastDieHasPod = false;
        //oGame.iLastDieYPos = 0;
        if (oGame.oReactor.iCountdown <= 0) {
            //oGame.bLastDieHasPod = false;
            oGame.iLastDieYPos = 0;
        }
    }

    // create explosion(s)
    oGame.aExplosion.push(new Explosion(iX, iY, "big", oGame.oLevel.sShipExplosion, true));
    if (this.bPodConnected == true) {
      oGame.oPod.bActive = false;
      oGame.aExplosion.push(new Explosion((oGame.oPod.iPositionX - oGame.oArena.iViewportOffsetX),
                                          (oGame.oPod.iPositionY - oGame.oArena.iViewportOffsetY),
                                          "big",
                                          oGame.oLevel.sShipExplosion, false));
    }

    // stop sounds
    oSound.Stop("Shield");
    oSound.Stop("Thrust");

    // next action
    if (bUnlimitedLives != true) {
        oGame.iLives--;
    }
    if (oGame.iFuel < 1) {
      oGame.iLives = -1;
    }
    if (oGame.iLives > -1) {
      if (bJumpLevel == true) {
        SetPause("MissionFailed", 3000);
      } else {
        SetPause("StartNewLife", 3000);
      }
    } else {
      SetPause("GameOver", 2800);
    }  
  };

  this.Draw = function() {
    // draw pod
    oGame.oPod.Draw();

    // bail out if game over
    if (this.bActive != true) {
      return;
    }

    // draw ship
    oCTX.strokeStyle = "#ffff00";
    oCTX.save();
    oCTX.translate((this.iPositionX - oGame.oArena.iViewportOffsetX), (this.iPositionY - oGame.oArena.iViewportOffsetY));
    oCTX.rotate(DegreesToRadians(this.iOrientation));
    oCTX.beginPath();
    oCTX.moveTo(18, 0);
    oCTX.lineTo(0, 10);
    oCTX.lineTo(-1, 14.5);
    oCTX.lineTo(-11, 5.5);
    oCTX.lineTo(-8, 2);
    oCTX.lineTo(-8, -2);
    oCTX.lineTo(-11, -5.5);
    oCTX.lineTo(-1, -14.5);
    oCTX.lineTo(0, -10);
    oCTX.lineTo(18, 0);
    oCTX.stroke();
    oCTX.restore();

    // draw shield
    if ((this.bApplyShield == true) && ((oGame.iAge % 2) == 0)) {
      oCTX.save();
      oCTX.translate((this.iPositionX - oGame.oArena.iViewportOffsetX), (this.iPositionY - oGame.oArena.iViewportOffsetY));
      oCTX.rotate(DegreesToRadians(this.iOrientation));
      oCTX.strokeStyle = oGame.oLevel.sShieldColor;
      oCTX.beginPath();
      oCTX.arc(3, 0, 17, DegreesToRadians(0), DegreesToRadians(120), false);
      oCTX.arc(3, 0, 17, DegreesToRadians(120), DegreesToRadians(240), false);
      oCTX.arc(3, 0, 17, DegreesToRadians(240), DegreesToRadians(360), false);
      oCTX.stroke();
      oCTX.restore();

      // draw refuelling lines
      if (this.bRefuelling == true) {
        oCTX.save();
        oCTX.translate((this.iPositionX - oGame.oArena.iViewportOffsetX), (this.iPositionY - oGame.oArena.iViewportOffsetY));
        oCTX.strokeStyle = oGame.oLevel.sRefuelColor;
        oCTX.beginPath();
        oCTX.moveTo( 11, 16);
        oCTX.lineTo( 34, 80);
        oCTX.moveTo(-11, 16);
        oCTX.lineTo(-34, 80);
        oCTX.stroke();
        oCTX.restore();
      }
    }

    // testing: draw collision points
/*
    if (typeof this.aPrevNosePos[0] != "undefined") {
      oCTX.fillStyle = "#aaaaaa";
      oCTX.fillRect((this.aPrevNosePos[0] - 2.5 - oGame.oArena.iViewportOffsetX), (this.aPrevNosePos[1] - 2.5 - oGame.oArena.iViewportOffsetY), 5, 5);
      oCTX.fillRect((this.aPrevTailPos[0] - 2.5 - oGame.oArena.iViewportOffsetX), (this.aPrevTailPos[1] - 2.5 - oGame.oArena.iViewportOffsetY), 5, 5);
      oCTX.fillRect((this.aPrevWingSPos[0] - 2.5 - oGame.oArena.iViewportOffsetX), (this.aPrevWingSPos[1] - 2.5 - oGame.oArena.iViewportOffsetY), 5, 5);
      oCTX.fillRect((this.aPrevWingPPos[0] - 2.5 - oGame.oArena.iViewportOffsetX), (this.aPrevWingPPos[1] - 2.5 - oGame.oArena.iViewportOffsetY), 5, 5);
      oCTX.fillStyle = "#ffffff";
      oCTX.fillRect((this.aCurrNosePos[0] - 2.5 - oGame.oArena.iViewportOffsetX), (this.aCurrNosePos[1] - 2.5 - oGame.oArena.iViewportOffsetY), 5, 5);
      oCTX.fillRect((this.aCurrTailPos[0] - 2.5 - oGame.oArena.iViewportOffsetX), (this.aCurrTailPos[1] - 2.5 - oGame.oArena.iViewportOffsetY), 5, 5);
      oCTX.fillRect((this.aCurrWingSPos[0] - 2.5 - oGame.oArena.iViewportOffsetX), (this.aCurrWingSPos[1] - 2.5 - oGame.oArena.iViewportOffsetY), 5, 5);
      oCTX.fillRect((this.aCurrWingPPos[0] - 2.5 - oGame.oArena.iViewportOffsetX), (this.aCurrWingPPos[1] - 2.5 - oGame.oArena.iViewportOffsetY), 5, 5);
    }
*/

    // draw pod
    if (this.bPodConnected == true) {
      this.DrawPodRod();
    }
  };

  this.DrawPodRod = function() {
    oCTX.strokeStyle = oGame.oLevel.sRodColor;
    oCTX.beginPath();
    oCTX.moveTo(oGame.oShip.iPositionX + 0.5 - oGame.oArena.iViewportOffsetX, oGame.oShip.iPositionY - oGame.oArena.iViewportOffsetY);
    oCTX.lineTo(oGame.oPod.iPositionX + 0.5 - oGame.oArena.iViewportOffsetX, oGame.oPod.iPositionY - oGame.oArena.iViewportOffsetY);
    oCTX.stroke();
  };

  this.Fire = function() {
    var oXY = CalculatePoint(this.iOrientation, 16);
    oSound.Play("ShipBullet");
    oGame.aBullet.push(new Bullet(this.iPositionX + oXY.iX,
                                  this.iPositionY + oXY.iY,
                                  this.iActualVectorX,
                                  this.iActualVectorY,
                                  this.iOrientation,
                                  false));
    oGame.aBullet[oGame.aBullet.length -1].Draw();
  };

  this.KeyHandler = function(oEvent, bKeyDown) {
    var iCode = (oEvent.charCode || oEvent.keyCode);
    
    switch (iCode) {
      // frequent keys
      case oGameSettings.iFire:
        oEvent.preventDefault(); 
        if (bKeyDown == false) {
          this.bGunLoaded = true;
        } else {
          if ((this.bGunLoaded == true) && (this.bApplyShield != true)) {
            this.bGunLoaded = false;
            this.Fire();
          }
        };
        break;
      case oGameSettings.iCCW:
        oEvent.preventDefault(); 
        (bKeyDown == true) ? this.iApplyRotation = -this.iRotateSpeed : this.iApplyRotation = 0;
        break;
      case oGameSettings.iCW:
        oEvent.preventDefault(); 
        (bKeyDown == true) ? this.iApplyRotation = this.iRotateSpeed : this.iApplyRotation = 0;
        break;
      case oGameSettings.iThrust:
        oEvent.preventDefault(); 
        this.bApplyThrust = bKeyDown;
        if (this.bApplyThrust == true) {
          oSound.Play("Thrust");
        } else {
          oSound.Stop("Thrust");
        }
        break;
      case oGameSettings.iShield:
        oEvent.preventDefault();
        this.bApplyShield = bKeyDown;
        if (this.bApplyShield == true) {
          oSound.Play("Shield");
        } else {
          oSound.Stop("Shield");
        }
        break;        

      // infrequent keys
      case oGameSettings.iPause:
        oEvent.preventDefault(); 
        if (bKeyDown == true) {
          this.bApplyPause = !this.bApplyPause;
          Timer(!this.bApplyPause);
        }
        break;      
      case oGameSettings.iQuit:
        oEvent.preventDefault(); 
        clearTimeout(iTimer);
        clearTimeout(iPauseTimer);
        oGame.iLives = -1;
        this.Die(-5000, -5000);
        CheckHighScore(true);
        Timer(true);
    }
  };

  this.ScrollViewport = function() {
    if (this.bActive == true) {
      // set horizontal scroll speed if req'd
      if (Math.abs(this.iActualVectorX) > 6) {
        oGame.oArena.iSlideX = this.iActualVectorX;
      } else {
        if (this.iActualVectorX != 0) {
            if ((this.iPositionX - oGame.oArena.iViewportOffsetX) > 750) {
                oGame.oArena.iSlideX = 11;
            } else if ((this.iPositionX - oGame.oArena.iViewportOffsetX) < 210) {
                oGame.oArena.iSlideX = -11;
            }
        }
      }

      // set vertical scroll speed if req'd
      if (Math.abs(this.iActualVectorY) > 6) {
        oGame.oArena.iSlideY = this.iActualVectorY;
      } else {
        if (this.iActualVectorY != 0) {
            if ((this.iPositionY - oGame.oArena.iViewportOffsetY) > 355) {
                oGame.oArena.iSlideY = 10;
            } else if ((this.iPositionY - oGame.oArena.iViewportOffsetY) < 95) {
                oGame.oArena.iSlideY = -10;
            }
        }
        if (this.bPodConnected == true) {
            if ((oGame.oPod.iPositionY - oGame.oArena.iViewportOffsetY) > 385) {
                oGame.oArena.iSlideY = 10;
            } else if ((oGame.oPod.iPositionY - oGame.oArena.iViewportOffsetY) < 65) {
                oGame.oArena.iSlideY = -10;
            }
        }
      }

      // apply any horizontal scroll vector
      if (Math.abs(oGame.oArena.iSlideX) > 0) {
        oGame.oArena.iViewportOffsetX += oGame.oArena.iSlideX;
        if (oGame.oArena.iSlideX > 0) {
          oGame.oArena.iSlideX -= 0.2;
          if (oGame.oArena.iSlideX < 0) oGame.oArena.iSlideX = 0;
        } else if (oGame.oArena.iSlideX < 0) {
          oGame.oArena.iSlideX += 0.2;
          if (oGame.oArena.iSlideX > 0) oGame.oArena.iSlideX = 0;
        }
      }

      // apply any vertical scroll vector
      if (Math.abs(oGame.oArena.iSlideY) > 0) {
        oGame.oArena.iViewportOffsetY += oGame.oArena.iSlideY;
        if (oGame.oArena.iSlideY > 0) {
          oGame.oArena.iSlideY -= 0.2;
          if (oGame.oArena.iSlideY < 0) oGame.oArena.iSlideY = 0;
        } else if (oGame.oArena.iSlideY < 0) {
          oGame.oArena.iSlideY += 0.2;
          if (oGame.oArena.iSlideY > 0) oGame.oArena.iSlideY = 0;
        }
      }
    } else {
      if (oGame.oArena.iSlideX > 0) {
        oGame.oArena.iSlideX = (oGame.oArena.iSlideX - (oGame.oArena.iSlideX / 9));
        if (oGame.oArena.iSlideX < 0.1) oGame.oArena.iSlideX = 0;
      } else if (oGame.oArena.iSlideX < 0) {
        oGame.oArena.iSlideX = (oGame.oArena.iSlideX + Math.abs(oGame.oArena.iSlideX / 9));
        if (oGame.oArena.iSlideX > -0.1) oGame.oArena.iSlideX = 0;
      }
      if (oGame.oArena.iSlideY > 0) {
        oGame.oArena.iSlideY = (oGame.oArena.iSlideY - (oGame.oArena.iSlideY / 7));
        if (oGame.oArena.iSlideY < 0.1) oGame.oArena.iSlideY = 0;
      } else if (oGame.oArena.iSlideY < 0) {
        oGame.oArena.iSlideY = (oGame.oArena.iSlideY + Math.abs(oGame.oArena.iSlideY / 7));
        if (oGame.oArena.iSlideY > -0.1) oGame.oArena.iSlideY = 0;
      }
      oGame.oArena.iViewportOffsetX += oGame.oArena.iSlideX;
      oGame.oArena.iViewportOffsetY += oGame.oArena.iSlideY;
    }

    // handle "wraparound", e.g. player circling planet
    if (this.iPositionX < 0) {
      this.iPositionX += oGame.oArena.iArenaWidth;
      if (this.bPodConnected == true) {
        oGame.oPod.iPositionX += oGame.oArena.iArenaWidth;
      }
      oGame.oArena.iViewportOffsetX += oGame.oArena.iArenaWidth;
    } else if (this.iPositionX > oGame.oArena.iArenaWidth) {
      this.iPositionX -= oGame.oArena.iArenaWidth;
      if (this.bPodConnected == true) {
        oGame.oPod.iPositionX -= oGame.oArena.iArenaWidth;
      }
      oGame.oArena.iViewportOffsetX -= oGame.oArena.iArenaWidth;
    }
  };

  this.UpdateFuel = function(iDifference) {
    if (bUnlimitedFuel != true) {
        oGame.iFuel += iDifference;
    }
    UpdateStatus(oGame.iFuel, "fuel");
  };
}
