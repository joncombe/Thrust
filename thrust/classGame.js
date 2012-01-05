function Game() {
  this.iVisibleLevel     = 0;
  this.iCurrentLevel     = 0;
  this.iPreviousLevel    = 0;
  this.iAge              = 0;
  this.iLives            = 3;
  this.iScore            = 0;
  this.iFuel             = 1000;
  this.iTimer            = 0;
  this.iIntervalSpeed    = 50;
  this.sState            = "";
  this.bInvisibleTerrain = false;
  this.iLastDieYPos      = 0;
  this.bLastDieHasPod    = false;

  // game variables
  this.aBlackHole     = [];
  this.aBullet        = [];
  this.aDoor          = [];
  this.aEnemy         = [];
  this.aExplosion     = [];
  this.aFuelTank      = [];
  this.oArena         = null;
  this.oLevel         = null;
  this.oPod           = null;
  this.oReactor       = null;
  this.oShip          = null;

  this.DrawBlackHole = function() {
    // clear viewport
    oCTX.clearRect(0, 0, oGame.oArena.iViewportWidth, oGame.oArena.iViewportHeight);

    // draw black hole(s)
    for (var i = (oGame.aBlackHole.length - 1); i >= 0; i--) {
      if (this.aBlackHole[i].Draw() == true) {
        sState = this.aBlackHole[i].sCallback;
        if (sState == "InFlight") {
          // draw ship quickly if we're in-flight (stops a nasty pause)
          oGame.oShip.Draw();
        }
        this.aBlackHole.splice(i, 1);
      }
    }

    // draw game objects
    for (var i = 0; i < this.aEnemy.length; i++) {
      this.aEnemy[i].Draw();
    }
    for (var i = 0; i < this.aFuelTank.length; i++) {
      if (this.aFuelTank[i].iFuelLoad > 0) {
          this.aFuelTank[i].Draw();
      }
    }
    for (var i = 0; i < this.aDoor.length; i++) {
      this.aDoor[i].UpdatePositionAndDraw();
    }
    this.oReactor.Draw();
    this.oArena.DrawLandscape();
    this.oPod.Draw();
  };

  this.LoadLevel = function(iLoadLevel) {
    var bReverseGravity = false;
    iPlanetExplosionPosition = 0;

    // set previous level number
    if (iLoadLevel > 1) {
        this.iPreviousLevel = this.iCurrentLevel;
    }

    // set level number
    this.iVisibleLevel = iLoadLevel;
    if (iLoadLevel > 24) {
        clearTimeout(iTimer);
        clearTimeout(iPauseTimer);
        var sMessage = "#ffff00omg...you completed the game\n#00ff00i did not think anyone would actually do this";
        if ($("#thrust_cheat").css("display") == "block") {
            sMessage = "\n\n\n\n\n" + sMessage + "\n\n\n\n\n\n\n\n#00ffffoh hang on, you cheated";
        }
        ShowMessage(sMessage, oCTX);
        $("#thrust_cheat").slideUp();
    } else if (iLoadLevel > 18) {
        bReverseGravity = true;
        this.bInvisibleTerrain = true;
        iLoadLevel -= 18;
    } else if (iLoadLevel > 12) {
        this.bInvisibleTerrain = true;
        iLoadLevel -= 12;
    } else if (iLoadLevel > 6) {
        bReverseGravity = true;
        this.bInvisibleTerrain = false;
        iLoadLevel -= 6;
    } else {
        this.bInvisibleTerrain = false;
    }
    this.iCurrentLevel = iLoadLevel;

    // load (copy) level
    this.oLevel = {};
    for (var sKey in aLevelInfo[iLoadLevel - 1]) {
        var vValue = aLevelInfo[iLoadLevel - 1][sKey];

        if (typeof vValue != "object") {
            this.oLevel[sKey] = vValue;
        } else {
            this.oLevel[sKey] = vValue.slice();
        }
    }

    // level modifiers
    if (bReverseGravity == true) {
      this.oLevel.iGravity = -this.oLevel.iGravity;
    }
  };

  this.SetNewPosition = function(bHasPod, iShipX, iShipY) {
    // ship position
    this.oShip.iPositionX = iShipX;
    this.oShip.iPositionY = iShipY;
    this.oShip.iPreviousX = iShipX;
    this.oShip.iPreviousY = iShipY;

    // viewport position
    this.oArena.iViewportOffsetX = iShipX - (this.oArena.iViewportWidth / 2);
    this.oArena.iViewportOffsetY = iShipY - (this.oArena.iViewportHeight / 2.5);

    // position pod
    if (bHasPod == true) {
      this.oShip.bPodConnected = true;
      this.oPod.iPositionX = (iShipX - 17);
      this.oPod.iPositionY = (iShipY + 77);
    }
  };

  this.StartNewLife = function() {
    // change status bar
    $("#thrust div:eq(0)").css({"background-position": (0 - ((this.iCurrentLevel - 1) * 960)) + "px 0px"});

    // create arena, reactor and pod
    this.oArena      = new Arena();
    this.oReactor    = new Reactor();
    this.oPod        = new Pod();

    // empty bullets and explosions
    this.aBlackHole  = [];
    this.aBullet     = [];
    this.aEnemy      = [];
    this.aDoor       = [];
    this.aExplosion  = [];
    this.aFuelTank   = [];

    // create fuel tanks
    for (var i = 0; i < oGame.oLevel.aFuelTank.length; i++) {
      this.aFuelTank.push(new FuelTank(oGame.oLevel.aFuelTank[i].iPositionX,
                                       oGame.oLevel.aFuelTank[i].iPositionY));
    }

    // create enemies
    for (var i = 0; i < oGame.oLevel.aEnemy.length; i++) {
      this.aEnemy.push(new Enemy(this.oLevel.aEnemy[i].iPositionX,
                                 this.oLevel.aEnemy[i].iPositionY,
                                 this.oLevel.aEnemy[i].iOrientation,
                                 this.oLevel.aEnemy[i].iGunAngleRange,
                                 this.oLevel.aEnemy[i].iGunAngleOffset,
                                 this.oLevel.aEnemy[i].iAggression));
    }

    // create doors
    for (var i = 0; i < oGame.oLevel.aDoor.length; i++) {
      this.aDoor.push(new Door(this.oLevel.aDoor[i].iPositionX,
                               this.oLevel.aDoor[i].iPositionY,
                               this.oLevel.aDoor[i].aDimensions,
                               this.oLevel.aDoor[i].aKeyholes,
                               this.oLevel.aDoor[i].sDoorColour,
                               this.oLevel.aDoor[i].sKeyColour));
    }

    // create player
    this.oShip = new Ship();

    // check restart position
    var i = 0;
    while (i < oGame.oLevel.aRestartPositions.length) {
      if ((oGame.oLevel.aRestartPositions[i].bPodConnected != true) && (this.iLastDieYPos > oGame.oLevel.aRestartPositions[i].iYPos)) {
        this.SetNewPosition(false,
                            oGame.oLevel.aRestartPositions[i].iShipX,
                            oGame.oLevel.aRestartPositions[i].iShipY)
      }
      if ((this.bLastDieHasPod == true) && (oGame.oLevel.aRestartPositions[i].bPodConnected == true)) {
        if (this.iLastDieYPos < oGame.oLevel.aRestartPositions[i].iYPos) {
          this.SetNewPosition(true,
                              oGame.oLevel.aRestartPositions[i].iShipX,
                              oGame.oLevel.aRestartPositions[i].iShipY)
        }
      }
      i++;
    }
    this.iLastDieYPos = 0;
    this.bLastDieHasPod = false;

    // create black hole
    this.aBlackHole.push(new BlackHole(this.oShip.iPositionX, this.oShip.iPositionY, "#ffff00", "InFlight"));

    // initiate game
    UpdateStatus(this.iFuel, "fuel");
    UpdateStatus(this.iLives, "lives");
    UpdateStatus(this.iScore, "score");
    UpdateStatus(" ", "countdown");
    sState = "BlackHole";
  };

  this.UpdateScore = function(iDifference) {
    var iOldScore = this.iScore;
    this.iScore += iDifference;
    UpdateStatus(this.iScore, "score");

    // add new life
    if (Math.floor(this.iScore / 10000) > Math.floor(iOldScore / 10000)) {
      this.iLives++;
      UpdateStatus(this.iLives, "lives");
      oSound.Play("NewLife");
    }
  };
}
