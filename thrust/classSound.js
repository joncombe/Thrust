function Sound() {
  this.oSounds = {};
  this.bShield = false;
  this.iVolume = 50;
  this.bMute = false;
  this.bThrust = false;

  this.Init = function () {
    this.oSounds.Countdown = new Audio("./sounds/countdown.mp3");
    this.oSounds.EnemyBullet = new Audio("./sounds/enemy_bullet.mp3");
    this.oSounds.Explosion = new Audio("./sounds/explosion.mp3");
    this.oSounds.NewLife = new Audio("./sounds/newlife.mp3");
    this.oSounds.Ping = new Audio("./sounds/ping.mp3");
    this.oSounds.Refuel = new Audio("./sounds/refuel.mp3");
    this.oSounds.Shield = new Audio("./sounds/shield.mp3");
    this.oSounds.ShipBullet = new Audio("./sounds/ship_bullet.mp3");
    this.oSounds.Thrust = new Audio("./sounds/thrust.mp3");

    this.oSounds.Shield.loop = true;
    this.oSounds.Thrust.loop = true;
  };

  this.Play = function (sSound) {
    if (this.bMute == false && this.iVolume > 0) {
      switch (sSound) {
        case "Shield":
          if (this.bShield != true && oGame.iFuel > 0) {
            this.oSounds.Shield.play();
            this.bShield = true;
          }
          break;
        case "Thrust":
          if (this.bThrust != true && oGame.iFuel > 0) {
            this.oSounds.Thrust.play();
            this.bThrust = true;
          }
          break;
        default:
          this.oSounds[sSound].pause();
          this.oSounds[sSound].currentTime = 0;
          this.oSounds[sSound].play();
      }
    }
  };

  this.Stop = function (sSound) {
    switch (sSound) {
      case "Shield":
        if (this.bShield == true) {
          this.oSounds.Shield.pause();
          this.oSounds.Shield.currentTime = 0;
          this.bShield = false;
        }
        break;
      case "Thrust":
        if (this.bThrust == true) {
          this.oSounds.Thrust.pause();
          this.oSounds.Thrust.currentTime = 0;
          this.bThrust = false;
        }
        break;
    }
  };

  this.ToggleMute = function (oImg) {
    this.bMute = !this.bMute;
    if (this.bMute == true) {
      $(oImg).removeClass("mute_off").addClass("mute_on");
      $("#volume").css({ "background-position": "0px -24px" });
    } else {
      $(oImg).removeClass("mute_on").addClass("mute_off");
      this.Volume(0);
    }
    $.Jookie.Set("thrust", "bMute", this.bMute);
  };

  this.Volume = function (value) {
    // change and sanitize volume level
    this.iVolume = Math.max(0, Math.min(value, 100));

    // stop any looping sounds or user will think the volume control doesn't work
    this.oSounds["Thrust"].pause();
    this.oSounds["Thrust"].currentTime = 0;
    this.oSounds["Shield"].pause();
    this.oSounds["Shield"].currentTime = 0;

    // update actual volume
    Object.values(this.oSounds).forEach(
      (value) => (value.volume = this.iVolume / 100)
    );

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

    // update ui
    $("#volume").css("background-position", `${iX}px ${iY}px`);
    $("#thrust_arena").focus();

    // if muted, unmute
    if (this.bMute == true) {
      $("div.mute_on").removeClass("mute_on").addClass("mute_off");
      this.bMute = false;
    }

    // save cookie
    $.Jookie.Set("thrust", "iVol", this.iVolume);
  };

  this.VolumeDown = function () {
    this.Volume(this.iVolume - 10);
  };

  this.VolumeUp = function () {
    this.Volume(this.iVolume + 10);
  };
}

var oSound = new Sound();
oSound.Init();
$.Jookie.Initialise("thrust", 525600);
oSound.Volume($.Jookie.Get("thrust", "iVol") || 50);
var bMute = $.Jookie.Get("thrust", "bMute") || false;
if (bMute == true) {
  oSound.ToggleMute($("div.mute_off"));
}
