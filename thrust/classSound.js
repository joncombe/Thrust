// soundmanager config
soundManager.waitForWindowLoad = true;
soundManager.debugMode = false;
soundManager.flashVersion = 9;
soundManager.useHighPerformance = true;
soundManager.url = 'http://static.joncom.be/screen/experiments/thrust/soundmanager2/';
soundManager.onload = function() {
  oSound = new Sound();
  oSound.Init();
  oSound.Cache();

  // cookie handler
  $.Jookie.Initialise("thrust", 525600);

  var iVolume = $.Jookie.Get("thrust", "iVol") || 50;
  if (iVolume != 50) {
    oSound.Volume(iVolume - 50);
  }

  var bMute = $.Jookie.Get("thrust", "bMute") || false;
  if (bMute == true) {
    oSound.ToggleMute( $("div.mute_off") );
  }
};

function Sound() {
  this.oSounds       = {};
  this.bShield       = false;
  this.iShieldTimer  = 0;
  this.iVolume       = 50;
  this.bMute         = false;
  this.bThrust       = false;
  this.iThrustTimer  = 0;

  this.Init = function() {
    this.oSounds.Countdown   = soundManager.createSound({ id: "Countdown",   url: "http://static.joncom.be/screen/experiments/thrust/sounds/countdown.mp3" });
    this.oSounds.EnemyBullet = soundManager.createSound({ id: "EnemyBullet", url: "http://static.joncom.be/screen/experiments/thrust/sounds/enemy_bullet.mp3" });
    this.oSounds.Explosion   = soundManager.createSound({ id: "Explosion",   url: "http://static.joncom.be/screen/experiments/thrust/sounds/explosion.mp3" });
    this.oSounds.NewLife     = soundManager.createSound({ id: "NewLife",     url: "http://static.joncom.be/screen/experiments/thrust/sounds/newlife.mp3" });
    this.oSounds.Ping        = soundManager.createSound({ id: "Ping",        url: "http://static.joncom.be/screen/experiments/thrust/sounds/ping.mp3" });
    this.oSounds.Refuel      = soundManager.createSound({ id: "Refuel",      url: "http://static.joncom.be/screen/experiments/thrust/sounds/refuel.mp3" });
    this.oSounds.Shield      = soundManager.createSound({ id: "Shield",      url: "http://static.joncom.be/screen/experiments/thrust/sounds/shield.mp3" });
    this.oSounds.ShipBullet  = soundManager.createSound({ id: "ShipBullet",  url: "http://static.joncom.be/screen/experiments/thrust/sounds/ship_bullet.mp3" });
    this.oSounds.Thrust      = soundManager.createSound({ id: "Thrust",      url: "http://static.joncom.be/screen/experiments/thrust/sounds/thrust.mp3" });
  };

  this.Cache = function() {
    var aCache = ['Thrust', 'Shield', 'ShipBullet', 'EnemyBullet', 'Explosion', 'Refuel', 'Countdown', 'Ping'];
    for (var i = 0; i < aCache.length; i++) {
      this.oSounds[aCache[i]].play({volume:0 });
    }
    this.oSounds['Thrust'].stop();
    this.oSounds['Shield'].stop();
  };

  this.Play = function(sSound) {
    if ((this.bMute == false) && (this.iVolume > 0)) {
      switch (sSound) {
        case "Shield":
          if ((this.bShield != true) && (oGame.iFuel > 0)) {
            this.oSounds.Shield.play({volume:this.iVolume });
            this.bShield = true;
            this.iShieldTimer = setInterval(function() {
              oSound.oSounds.Shield.setPosition(1);
            }, 6500);
          }
          break;
        case "Thrust":
          if ((this.bThrust != true) && (oGame.iFuel > 0)) {
            this.oSounds.Thrust.play({volume:this.iVolume });
            this.bThrust = true;
            this.iThrustTimer = setInterval(function() {
              oSound.oSounds.Thrust.setPosition(1);
            }, 8000);
          }
          break;
        default:
          this.oSounds[sSound].play({volume:this.iVolume });
      }
    }
  };

  this.Stop = function(sSound) {
    switch (sSound) {
      case "Shield":
        if (this.bShield == true) {
          this.oSounds.Shield.stop();
          this.bShield = false;
          clearInterval(this.iShieldTimer);
        }
        break;
      case "Thrust":
        if (this.bThrust == true) {
          this.oSounds.Thrust.stop();
          this.bThrust = false;
          clearInterval(this.iThrustTimer);
        }
        break;
    }
  };

  this.ToggleMute = function(oImg) {
    this.bMute = !this.bMute;
    if (this.bMute == true) {
        $(oImg).removeClass("mute_off").addClass("mute_on");
        $("#volume").css({ "background-position": ("0px -24px") });
    } else {
        $(oImg).removeClass("mute_on").addClass("mute_off");
        this.Volume(0);
    }
    $.Jookie.Set("thrust", "bMute", this.bMute);
  };

  this.Volume = function(iChange) {
    // change and sanitize volume level
    this.iVolume += iChange;
    if (this.iVolume < 10) { this.iVolume = 0 }
    if (this.iVolume > 100) { this.iVolume = 100 }

    // stop any looping sounds or user will think the volume control doesn't work
    this.oSounds['Thrust'].stop();
    this.oSounds['Shield'].stop();

    // update display
    var iX = 0;
    var iY = -24;
    switch (this.iVolume) {
        case 10:
        case 60:
            iX = -48;
            break;
        case 20:
        case 70:
            iX = -96;
            break;
        case 30:
        case 80:
            iX = -144;
            break;
        case 40:
        case 90:
            iX = -192;
            break;
    }
    if (this.iVolume >= 50) {
        iY = -36;
        if (this.iVolume == 100) {
            iY = -48;
        }
    }
    $("#volume").css({ "background-position": (iX + "px " + iY + "px") });
    $("#thrust_arena").focus();

    // if muted, unmute
    if (this.bMute == true) {
        $("div.mute_on").removeClass("mute_on").addClass("mute_off");
        this.bMute = false;
    }

    // save cookie
    $.Jookie.Set("thrust", "iVol", this.iVolume);
  };
}
