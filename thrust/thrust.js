// define vars
var oCTX, oGame, oSound, iTimer, iPauseTimer, sNextState, sState, iKeySelectAnim;
var bIE = false;
var iKeySelectPos = 0;
var aPlanetExplosionColours = ["#ffff00","#ff0000","#00ff00","#0000ff","#ff00ff","#ff0000","#00ff00","#0000ff","#ff00ff","#ffff00"];
var iPlanetExplosionPosition = 0;
var iBonusScore = 0;
var bBonusLife = false;
var bTracers    = false;
var iEditKeyPos = 0;
var aEditKeyCodes = [];
var iHighScoreID = 0;
var iHighScoreMaxNameLength = 11;
var aHighScores = [
{iID:0, sName:"spacelord  ", sScore: "  200000", iScore:200000},
{iID:0, sName:"admiral    ", sScore: "  150000", iScore:150000},
{iID:0, sName:"commodore  ", sScore: "  100000", iScore:100000},
{iID:0, sName:"captain    ", sScore: "   50000", iScore:50000},
{iID:0, sName:"pilot      ", sScore: "   20000", iScore:20000},
{iID:0, sName:"cadet      ", sScore: "   15000", iScore:15000},
{iID:0, sName:"novice     ", sScore: "    5000", iScore:5000},
{iID:0, sName:"menace     ", sScore: "    1000", iScore:1000}
];
var oGameSettings = {};

var aLevelInfo  = [
// level 1
{
  // arena
  iArenaWidth:        2000,
  iArenaHeight:       2500,
  iViewportOffsetX:   333,
  iViewportOffsetY:   1200,
  iGravity:           0.10,
  sLandscapeColor:    "#880000",
  aLandscape:         [ [   0,1500],[ 514,1500],[ 674,1575],[ 874,1575],[1004,1635],
                        [1255,1635],[1255,1545],[1395,1545],[1495,1500],[2000,1500] ],

  // starfield
  iStarCount:         50,
  iStarLowerLimit:    1300,
  sStarColourA:       "#ffff00",
  sStarColourB:       "#00ff00",

  // reactor
  iReactorX:          1302,
  iReactorY:          1525.5,
  sReactorColor:      "#ffff00",
  sReactorChimney:    "#00ff00",
  sReactorDoor:       "#ff0000",
  sReactorExplosion:  "#ffff00",

  // ship
  iShipPositionX:     805,
  iShipPositionY:     1350,
  sShipBulletColor:   "#00ff00",
  sRefuelColor:       "#ffff00",
  sShieldColor:       "#00ff00",
  sShipExplosion:     "#00ff00",

  // pod
  iPodPositionX:      1128,
  iPodPositionY:      1603,
  sPodColor:          "#00ff00",
  sPodBaseColor:      "#ffff00",
  sRodColor:          "#ff0000",

  // enemies
  aEnemy: [
    { iPositionX: 946, iPositionY:1594, iOrientation:205, iGunAngleRange:180, iGunAngleOffset:0, iAggression:0.02 }
  ],
  sEnemyColor:        "#00ff00",
  sEnemyBulletColor:  "#ff0000",
  sEnemyExplosion:    "#ffff00",

  // fuel tanks
  aFuelTank: [
    { iPositionX: 805, iPositionY: 1558 }
  ],
  sFuelTankColor:     "#ffff00",
  sFuelTankLegs:      "#00ff00",
  sFuelTankLabel:     "#ff0000",
  sFuelTankExplosion: "#00ff00",

  // doors
  aDoor: [],

  // level colours
  sEndColorTop:       "#ff0000",
  sEndColorMiddle:    "#00ff00",
  sEndColorBottom:    "#ffff00",

  // restart positions
  aRestartPositions:  []
},

// level 2
{
  // arena
  iArenaWidth:        2000,
  iArenaHeight:       2500,
  iViewportOffsetX:   420,
  iViewportOffsetY:   1200,
  iGravity:           0.11,
  sLandscapeColor:    "#008800",
  aLandscape:         [ [   0,1500],[ 574,1500],[ 678,1552],[ 878,1552],[1054,1640],[1054,1860],
                        [ 870,1952],[ 870,2033],[ 998,2097],[1143,2097],[1343,1996],[1343,1912],
                        [1207,1844],[1207,1609],[1425,1500],[2000,1500] ],

  // starfield
  iStarCount:         50,
  iStarLowerLimit:    1300,
  sStarColourA:       "#ffff00",
  sStarColourB:       "#ff0000",

  // reactor
  iReactorX:          820,
  iReactorY:          1532.5,
  sReactorColor:      "#ffff00",
  sReactorChimney:    "#ff0000",
  sReactorDoor:       "#00ff00",
  sReactorExplosion:  "#ffff00",

  // ship
  iShipPositionX:     910,
  iShipPositionY:     1360,
  sShipBulletColor:   "#ff0000",
  sRefuelColor:       "#ffff00",
  sShieldColor:       "#ff0000",
  sShipExplosion:     "#ff0000",

  // pod
  iPodPositionX:      1024,
  iPodPositionY:      2064.5,
  sPodColor:          "#ff0000",
  sPodBaseColor:      "#ffff00",
  sRodColor:          "#00ff00",

  // enemies
  aEnemy:             [
    { iPositionX:1266, iPositionY:1888, iOrientation: 26.5, iGunAngleRange:200, iGunAngleOffset:-18, iAggression:0.02 },
    { iPositionX: 960, iPositionY:1920, iOrientation:333, iGunAngleRange:190, iGunAngleOffset:0, iAggression:0.02 }
  ],
  sEnemyColor:        "#ff0000",
  sEnemyBulletColor:  "#00ff00",
  sEnemyExplosion:    "#ffff00",

  // fuel tanks
  aFuelTank:          [
    { iPositionX: 1118, iPositionY: 2077 }
  ],
  sFuelTankColor:     "#ffff00",
  sFuelTankLegs:      "#ff0000",
  sFuelTankLabel:     "#00ff00",
  sFuelTankExplosion: "#ff0000",

  // doors
  aDoor: [],

  // level colours
  sEndColorTop:       "#00ff00",
  sEndColorMiddle:    "#ff0000",
  sEndColorBottom:    "#ffff00",

  // restart positions
  aRestartPositions:  []
},

// level 3
{
  // arena
  iArenaWidth:        2000,
  iArenaHeight:       3000,
  iViewportOffsetX:   240,
  iViewportOffsetY:   1200,
  iGravity:           0.13,
  sLandscapeColor:    "#008888",
  aLandscape:         [ [   0,1500],
                        [ 880,1500],
                        [ 880,1821],
                        [ 800,1860],
                        [ 800,2061],
                        [ 566,2061],
                        [ 480,2104],
                        [ 480,2225],
                        [ 366,2225],
                        [ 280,2268],
                        [ 280,2609],
                        [ 369,2652],
                        [ 529,2652],
                        [ 529,2432],
                        [ 601,2396],
                        [ 761,2396],
                        [ 761,2192],
                        [1000,2192],
                        [1000,1948],
                        [1155,1948],
                        [1241,1905],
                        [1241,1821],
                        [1049,1821],
                        [1049,1580],
                        [1233,1580],
                        [1233,1500],
                        [2000,1500] ],

  // starfield
  iStarCount:         50,
  iStarLowerLimit:    1300,
  sStarColourA:       "#ffff00",
  sStarColourB:       "#ff0000",

  // reactor
  iReactorX:          1140,
  iReactorY:          1560.5,
  sReactorColor:      "#ffff00",
  sReactorChimney:    "#00ff00",
  sReactorDoor:       "#00ffff",
  sReactorExplosion:  "#00ff00",

  // ship
  iShipPositionX:     720,
  iShipPositionY:     1360,
  sShipBulletColor:   "#00ff00",
  sRefuelColor:       "#ffff00",
  sShieldColor:       "#00ff00",
  sShipExplosion:     "#00ffff",

  // pod
  iPodPositionX:      460,
  iPodPositionY:      2620.5,
  sPodColor:          "#00ff00",
  sPodBaseColor:      "#ffff00",
  sRodColor:          "#00ffff",

  // enemies
  aEnemy:             [
    { iPositionX: 846, iPositionY:1852, iOrientation:333.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX:1193, iPositionY:1915, iOrientation:  153, iGunAngleRange:100, iGunAngleOffset: 50, iAggression:0.025 },
    { iPositionX: 527, iPositionY:2093, iOrientation:333.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX: 327, iPositionY:2258, iOrientation:333.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX: 557, iPositionY:2405, iOrientation:  153, iGunAngleRange:100, iGunAngleOffset: 50, iAggression:0.025 }
  ],
  sEnemyColor:        "#00ff00",
  sEnemyBulletColor:  "#00ffff",
  sEnemyExplosion:    "#ffff00",

  // fuel tanks
  aFuelTank:          [
    { iPositionX: 790, iPositionY: 1480 },
    { iPositionX:1025, iPositionY: 1930 },
    { iPositionX:1075, iPositionY: 1930 },
    { iPositionX:1125, iPositionY: 1930 },
    { iPositionX: 820, iPositionY: 2174 },
    { iPositionX: 635, iPositionY: 2376 }
  ],
  sFuelTankColor:     "#ffff00",
  sFuelTankLegs:      "#00ff00",
  sFuelTankLabel:     "#00ffff",
  sFuelTankExplosion: "#ff0000",

  // doors
  aDoor: [],

  // level colours
  sEndColorTop:       "#00ffff",
  sEndColorMiddle:    "#00ff00",
  sEndColorBottom:    "#ffff00",

  // restart positions
  aRestartPositions:  [
    { iYPos: 1950, iShipX:  905, iShipY: 1950, bPodConnected: false },
    { iYPos: 2240, iShipX:  410, iShipY: 2410, bPodConnected: false },
    { iYPos: 1950, iShipX:  905, iShipY: 1950, bPodConnected:  true }
  ]
},

// level 4
{
  // arena
  iArenaWidth:        2000,
  iArenaHeight:       3200,
  iViewportOffsetX:   250,
  iViewportOffsetY:   1200,
  iGravity:           0.14,
  sLandscapeColor:    "#008800",
  aLandscape:         [ [   0,1500],
                        [ 519,1500],
                        [ 680,1580],
                        [ 808,1580],
                        [ 808,1656],
                        [ 504,1816],
                        [ 504,1896],
                        [ 584,1935],
                        [ 584,1961],
                        [ 424,2040],
                        [ 424,2180],
                        [ 624,2180],
                        [ 792,2264],
                        [1049,2264],
                        [1049,2417],
                        [ 824,2528],
                        [ 824,2672],
                        [ 904,2712],
                        [ 904,2796],
                        [1001,2796],
                        [1001,2712],
                        [1193,2616],
                        [1193,2085],
                        [ 873,2085],
                        [ 681,1989],
                        [ 681,1916],
                        [ 921,1916],
                        [ 921,1500],
                        [2000,1500] ],

  // starfield
  iStarCount:         50,
  iStarLowerLimit:    1300,
  sStarColourA:       "#ffff00",
  sStarColourB:       "#ff0000",

  // reactor
  iReactorX:          546,
  iReactorY:          2160.5,
  sReactorColor:      "#ffff00",
  sReactorChimney:    "#ff00ff",
  sReactorDoor:       "#00ff00",
  sReactorExplosion:  "#ffff00",

  // ship
  iShipPositionX:     720,
  iShipPositionY:     1360,
  sShipBulletColor:   "#ff00ff",
  sRefuelColor:       "#ffff00",
  sShieldColor:       "#ff00ff",
  sShipExplosion:     "#ff0000",

  // pod
  iPodPositionX:      955,
  iPodPositionY:      2763.5,
  sPodColor:          "#ff00ff",
  sPodBaseColor:      "#ffff00",
  sRodColor:          "#00ff00",

  // enemies
  aEnemy:             [
    { iPositionX: 738, iPositionY:1706, iOrientation:331.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX: 543, iPositionY:1902, iOrientation:206,   iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX: 544, iPositionY:1993, iOrientation:333.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX: 693, iPositionY:2200, iOrientation:206,   iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX: 777, iPositionY:2051, iOrientation: 26,   iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX: 930, iPositionY:2490, iOrientation:333.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX:1111, iPositionY:2643, iOrientation:153.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 }
  ],
  sEnemyColor:        "#ff00ff",
  sEnemyBulletColor:  "#00ff00",
  sEnemyExplosion:    "#ffff00",

  // fuel tanks
  aFuelTank:          [],
  sFuelTankColor:     "#ffff00",
  sFuelTankLegs:      "#ff00ff",
  sFuelTankLabel:     "#00ff00",
  sFuelTankExplosion: "#ff0000",

  // doors
  aDoor: [
    { iPositionX: 1043, iPositionY: 2308, sDoorColour:"#008800", sKeyColour:"#ffff00",
      aDimensions: [
        [ [0,0],[164,0],[164,50],[0,50] ],
        [ [0,0],[149,0],[149,50],[0,50] ],
        [ [0,0],[134,0],[134,50],[0,50] ],
        [ [0,0],[119,0],[119,50],[0,50] ],
        [ [0,0],[104,0],[104,50],[0,50] ],
        [ [0,0],[ 89,0],[ 89,50],[0,50] ],
        [ [0,0],[ 74,0],[ 74,50],[0,50] ],
        [ [0,0],[ 59,0],[ 59,50],[0,50] ],
        [ [0,0],[ 44,0],[ 44,50],[0,50] ],
        [ [0,0],[ 29,0],[ 29,50],[0,50] ],
        [ [0,0],[ 24,0],[ 24,50],[0,50] ]
      ],
      aKeyholes: [ [1192,2227], [1192,2443] ]
    }
  ],

  // level colours
  sEndColorTop:       "#00ff00",
  sEndColorMiddle:    "#ff00ff",
  sEndColorBottom:    "#ffff00",

  // restart positions
  aRestartPositions:  [
    { iYPos: 1770, iShipX:  815, iShipY: 1770, bPodConnected: false },
    { iYPos: 2200, iShipX: 1115, iShipY: 2160, bPodConnected: false },
    { iYPos: 1770, iShipX:  815, iShipY: 1770, bPodConnected:  true }
  ]
},

// level 5
{
  // arena
  iArenaWidth:        2000,
  iArenaHeight:       3900,
  iViewportOffsetX:   180,
  iViewportOffsetY:   1250,
  iGravity:           0.15,
  sLandscapeColor:    "#880000",
  aLandscape:         [ [   0,1500],
                        [ 431,1500],
                        [ 599,1584],
                        [ 599,1676],
                        [ 783,1676],
                        [ 783,2001],
                        [ 710,2001],
                        [ 607,2052],
                        [ 607,2168],
                        [ 687,2168],
                        [ 687,2329],
                        [ 527,2409],
                        [ 367,2409],
                        [ 367,2757],
                        [ 527,2836],
                        [ 527,2896],
                        [ 447,2896],
                        [ 447,3009],
                        [ 550,3059],
                        [ 687,3059],
                        [ 687,3182],
                        [ 789,3227],
                        [ 943,3227],
                        [ 943,3561],
                        [1016,3596],
                        [1080,3596],
                        [1184,3546],
                        [1184,3424],
                        [1056,3361],
                        [1056,3109],
                        [ 928,3109],
                        [ 928,3020],
                        [ 842,2977],
                        [ 768,2977],
                        [ 768,2800],
                        [ 512,2673],
                        [ 512,2536],
                        [ 778,2536],
                        [ 864,2492],
                        [ 864,2329],
                        [ 800,2329],
                        [ 800,2168],
                        [1087,2168],
                        [1087,2044],
                        [1001,2001],
                        [ 896,2001],
                        [ 896,1500],
                        [2000,1500] ],

  // starfield
  iStarCount:         50,
  iStarLowerLimit:    1300,
  sStarColourA:       "#ffff00",
  sStarColourB:       "#ff0000",

  // reactor
  iReactorX:          891,
  iReactorY:          2148.5,
  sReactorColor:      "#ffff00",
  sReactorChimney:    "#ff00ff",
  sReactorDoor:       "#ff0000",
  sReactorExplosion:  "#ffff00",

  // ship
  iShipPositionX:     625,
  iShipPositionY:     1402,
  sShipBulletColor:   "#ff00ff",
  sRefuelColor:       "#ffff00",
  sShieldColor:       "#ff00ff",
  sShipExplosion:     "#ff00ff",

  // pod
  iPodPositionX:      1043,
  iPodPositionY:      3563.5,
  sPodColor:          "#ff00ff",
  sPodBaseColor:      "#ffff00",
  sRodColor:          "#ff0000",

  // enemies
  aEnemy:             [
    { iPositionX: 664, iPositionY:2037, iOrientation:333.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX:1039, iPositionY:2034, iOrientation: 26.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX: 816, iPositionY:2503, iOrientation:153.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX: 494, iPositionY:3018, iOrientation:205.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX: 878, iPositionY:3009, iOrientation: 26,   iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX: 736, iPositionY:3190, iOrientation:203.5, iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 },
    { iPositionX:1119, iPositionY:3406, iOrientation: 26,   iGunAngleRange:180, iGunAngleOffset: 10, iAggression:0.025 }
  ],
  sEnemyColor:        "#ff00ff",
  sEnemyBulletColor:  "#ff0000",
  sEnemyExplosion:    "#00ff00",

  // fuel tanks
  aFuelTank:          [
    { iPositionX: 735, iPositionY: 1657 },
    { iPositionX: 976, iPositionY: 2149 },
    { iPositionX:1027, iPositionY: 2149 },
    { iPositionX: 576, iPositionY: 2517 },
    { iPositionX: 583, iPositionY: 3040 },
    { iPositionX: 635, iPositionY: 3040 },
    { iPositionX: 839, iPositionY: 3207 },
    { iPositionX: 890, iPositionY: 3207 }
  ],
  sFuelTankColor:     "#ffff00",
  sFuelTankLegs:      "#ff00ff",
  sFuelTankLabel:     "#ff0000",
  sFuelTankExplosion: "#ff0000",

  // doors
  aDoor: [
    { iPositionX: 930, iPositionY: 3346, sDoorColour:"#880000", sKeyColour:"#ffff00",
      aDimensions: [
        [ [0,0],[140,0],[140,-82],[0,-82] ],
        [ [0,0],[140,0],[140,-72],[0,-72] ],
        [ [0,0],[140,0],[140,-62],[0,-62] ],
        [ [0,0],[140,0],[140,-52],[0,-52] ],
        [ [0,0],[140,0],[140,-42],[0,-42] ],
        [ [0,0],[140,0],[140,-32],[0,-32] ],
        [ [0,0],[140,0],[140,-22],[0,-22] ],
        [ [0,0],[140,0],[140,-12],[0,-12] ],
        [ [0,0],[140,0],[140, -2],[0, -2] ],
        [ [0,0],[  1,0],[  1, -2],[0, -2] ]
      ],
      aKeyholes: [ [1056,3156], [943,3474] ]
    }
  ],

  // level colours
  sEndColorTop:       "#ff0000",
  sEndColorMiddle:    "#ff00ff",
  sEndColorBottom:    "#ffff00",

  // restart positions
  aRestartPositions:  [
    { iYPos: 2370, iShipX:  740, iShipY: 2370, bPodConnected: false },
    { iYPos: 2840, iShipX:  625, iShipY: 2840, bPodConnected: false },
    { iYPos: 3095, iShipX:  795, iShipY: 3095, bPodConnected: false },
    { iYPos: 2840, iShipX:  625, iShipY: 2840, bPodConnected:  true },
    { iYPos: 2370, iShipX:  740, iShipY: 2370, bPodConnected:  true }
  ]
},

// level 6
{
  // arena
  iArenaWidth:        2000,
  iArenaHeight:       4300,
  iViewportOffsetX:   323,
  iViewportOffsetY:   1450,
  iGravity:           0.16,
  sLandscapeColor:    "#880088",
  aLandscape:         [ [   0,1500],
                        [ 511,1500],
                        [ 511,1752],
                        [ 695,1752],
                        [1334,2072],
                        [1334,2232],
                        [1181,2232],
                        [1094,2276],
                        [1094,2925],
                        [ 958,2925],
                        [ 958,3145],
                        [ 854,3196],
                        [ 854,3277],
                        [1286,3492],
                        [1286,3549],
                        [1182,3600],
                        [1182,3725],
                        [1102,3764],
                        [1102,4000],
                        [1190,4000],
                        [1190,4123],
                        [1311,4123],
                        [1311,4029],
                        [1207,4029],
                        [1207,3884],
                        [1431,3773],
                        [1431,3549],
                          [1489,3520],
                        [1431,3492],
                        [1431,3372],
                        [1079,3179],
                        [1079,3040],
                        [1247,3040],
                        [1247,2836],
                        [1327,2797],
                        [1327,2716],
                        [1183,2645],
                        [1183,2508],
                        [1407,2396],
                        [1607,2396],
                        [1607,2312],
                        [1447,2233],
                        [1447,1972],
                        [1008,1753],
                        [1008,1672],
                        [1352,1500],
                        [2000,1500] ],

  // starfield
  iStarCount:         50,
  iStarLowerLimit:    1300,
  sStarColourA:       "#ffff00",
  sStarColourB:       "#ff0000",

  // reactor
  iReactorX:          1264,
  iReactorY:          4103.5,
  sReactorColor:      "#ffff00",
  sReactorChimney:    "#00ffff",
  sReactorDoor:       "#ff00ff",
  sReactorExplosion:  "#ffff00",

  // ship
  iShipPositionX:     792,
  iShipPositionY:     1555,
  sShipBulletColor:   "#00ffff",
  sRefuelColor:       "#ffff00",
  sShieldColor:       "#00ffff",
  sShipExplosion:     "#00ffff",

  // pod
  iPodPositionX:      1146,
  iPodPositionY:      3967.5,
  sPodColor:          "#00ffff",
  sPodBaseColor:      "#ffff00",
  sRodColor:          "#ff00ff",

  // enemies
  aEnemy:             [
    { iPositionX:1136, iPositionY:1831, iOrientation: 26.5, iGunAngleRange:180, iGunAngleOffset: 0, iAggression:0.025 },
    { iPositionX:1525, iPositionY:2285, iOrientation: 26.5, iGunAngleRange:180, iGunAngleOffset: 0, iAggression:0.025 },
    { iPositionX:1286, iPositionY:2443, iOrientation:153.5, iGunAngleRange:180, iGunAngleOffset: 0, iAggression:0.025 },
    { iPositionX:1141, iPositionY:2265, iOrientation:333.5, iGunAngleRange:180, iGunAngleOffset: 0, iAggression:0.025 },
    { iPositionX:1285, iPositionY:2709, iOrientation: 26.5, iGunAngleRange:180, iGunAngleOffset: 0, iAggression:0.025 },
    { iPositionX:1285, iPositionY:2804, iOrientation:153.5, iGunAngleRange:180, iGunAngleOffset: 0, iAggression:0.025 },
    { iPositionX: 906, iPositionY:3184, iOrientation:333.5, iGunAngleRange:180, iGunAngleOffset: 0, iAggression:0.025 },
    { iPositionX:1153, iPositionY:3234, iOrientation: 28,   iGunAngleRange:180, iGunAngleOffset: 0, iAggression:0.025 },
    { iPositionX:1224, iPositionY:3593, iOrientation:333.5, iGunAngleRange:180, iGunAngleOffset: 0, iAggression:0.025 },
    { iPositionX:1152, iPositionY:3753, iOrientation:333.5, iGunAngleRange:180, iGunAngleOffset: 0, iAggression:0.025 },
    { iPositionX:1310, iPositionY:3820, iOrientation:153.5, iGunAngleRange:180, iGunAngleOffset: 0, iAggression:0.025 }
  ],
  sEnemyColor:        "#00ffff",
  sEnemyBulletColor:  "#ff00ff",
  sEnemyExplosion:    "#ffff00",

  // fuel tanks
  aFuelTank:          [
    { iPositionX: 1454, iPositionY: 2376 },
    { iPositionX: 1143, iPositionY: 3021 }
  ],
  sFuelTankColor:     "#ffff00",
  sFuelTankLegs:      "#00ffff",
  sFuelTankLabel:     "#ff00ff",
  sFuelTankExplosion: "#ff0000",

  // doors
  aDoor: [
    { iPositionX:1280, iPositionY: 3492, sDoorColour:"#880088", sKeyColour:"#ffff00",
      aDimensions: [
        [ [0,0],[171,0],[225,28],[171,57],[0,57] ],
        [ [0,0],[156,0],[210,28],[156,57],[0,57] ],
        [ [0,0],[141,0],[195,28],[141,57],[0,57] ],
        [ [0,0],[126,0],[180,28],[126,57],[0,57] ],
        [ [0,0],[111,0],[165,28],[111,57],[0,57] ],
        [ [0,0],[ 96,0],[150,28],[ 96,57],[0,57] ],
        [ [0,0],[ 81,0],[135,28],[ 81,57],[0,57] ],
        [ [0,0],[ 66,0],[120,28],[ 66,57],[0,57] ],
        [ [0,0],[ 51,0],[105,28],[ 51,57],[0,57] ],
        [ [0,0],[ 36,0],[ 90,28],[ 36,57],[0,57] ],
        [ [0,0],[ 20,0],[ 75,28],[ 20,57],[0,57] ],
        [ [0,0],[  6,0],[ 60,28],[  6,57],[0,57] ]
      ],
      aKeyholes: [ [1430,3432], [1183,3667 ] ]
    }
  ],

  // level colours
  sEndColorTop:       "#ff0000",
  sEndColorMiddle:    "#00ffff",
  sEndColorBottom:    "#ffff00",

  // restart positions
  aRestartPositions:  [
    { iYPos: 2300, iShipX: 1230, iShipY: 2300, bPodConnected: false },
    { iYPos: 2850, iShipX: 1160, iShipY: 2850, bPodConnected: false },
    { iYPos: 3175, iShipX: 1010, iShipY: 3175, bPodConnected: false },
    { iYPos: 3630, iShipX: 1320, iShipY: 3630, bPodConnected: false },
    { iYPos: 3175, iShipX: 1010, iShipY: 3175, bPodConnected:  true },
    { iYPos: 2850, iShipX: 1160, iShipY: 2850, bPodConnected:  true },
    { iYPos: 2300, iShipX: 1230, iShipY: 2300, bPodConnected:  true }
  ]
}

];

// initialise
$(document).ready(function() {
  // canvas references
  oCTXFuel       = (document.getElementById('thrust_fuel')).getContext('2d');
  oCTXLives      = (document.getElementById('thrust_lives')).getContext('2d');
  oCTXScore      = (document.getElementById('thrust_score')).getContext('2d');
  oCTXCountdown1 = (document.getElementById('thrust_countdown_1')).getContext('2d');
  oCTXCountdown2 = (document.getElementById('thrust_countdown_2')).getContext('2d');
  oCTX           = (document.getElementById('thrust_arena')).getContext('2d');
  oCTX.lineWidth = 1.5;

  // internet explorer message
  if (bIE == true) {
    IEWarning();
  }

  // load any cookie info
  InitCookie();

  // start the clock!
  sState = "KeySelect";
  CreateGame();
  Timer(true);
});

function BindStartGameKey() {
    $(document).unbind().bind("keydown", function(e) {
        var iKeyCode = (e.charCode || e.keyCode);
        switch (iKeyCode) {
            case 27:
                clearTimeout(iPauseTimer);
                clearTimeout(iKeySelectAnim);
                $(document).unbind();
                iEditKeyPos = 0;
                sState = "DoNothing";
                EditKeys();
                break;
            case 32:
            case 67:
                e.preventDefault();
                clearTimeout(iPauseTimer);
                clearTimeout(iKeySelectAnim);
                $(document).unbind();
                if (iKeyCode == 32) {
                    bTracers = false;
                    bUnlimitedFuel = false;
                    bUnlimitedLives = false;
                    $("#thrust_cheat").slideUp();
                } else {
                    bTracers = $("#thrust_tracers").attr("checked");
                    bUnlimitedFuel = $("#thrust_unlimfuel").attr("checked");
                    bUnlimitedLives = $("#thrust_unlimlives").attr("checked");
                    $("#thrust_cheat").slideDown();
                }
                sState = "StartNewGame";
                break;
        }
    });
}

function CalculatePoint(iAngle, iRadius) {
  iAngle = DegreesToRadians(iAngle);
  return { iX: (Math.cos(iAngle) * iRadius), iY: (Math.sin(iAngle) * iRadius) };
}

function Cheat(sName, vValue, oEvent) {
    switch (sName) {
        case "fuel":
            bUnlimitedFuel = $(vValue).attr("checked");
            break;
        case "level":
            oGame.LoadLevel( parseInt($("#thrust_level").val()) );
            $("#thrust_level option:eq(0)").attr("selected", true);
            oGame.oArena = new Arena();
            oGame.StartNewLife();
            break;
        case "lives":
            bUnlimitedLives = $(vValue).attr("checked");
            break;
        case "tracers":
            bTracers = $(vValue).attr("checked");
            break;
    }
    $("#thrust_level").blur();
}

function CheckHighScore(bQuit) {
     $("#thrust_cheat").slideUp();
    if (($("#thrust_cheat").css("display") != "block") && (oGame.iScore > aHighScores[aHighScores.length - 1].iScore )) {
        clearTimeout(iPauseTimer);

        // add new high score
        iHighScoreID++;
        var oHS = { iID    : iHighScoreID,
                    sName  : "",
                    sScore : "    " + oGame.iScore,
                    iScore : oGame.iScore };
        oHS.sScore = oHS.sScore.substr(oHS.sScore.length - 8);

        // push to, sort and truncate table
        aHighScores.push(oHS);
        aHighScores.sort(function(a,b) { return b.iScore - a.iScore } );
        aHighScores = aHighScores.slice(0,8);

        // display submit page
        sState = "HighScoreEdit";
    } else {
        if (bQuit == true) {
            sState = "HighScoreTable";
        } else {
            SetPause("HighScoreTable", 3000);
        }
    }
}

function CheckIntersect(iA1X, iA1Y, iA2X, iA2Y, iB1X, iB1Y, iB2X, iB2Y) {
	var iVectorA = (iB2X - iB1X) * (iA1Y - iB1Y) - (iB2Y - iB1Y) * (iA1X - iB1X);
	var iVectorB = (iA2X - iA1X) * (iA1Y - iB1Y) - (iA2Y - iA1Y) * (iA1X - iB1X);
	var iVectorC  = (iB2Y - iB1Y) * (iA2X - iA1X) - (iB2X - iB1X) * (iA2Y - iA1Y);

	if (iVectorC != 0) {
		var iIntersectA = iVectorA / iVectorC;
		var iIntersectB = iVectorB / iVectorC;
		if ((0 <= iIntersectA) && (iIntersectA <= 1) && (0 <= iIntersectB) && (iIntersectB <= 1)) {
		  return [ true, (iA1X + iIntersectA * ( iA2X - iA1X )), (iA1Y + iIntersectA * ( iA2Y - iA1Y )) ];
		}
	}
	return [ false ];
}

function CheckIntersectCircle(iCircleX, iCircleY, iRadius, iA1X, iA1Y, iA2X, iA2Y) {
  iRadius++; // take into account stroke width
  var iVectorA = ((iA2X - iA1X) * (iA2X - iA1X) + (iA2Y - iA1Y) * (iA2Y - iA1Y));
  var iVectorB = 2 * ((iA2X - iA1X) * (iA1X - iCircleX) + (iA2Y - iA1Y) * (iA1Y - iCircleY));
  var iVectorC = ((iCircleX * iCircleX) + (iCircleY * iCircleY) + (iA1X * iA1X) + (iA1Y * iA1Y) -
                  2 * (iCircleX * iA1X + iCircleY * iA1Y) - (iRadius * iRadius));
  var iDeter = (iVectorB * iVectorB - 4 * iVectorA * iVectorC);
  if (iDeter > 0) {
    var e = Math.sqrt(iDeter);
    var u1 = (-iVectorB + e) / (2 * iVectorA);
    var u2 = (-iVectorB - e) / (2 * iVectorA);
    if (0 <= u1 && u1 <= 1) {
      return [ true, (iA1X + (iA2X - iA1X) * u1), (iA1Y + (iA2Y - iA1Y) * u1) ];
    }
    if (0 <= u2 && u2 <= 1) {
      return [ true, (iA1X + (iA2X - iA1X) * u2), (iA1Y + (iA2Y - iA1Y) * u2) ];
    }
  }
  return [ false ];
}

function CreateGame() {
  oGame = new Game();
  oGame.LoadLevel(1);
  oGame.oArena = new Arena();
}

function DegreesToRadians(iDegrees) {
  return (Math.PI / 180) * (iDegrees - 90);
}

function Distance(iAX, iAY, iBX, iBY) {
  return Math.sqrt(Math.pow(Math.abs(iAX - iBX), 2) + Math.pow(Math.abs(iAY - iBY), 2));
}

function EditKeyAdd(iKeyCode) {
    var aName = ["CCW","CW","Fire","Thrust","Shield","Pause","Quit"];
    var sKeyCode = "           ";

    // look for named keys
    switch (iKeyCode) {
        case 8:
            sKeyCode = "backspace" + sKeyCode;
            break;
        case 9:
            sKeyCode = "tab" + sKeyCode;
            break;
        case 13:
            sKeyCode = "enter" + sKeyCode;
            break;
        case 16:
            sKeyCode = "shift" + sKeyCode;
            break;
        case 17:
            sKeyCode = "ctrl" + sKeyCode;
            break;
        case 20:
            sKeyCode = "caps lock" + sKeyCode;
            break;
        case 27:
            sKeyCode = "escape" + sKeyCode;
            break;
        case 32:
            sKeyCode = "space" + sKeyCode;
            break;
        case 45:
            sKeyCode = "insert" + sKeyCode;
            break;
        case 46:
            sKeyCode = "delete" + sKeyCode;
            break;
        default:
            sKeyCode = String.fromCharCode(iKeyCode).toLowerCase() + sKeyCode;
    }

    // update settings
    oGameSettings["i" + aName[iEditKeyPos]] = iKeyCode;
    oGameSettings["s" + aName[iEditKeyPos]] = sKeyCode.substr(0,11);
}

function EditKeys() {
    var sMessage = "#ffff00 edit keys#ff00ff \n\n";
    sMessage += "                        player:         default:   \n";

    // ccw
    if (iEditKeyPos == 0) {
        sMessage += "#ffffff          rotate left:  _          ";
    } else {
        sMessage += "#00ffff          rotate left:  " + oGameSettings.sCCW;
    }
    sMessage += "     z          \n";

    // cw
    if (iEditKeyPos == 1) {
        sMessage += "#ffffff         rotate right:  _          ";
    } else {
        if (iEditKeyPos < 1) {
            sMessage += "#00ffff         rotate right:             ";
        } else {
            sMessage += "#00ffff         rotate right:  " + oGameSettings.sCW;
        }
    }
    sMessage += "     x          \n";

    // fire
    if (iEditKeyPos == 2) {
        sMessage += "#ffffff                 fire:  _          ";
    } else {
        if (iEditKeyPos < 2) {
            sMessage += "#00ffff                 fire:             ";
        } else {
            sMessage += "#00ffff                 fire:  " + oGameSettings.sFire;
        }
    }
    sMessage += "     enter      \n";

    // thrust
    if (iEditKeyPos == 3) {
        sMessage += "#ffffff               thrust:  _          ";
    } else {
        if (iEditKeyPos < 3) {
            sMessage += "#00ffff               thrust:             ";
        } else {
            sMessage += "#00ffff               thrust:  " + oGameSettings.sThrust;
        }
    }
    sMessage += "     shift      \n";

    // shield
    if (iEditKeyPos == 4) {
        sMessage += "#ffffffshield / tractor beam:  _          ";
    } else {
        if (iEditKeyPos < 4) {
            sMessage += "#00ffffshield / tractor beam:             ";
        } else {
            sMessage += "#00ffffshield / tractor beam:  " + oGameSettings.sShield;
        }
    }
    sMessage += "     space      \n";

    // pause
    if (iEditKeyPos == 5) {
        sMessage += "#ffffff      pause / unpause:  _          ";
    } else {
        if (iEditKeyPos < 5) {
            sMessage += "#00ffff      pause / unpause:             ";
        } else {
            sMessage += "#00ffff      pause / unpause:  " + oGameSettings.sPause;
        }
    }
    sMessage += "     p          \n";

    // quit
    if (iEditKeyPos == 6) {
        sMessage += "#ffffff            quit game:  _          ";
    } else {
        if (iEditKeyPos < 6) {
            sMessage += "#00ffff            quit game:             ";
        } else {
            sMessage += "#00ffff            quit game:  " + oGameSettings.sQuit;
        }
    }
    sMessage += "     escape     \n";
    ShowMessage(sMessage);

    // key handler
    $(document).unbind().bind("keydown", function(e) {
        e.preventDefault();

        // check if the key is valid, unique
        var iKeyCode = (e.charCode || e.keyCode);
        if ((iEditKeyPos < 8) && ($.inArray(iKeyCode, aEditKeyCodes) < 0)) {
            aEditKeyCodes.push(iKeyCode);
            EditKeyAdd(iKeyCode);
            iEditKeyPos++;

            if (iEditKeyPos == 7) {
                // save keys to cookie
                $.Jookie.Set("thrust", "iCW", oGameSettings.iCW);
                $.Jookie.Set("thrust", "iCCW", oGameSettings.iCCW);
                $.Jookie.Set("thrust", "iFire", oGameSettings.iFire);
                $.Jookie.Set("thrust", "iPause", oGameSettings.iPause);
                $.Jookie.Set("thrust", "iQuit", oGameSettings.iQuit);
                $.Jookie.Set("thrust", "iShield", oGameSettings.iShield);
                $.Jookie.Set("thrust", "iThrust", oGameSettings.iThrust);

                $.Jookie.Set("thrust", "sCW", oGameSettings.sCW);
                $.Jookie.Set("thrust", "sCCW", oGameSettings.sCCW);
                $.Jookie.Set("thrust", "sFire", oGameSettings.sFire);
                $.Jookie.Set("thrust", "sPause", oGameSettings.sPause);
                $.Jookie.Set("thrust", "sQuit", oGameSettings.sQuit);
                $.Jookie.Set("thrust", "sShield", oGameSettings.sShield);
                $.Jookie.Set("thrust", "sThrust", oGameSettings.sThrust);

                // go back to start screen
                aEditKeyCodes = [];
                $(document).unbind();
                SetPause("KeySelect", 1200);
            }

            // redraw
            EditKeys();
        }
    });

}

function HighScoreEdit() {
  UpdateStatus(" ", "countdown");
  var sMessage = "#ff0000congratulations\n\n#ffff00";
  for (var i = 0; i < aHighScores.length; i++) {
    sMessage += " " + (i + 1) + ". " + aHighScores[i].sScore + "  ";
    if (aHighScores[i].iID == iHighScoreID) {
        if (aHighScores[i].sName.length > 0) {
            sMessage += oGame.oLevel.sEndColorMiddle + aHighScores[i].sName + "#ffff00";
            if (aHighScores[i].sName.length < iHighScoreMaxNameLength) {
                sMessage += "_";
                for (var iSpace = aHighScores[i].sName.length + 1; iSpace < iHighScoreMaxNameLength; iSpace++) {
                    sMessage += " ";
                }
            }
        } else {
            sMessage += "_          ";
        }
    } else {
        sMessage += aHighScores[i].sName;
    }
    sMessage += " \n";
  }
  ShowMessage(sMessage + "\n" + oGame.oLevel.sEndColorMiddle + "please enter your name\n\n");

  // bind keys
  $(document)
    .unbind()
    .bind("keydown", function(e) {
        e.preventDefault();

        // find the entry we are looking for
        for (var i = 0; i < aHighScores.length; i++) {
            if (aHighScores[i].iID == iHighScoreID) {
                break;
            }
        }

        // handle keypress
        var iCode = e.charCode || e.keyCode;
        switch (iCode) {
            case 8:
                if (aHighScores[i].sName.length > 0) {
                    aHighScores[i].sName = aHighScores[i].sName.substr(0, aHighScores[i].sName.length - 1);
                }
                break;
            case 13:
                aHighScores[i].sName += "           ";
                aHighScores[i].sName = aHighScores[i].sName.substr(0, iHighScoreMaxNameLength);
                $.Jookie.Set("thrust", "aHS", aHighScores.slice());
                sState = "HighScoreTable";
                break;
            default:
                var sCharacter = String.fromCharCode(iCode).toLowerCase();
                if (((sCharacter == " ") || (typeof oAlphabet[sCharacter] != "undefined")) && (aHighScores[i].sName.length < iHighScoreMaxNameLength)) {
                    aHighScores[i].sName += sCharacter;
                }
        }
        HighScoreEdit();
  });
}

function HighScoreTable() {
  UpdateStatus(" ", "countdown");
  var sMessage = "\n#00ff00top eight thrusters\n\n#ffff00";
  for (var i = 0; i < aHighScores.length; i++) {
    sMessage += " " + (i + 1) + ". " + aHighScores[i].sScore + "  " + aHighScores[i].sName + " \n";
  }
  ShowMessage(sMessage + "\n#ffffffpress the space bar to start / press c to cheat\n#888888press escape to change keys\n\n");
  BindStartGameKey();
}

function IEWarning() {
  var sHTML = "<div id=\"thrust_ie\"><h1>I'm sorry, this game really doesn't like your web browser.<\/h1>" +
              "I'm not a Microsoft h8r, it's just that Internet Explorer doesn't natively support " +
              "the &lt;canvas&gt; tag that this game uses.<br \/>Try playing this using " +
              "<a href=\"http://www.google.com/chrome\" target=\"_blank\">Google Chrome<\/a>, " +
              "<a href=\"http://www.getfirefox.com/\" target=\"_blank\">Firefox<\/a>, " +
              "<a href=\"http://www.opera.com/\" target=\"_blank\">Opera<\/a> or " +
              "<a href=\"http://www.apple.com/safari/\" target=\"_blank\">Safari<\/a>" +
              " - it's fun, I promise.<br \/>If you must continue and you're using IE8, at least switch Compatibility View on.<\/div>";
  $("#volumecontrol").parent().prepend(sHTML);
}

function InitCookie() {
    $.Jookie.Initialise("thrust", 525600);

    // key codes
    oGameSettings.iCW     = $.Jookie.Get("thrust", "iCW") || 88;
    oGameSettings.iCCW    = $.Jookie.Get("thrust", "iCCW") || 90;
    oGameSettings.iFire   = $.Jookie.Get("thrust", "iFire") || 13;
    oGameSettings.iPause  = $.Jookie.Get("thrust", "iPause") || 80;
    oGameSettings.iQuit   = $.Jookie.Get("thrust", "iQuit") || 27;
    oGameSettings.iShield = $.Jookie.Get("thrust", "iShield") || 32;
    oGameSettings.iThrust = $.Jookie.Get("thrust", "iThrust") || 16;

    // key descriptions
    oGameSettings.sCW     = (($.Jookie.Get("thrust", "sCW") || "x") + "           ").substr(0,11);
    oGameSettings.sCCW    = (($.Jookie.Get("thrust", "sCCW") || "z") + "           ").substr(0,11);
    oGameSettings.sFire   = (($.Jookie.Get("thrust", "sFire") || "enter") + "           ").substr(0,11);
    oGameSettings.sPause  = (($.Jookie.Get("thrust", "sPause") || "p") + "           ").substr(0,11);
    oGameSettings.sQuit   = (($.Jookie.Get("thrust", "sQuit") || "escape") + "           ").substr(0,11);
    oGameSettings.sShield = (($.Jookie.Get("thrust", "sShield") || "space") + "           ").substr(0,11);
    oGameSettings.sThrust = (($.Jookie.Get("thrust", "sThrust") || "shift") + "           ").substr(0,11);

    // high scores
    var aHS = $.Jookie.Get("thrust", "aHS");
    if (typeof aHS == "object") {
        aHighScores = aHS.slice();
    }
    for (var i = 0; i < aHighScores.length; i++) {
        if (aHighScores[i].iID > iHighScoreID) {
            iHighScoreID = aHighScores[i].iID;
        }
    }
}

function KeySelect() {
  clearTimeout(iKeySelectAnim);

  var sThanks = "                                                    with thanks to chris carline, lee johnson, alex cranstone, anne peattie, ammon torrence and my long suffering missus                                                      ";
  ShowMessage("\n#ff0000          rotate left: #ffff00" + oGameSettings.sCCW + "\n" +
                "#ff0000         rotate right: #ffff00" + oGameSettings.sCW + "\n" +
                "#ff0000                 fire: #ffff00" + oGameSettings.sFire + "\n" +
                "#ff0000               thrust: #ffff00" + oGameSettings.sThrust + "\n" +
                "#ff0000shield / tractor beam: #ffff00" + oGameSettings.sShield + "\n" +
                "#ff0000      pause / unpause: #ffff00" + oGameSettings.sPause + "\n" +
                "#ff0000            quit game: #ffff00" + oGameSettings.sQuit + "\n\n" +
                "#ff00fforiginal game copyright jeremy c smith 1986\n" +
                "#00ff00recreated in javascript by jon combe 24 years later\n\n" +
                "#ffffffpress the space bar to start / press c to cheat\n" +
                "#888888press escape to change keys\n\n" +
                "#00ffff" + sThanks.substr(iKeySelectPos, 52));

  BindStartGameKey();
  iKeySelectPos++;
  if (iKeySelectPos > 168) {
    iKeySelectPos = 0;
    sState = "HighScoreTable";
  } else {
    iKeySelectAnim = setTimeout(KeySelect, 110);
  }
}

function RadiansToDegrees(iRadians) {
  return (iRadians * (180 / Math.PI));
}

function ReactorCountdown() {
  UpdateStatus(oGame.oReactor.iCountdown, "countdown");
  oGame.oReactor.iTimer = (oGame.iAge + 21);

  if (oGame.oReactor.iCountdown > 0) {
    oGame.oReactor.iCountdown--;
    oSound.Play("Countdown");
  } else {
    oGame.oReactor.iTimer += 10000;
    iPlanetExplosionPosition = 1;

    // destroy everything - ship & pod
    oGame.aExplosion.push(new Explosion(oGame.oShip.iPositionX - oGame.oArena.iViewportOffsetX,
                                  oGame.oShip.iPositionY - oGame.oArena.iViewportOffsetY,
                                  "big", oGame.oLevel.sShipExplosion, false));
    oGame.oShip.Die(oGame.oShip.iPositionX, oGame.oShip.iPositionY, true);
    oGame.oPod.bActive = false;
    oGame.aExplosion.push(new Explosion(oGame.oPod.iPositionX - oGame.oArena.iViewportOffsetX,
                                  oGame.oPod.iPositionY - oGame.oArena.iViewportOffsetY,
                                  "big", oGame.oLevel.sShipExplosion, false));

    // enemies
    for (var i = (oGame.aEnemy.length - 1); i >= 0; i--) {
      oGame.aExplosion.push(new Explosion(oGame.aEnemy[i].iPositionX - oGame.oArena.iViewportOffsetX,
                                    oGame.aEnemy[i].iPositionY - oGame.oArena.iViewportOffsetY,
                                    "big", oGame.oLevel.sEnemyExplosion, false));
    }
    oGame.aEnemy = [];

    // fuel tanks
    for (var i = (oGame.aFuelTank.length - 1); i >= 0; i--) {
      oGame.aExplosion.push(new Explosion(oGame.aFuelTank[i].iPositionX - oGame.oArena.iViewportOffsetX,
                                    oGame.aFuelTank[i].iPositionY - oGame.oArena.iViewportOffsetY,
                                    "big", oGame.oLevel.sFuelTankExplosion, false));
    }
    oGame.aFuelTank = [];

    // reactor
    oGame.aExplosion.push(new Explosion(oGame.oReactor.iPositionX - oGame.oArena.iViewportOffsetX,
                                  oGame.oReactor.iPositionY - oGame.oArena.iViewportOffsetY,
                                  "big", oGame.oLevel.sReactorExplosion, false));
    oGame.oReactor.bActive = false;
  }
}

function ReDraw() {
  if (oGame.oShip.bApplyPause != true) {
    oGame.iAge++;

    // clear viewport
    oCTX.clearRect(0, 0, oGame.oArena.iViewportWidth, oGame.oArena.iViewportHeight);

    // reactor countdown
    if ((oGame.oReactor.bCountdown == true) && (oGame.oReactor.iTimer <= oGame.iAge)) {
        ReactorCountdown();
    }

    // planet explosion
    if (iPlanetExplosionPosition > 0) {
        if (iPlanetExplosionPosition < (aPlanetExplosionColours.length - 1)) {
            oCTX.fillStyle = aPlanetExplosionColours[iPlanetExplosionPosition - 1];
            oCTX.fillRect(0, 0, oGame.oArena.iViewportWidth, oGame.oArena.iViewportHeight);
        }
        iPlanetExplosionPosition++;
    }

    // calculate positions
    oGame.oShip.CalculatePosition();
    for (var i = (oGame.aBullet.length - 1); i >= 0; i--) {
      if (oGame.aBullet[i].Expired() == true) {
        oGame.aBullet.splice(i, 1);
      } else {
        oGame.aBullet[i].CalculatePosition();
      }
    }

    // collision detection
    if (oGame.oShip.bActive == true) {

      // player vs. terrain
      for (var i = 0; i < (oGame.oArena.aLandscape.length - 1); i++) {
        var aCollision = oGame.oShip.CollisionDetectLandscape(oGame.oArena.aLandscape[i][0],
                                                              oGame.oArena.aLandscape[i][1],
                                                              oGame.oArena.aLandscape[i + 1][0],
                                                              oGame.oArena.aLandscape[i + 1][1]);
        if (aCollision[0] == true) {
          oGame.oShip.Die((aCollision[1] - oGame.oArena.iViewportOffsetX),
                          (aCollision[2] - oGame.oArena.iViewportOffsetY));
          break;
        }
      }

      // player's ship vs. enemies
      for (var iEnemy = (oGame.aEnemy.length - 1); iEnemy > -1; iEnemy--) {
        var aCollision = oGame.oShip.CollisionDetectLandscape(oGame.aEnemy[iEnemy].oCoordinates.aBody[5][0],
                                                              oGame.aEnemy[iEnemy].oCoordinates.aBody[5][1],
                                                              oGame.aEnemy[iEnemy].oCoordinates.aBody[0][0],
                                                              oGame.aEnemy[iEnemy].oCoordinates.aBody[0][1]);
        if (aCollision[0] == true) {
          oGame.oShip.Die((aCollision[1] - oGame.oArena.iViewportOffsetX),
                          (aCollision[2] - oGame.oArena.iViewportOffsetY));
          break;
        }
      }

      // player's ship vs.reactor
      var aCollision = oGame.oShip.CollisionDetectCircle(oGame.oReactor.iPositionX,
                                                         oGame.oReactor.iPositionY,
                                                         oGame.oReactor.iRadius);
      if (aCollision[0] == true) {
        oGame.oShip.Die((aCollision[1] - oGame.oArena.iViewportOffsetX),
                        (aCollision[2] - oGame.oArena.iViewportOffsetY));
      }

      // player's ship vs. fuel tanks
      for (var iFuelTank = (oGame.aFuelTank.length - 1); iFuelTank >= 0; iFuelTank--) {
        for (var iFuelTankPos = 0; iFuelTankPos < (oGame.aFuelTank[iFuelTank].aPosition.length - 1); iFuelTankPos++) {
          aCollision = oGame.oShip.CollisionDetectLandscape(oGame.aFuelTank[iFuelTank].aPosition[iFuelTankPos][0],
                                                            oGame.aFuelTank[iFuelTank].aPosition[iFuelTankPos][1],
                                                            oGame.aFuelTank[iFuelTank].aPosition[iFuelTankPos + 1][0],
                                                            oGame.aFuelTank[iFuelTank].aPosition[iFuelTankPos + 1][1]);
          if (aCollision[0] == true) {
            oGame.oShip.Die((aCollision[1] - oGame.oArena.iViewportOffsetX),
                            (aCollision[2] - oGame.oArena.iViewportOffsetY));
            break;
          }
        }
      }

      // player's ship vs. doors
      for (var iDoor = 0; iDoor < oGame.aDoor.length; iDoor++) {
        // player's ship vs. keyholes
        for (var iKeyhole = 0; iKeyhole < oGame.aDoor[iDoor].aKeyholes.length; iKeyhole++) {
          var aCollision = oGame.oShip.CollisionDetectCircle(oGame.aDoor[iDoor].aKeyholes[iKeyhole][0],
                                                             oGame.aDoor[iDoor].aKeyholes[iKeyhole][1],
                                                             oGame.aDoor[iDoor].iKeyRadius);
          if (aCollision[0] == true) {
            oGame.oShip.Die((aCollision[1] - oGame.oArena.iViewportOffsetX), (aCollision[2] - oGame.oArena.iViewportOffsetY));
          }

          // pod vs. keyholes
          if (oGame.oShip.bPodConnected == true) {
            if (Distance(oGame.oPod.iPositionX, oGame.oPod.iPositionY,
                         oGame.aDoor[iDoor].aKeyholes[iKeyhole][0], oGame.aDoor[iDoor].aKeyholes[iKeyhole][1]) <=
               (oGame.oPod.iRadius + oGame.aDoor[iDoor].iKeyRadius)) {
              oGame.oShip.Die((oGame.oShip.iPositionX - oGame.oArena.iViewportOffsetX),
                              (oGame.oShip.iPositionY - oGame.oArena.iViewportOffsetY));
            }
          }
        }

        // loop through dimensions
        for (var iDim = 0; iDim < (oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState].length - 1); iDim++) {
          var aCollision = oGame.oShip.CollisionDetectLandscape(
            oGame.aDoor[iDoor].iPositionX + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][iDim][0],
            oGame.aDoor[iDoor].iPositionY + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][iDim][1],
            oGame.aDoor[iDoor].iPositionX + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][iDim + 1][0],
            oGame.aDoor[iDoor].iPositionY + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][iDim + 1][1]
          );
          if (aCollision[0] == true) {
            oGame.oShip.Die((aCollision[1] - oGame.oArena.iViewportOffsetX),
                            (aCollision[2] - oGame.oArena.iViewportOffsetY));
            break;
          }
        }

        var aCollision = oGame.oShip.CollisionDetectLandscape(
          oGame.aDoor[iDoor].iPositionX + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][iDim][0],
          oGame.aDoor[iDoor].iPositionY + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][iDim][1],
          oGame.aDoor[iDoor].iPositionX + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][0][0],
          oGame.aDoor[iDoor].iPositionY + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][0][1]
        );
        if (aCollision[0] == true) {
          oGame.oShip.Die((aCollision[1] - oGame.oArena.iViewportOffsetX),
                          (aCollision[2] - oGame.oArena.iViewportOffsetY));
          break;
        }
      }

      // pod collision detection
      if (oGame.oShip.bPodConnected == true) {
        // pod vs terrain
        for (var i = 0; i < (oGame.oArena.aLandscape.length - 1); i++) {
          var aCollision = CheckIntersectCircle(oGame.oPod.iPositionX, oGame.oPod.iPositionY, oGame.oPod.iRadius,
                                                oGame.oArena.aLandscape[i][0], oGame.oArena.aLandscape[i][1],
                                                oGame.oArena.aLandscape[i + 1][0], oGame.oArena.aLandscape[i + 1][1]);
          if (aCollision[0] == true) {
            oGame.oShip.Die((oGame.oShip.iPositionX - oGame.oArena.iViewportOffsetX), (oGame.oShip.iPositionY - oGame.oArena.iViewportOffsetY));
            break;
          }
        }

        // pod vs enemies
        for (var iEnemy = (oGame.aEnemy.length - 1); iEnemy > -1; iEnemy--) {
          var aCollision = CheckIntersectCircle(oGame.oPod.iPositionX, oGame.oPod.iPositionY, oGame.oPod.iRadius,
                                                oGame.aEnemy[iEnemy].oCoordinates.aBody[5][0],
                                                oGame.aEnemy[iEnemy].oCoordinates.aBody[5][1],
                                                oGame.aEnemy[iEnemy].oCoordinates.aBody[0][0],
                                                oGame.aEnemy[iEnemy].oCoordinates.aBody[0][1]);
          if (aCollision[0] == true) {
            oGame.oShip.Die((oGame.oShip.iPositionX - oGame.oArena.iViewportOffsetX), (oGame.oShip.iPositionY - oGame.oArena.iViewportOffsetY));
            break;
          }
        }

        // pod vs reactor: keep it simple and quick, measure distances between the two...
        if (Distance(oGame.oPod.iPositionX, oGame.oPod.iPositionY, oGame.oReactor.iPositionX, oGame.oReactor.iPositionY) <=
            (oGame.oPod.iRadius + oGame.oReactor.iRadius)) {
          oGame.oShip.Die((oGame.oShip.iPositionX - oGame.oArena.iViewportOffsetX), (oGame.oShip.iPositionY - oGame.oArena.iViewportOffsetY));
        }

        // pod vs fuel tanks
        for (var iFuelTank = (oGame.aFuelTank.length - 1); iFuelTank >= 0; iFuelTank--) {
          for (var iFuelTankPos = 0; iFuelTankPos < (oGame.aFuelTank[iFuelTank].aPosition.length - 1); iFuelTankPos++) {
            aCollision = CheckIntersectCircle(oGame.oPod.iPositionX, oGame.oPod.iPositionY, oGame.oPod.iRadius,
                                              oGame.aFuelTank[iFuelTank].aPosition[iFuelTankPos][0],
                                              oGame.aFuelTank[iFuelTank].aPosition[iFuelTankPos][1],
                                              oGame.aFuelTank[iFuelTank].aPosition[iFuelTankPos + 1][0],
                                              oGame.aFuelTank[iFuelTank].aPosition[iFuelTankPos + 1][1]);
            if (aCollision[0] == true) {
              oGame.oShip.Die((oGame.oShip.iPositionX - oGame.oArena.iViewportOffsetX), (oGame.oShip.iPositionY - oGame.oArena.iViewportOffsetY));
              break;
            }
          }
        }

        // pod vs. doors
        for (var iDoor = 0; iDoor < oGame.aDoor.length; iDoor++) {
          for (var iDim = 0; iDim < (oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState].length - 1); iDim++) {
            var aCollision = CheckIntersectCircle(oGame.oPod.iPositionX, oGame.oPod.iPositionY, oGame.oPod.iRadius,
                                                  oGame.aDoor[iDoor].iPositionX + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][iDim][0],
                                                  oGame.aDoor[iDoor].iPositionY + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][iDim][1],
                                                  oGame.aDoor[iDoor].iPositionX + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][iDim + 1][0],
                                                  oGame.aDoor[iDoor].iPositionY + oGame.aDoor[iDoor].aDimensions[oGame.aDoor[iDoor].iState][iDim + 1][1]);
            if (aCollision[0] == true) {
              oGame.oShip.Die((oGame.oShip.iPositionX - oGame.oArena.iViewportOffsetX), (oGame.oShip.iPositionY - oGame.oArena.iViewportOffsetY));
              break;
            }
          }
        }
      } else {
        // player's ship vs. pod
        var aCollision = oGame.oShip.CollisionDetectCircle(oGame.oPod.iPositionX,
                                                           oGame.oPod.iPositionY,
                                                           oGame.oPod.iRadius);
        if (aCollision[0] == true) {
          oGame.oShip.Die((aCollision[1] - oGame.oArena.iViewportOffsetX), (aCollision[2] - oGame.oArena.iViewportOffsetY));
        }
      }

      // loop through bullets
      for (var iBullet = (oGame.aBullet.length - 1); iBullet > -1; iBullet--) {
        // all bullets vs. terrain
        for (var i = 0; i < (oGame.oArena.aLandscape.length - 1); i++) {
          var aCollision = CheckIntersect(oGame.aBullet[iBullet].iPreviousX, oGame.aBullet[iBullet].iPreviousY,
                                          oGame.aBullet[iBullet].iPositionX, oGame.aBullet[iBullet].iPositionY,
                                          oGame.oArena.aLandscape[i][0], oGame.oArena.aLandscape[i][1],
                                          oGame.oArena.aLandscape[i + 1][0], oGame.oArena.aLandscape[i + 1][1]);
          if (aCollision[0] == true) {
            oGame.aBullet.splice(iBullet, 1);
            break;
          }
        }

        // exit loop now if bullet has expired
        if (oGame.aBullet.length == iBullet) { break }

        // all bullets vs. doors
        for (var i = 0; i < oGame.aDoor.length; i++) {
          for (var iDim = 0; iDim < oGame.aDoor[i].aDimensions[oGame.aDoor[i].iState].length - 1; iDim++) {
            var aCollision = CheckIntersect(oGame.aBullet[iBullet].iPreviousX, oGame.aBullet[iBullet].iPreviousY,
                                            oGame.aBullet[iBullet].iPositionX, oGame.aBullet[iBullet].iPositionY,
                                            (oGame.aDoor[i].iPositionX + oGame.aDoor[i].aDimensions[oGame.aDoor[i].iState][iDim][0]),
                                            (oGame.aDoor[i].iPositionY + oGame.aDoor[i].aDimensions[oGame.aDoor[i].iState][iDim][1]),
                                            (oGame.aDoor[i].iPositionX + oGame.aDoor[i].aDimensions[oGame.aDoor[i].iState][iDim + 1][0]),
                                            (oGame.aDoor[i].iPositionY + oGame.aDoor[i].aDimensions[oGame.aDoor[i].iState][iDim + 1][1]));

            if (aCollision[0] == true) {
              oGame.aBullet.splice(iBullet, 1);
              break;
            }
          }

          // exit loop now if bullet has expired
          if (oGame.aBullet.length == iBullet) { break }

          // bullets vs. keyholes
          for (var iKey = 0; iKey < oGame.aDoor[i].aKeyholes.length; iKey++) {
            var aCollision = CheckIntersectCircle(oGame.aDoor[i].aKeyholes[iKey][0],
                                                  oGame.aDoor[i].aKeyholes[iKey][1],
                                                  oGame.aDoor[i].iKeyRadius + 1,
                                                  oGame.aBullet[iBullet].iPreviousX, oGame.aBullet[iBullet].iPreviousY,
                                                  oGame.aBullet[iBullet].iPositionX, oGame.aBullet[iBullet].iPositionY);

            if (aCollision[0] == true) {
              if (oGame.aBullet[iBullet].bEnemyFire != true) {
                oGame.aDoor[i].OpenDoor();
                oGame.aExplosion.push(new Explosion(aCollision[1] - oGame.oArena.iViewportOffsetX,
                                                    aCollision[2] - oGame.oArena.iViewportOffsetY,
                                                    "small", "#ffff00", true));
              }
              oGame.aBullet.splice(iBullet, 1);
              break;
            }
          }

          // exit loop now if bullet has expired
          if (oGame.aBullet.length == iBullet) { break }
        }

        // exit loop now if bullet has expired
        if (oGame.aBullet.length == iBullet) { break }

        // all bullets vs pod & rod (when connected)
        if (oGame.oShip.bPodConnected == true) {
          // bullets vs. rod
          if (oGame.aBullet[iBullet].bEnemyFire == true) {
            var aCollision = CheckIntersect(oGame.aBullet[iBullet].iPreviousX, oGame.aBullet[iBullet].iPreviousY,
                                            oGame.aBullet[iBullet].iPositionX, oGame.aBullet[iBullet].iPositionY,
                                            oGame.oShip.iPositionX, oGame.oShip.iPositionY,
                                            oGame.oPod.iPositionX, oGame.oPod.iPositionY);
            if (aCollision[0] == true) {
              oGame.aBullet.splice(iBullet, 1);
              oGame.oShip.Die((aCollision[1] - oGame.oArena.iViewportOffsetX),
                              (aCollision[2] - oGame.oArena.iViewportOffsetY));
              oGame.aExplosion.push(new Explosion((oGame.oShip.iPositionX - oGame.oArena.iViewportOffsetX),
                                                  (oGame.oShip.iPositionY - oGame.oArena.iViewportOffsetY),
                                                  "big",
                                                  oGame.oLevel.sShipExplosion, false));
            }

            // exit loop now if bullet has expired
            if (oGame.aBullet.length == iBullet) { break;}
          }

          // bullets vs. pod
          var aCollision = CheckIntersectCircle(oGame.oPod.iPositionX, oGame.oPod.iPositionY, oGame.oPod.iRadius,
                                                oGame.aBullet[iBullet].iPreviousX, oGame.aBullet[iBullet].iPreviousY,
                                                oGame.aBullet[iBullet].iPositionX, oGame.aBullet[iBullet].iPositionY);
          if (aCollision[0] == true) {
            oGame.aBullet.splice(iBullet, 1);
            oGame.oShip.Die((oGame.oShip.iPositionX - oGame.oArena.iViewportOffsetX),
                            (oGame.oShip.iPositionY - oGame.oArena.iViewportOffsetY));
          }

          // exit loop now if bullet has expired
          if (oGame.aBullet.length == iBullet) { break;}
        }

        if (oGame.aBullet[iBullet].bEnemyFire == true) {
          // enemy bullets vs. player's ship
          if (oGame.oShip.bApplyShield != true) {
            var aCollision = oGame.oShip.CollisionDetectBullet(oGame.aBullet[iBullet].iPreviousX,
                                                         oGame.aBullet[iBullet].iPreviousY,
                                                         oGame.aBullet[iBullet].iPositionX,
                                                         oGame.aBullet[iBullet].iPositionY);
            if (aCollision[0] == true) {
              oGame.oShip.Die((aCollision[1] - oGame.oArena.iViewportOffsetX), (aCollision[2] - oGame.oArena.iViewportOffsetY));
              oGame.aBullet.splice(iBullet, 1);
              break;
            }
          }
        } else {
          // player's bullets vs. enemies
          for (var iEnemy = (oGame.aEnemy.length - 1); iEnemy > -1; iEnemy--) {
            var aCollision = oGame.aEnemy[iEnemy].CheckIntersect(oGame.aBullet[iBullet].iPreviousX,
                                                                 oGame.aBullet[iBullet].iPreviousY,
                                                                 oGame.aBullet[iBullet].iPositionX,
                                                                 oGame.aBullet[iBullet].iPositionY);
            if (aCollision[0] == true) {
              oGame.aEnemy.splice(iEnemy, 1);
              oGame.oLevel.aEnemy.splice(iEnemy, 1);
              oGame.aBullet.splice(iBullet, 1);
              oGame.aExplosion.push(new Explosion(aCollision[1] - oGame.oArena.iViewportOffsetX,
                                                  aCollision[2] - oGame.oArena.iViewportOffsetY,
                                                  "big", oGame.oLevel.sEnemyExplosion, true));
              oGame.UpdateScore(750);
              break;
            }
          }

          // exit loop now if bullet has expired
          if (oGame.aBullet.length == iBullet) { break;}

          // player's bullets vs.reactor
          var aCollision = CheckIntersectCircle(oGame.oReactor.iPositionX, oGame.oReactor.iPositionY, 20,
                                                oGame.aBullet[iBullet].iPreviousX, oGame.aBullet[iBullet].iPreviousY,
                                                oGame.aBullet[iBullet].iPositionX, oGame.aBullet[iBullet].iPositionY);
          if (aCollision[0] == true) {
            oGame.aBullet.splice(iBullet, 1);
            oGame.oReactor.Damage();
            oGame.aExplosion.push(new Explosion(aCollision[1] - oGame.oArena.iViewportOffsetX,
                                                aCollision[2] - oGame.oArena.iViewportOffsetY,
                                                "small", oGame.oLevel.sReactorExplosion, true));
          }

          // exit loop now if bullet has expired
          if (oGame.aBullet.length == iBullet) { break;}

          // player's bullets vs. fuel tanks
          for (var iFuelTank = (oGame.aFuelTank.length - 1); iFuelTank >= 0; iFuelTank--) {
            var aCollision = oGame.aFuelTank[iFuelTank].CheckIntersect(oGame.aBullet[iBullet].iPreviousX,
                                                                 oGame.aBullet[iBullet].iPreviousY,
                                                                 oGame.aBullet[iBullet].iPositionX,
                                                                 oGame.aBullet[iBullet].iPositionY);
            if (aCollision[0] == true) {
              oGame.aFuelTank.splice(iFuelTank, 1);
              oGame.oLevel.aFuelTank.splice(iFuelTank, 1);
              oGame.aBullet.splice(iBullet, 1);
              oGame.aExplosion.push(new Explosion(aCollision[1] - oGame.oArena.iViewportOffsetX,
                                                  aCollision[2] - oGame.oArena.iViewportOffsetY,
                                                  "big", oGame.oLevel.sFuelTankExplosion, true));
              break;
            }
          }
        }
      }
    }

    // draw explosions, removing those that have expired
    for (var i = (oGame.aExplosion.length - 1); i > -1; i--) {
      if (oGame.aExplosion[i].aParticles.length == 0) {
        oGame.aExplosion.splice(i, 1);
      } else {
        oGame.aExplosion[i].Draw();
      }
    }

    // draw enemies and fire their guns
    for (var i = (oGame.aEnemy.length - 1); i >= 0; i--) {
      oGame.aEnemy[i].Draw();
      oGame.aEnemy[i].Fire();
    }

    // draw fuel tanks, remove empty ones, refuel
    var iActiveTanks = 0;
    for (var i = (oGame.aFuelTank.length - 1); i >= 0; i--) {
      if (oGame.aFuelTank[i].iFuelLoad > 0) {
        oGame.aFuelTank[i].Draw();
        if ((oGame.oShip.bApplyShield == true) && (oGame.oShip.bPodConnected == false) && (oGame.aFuelTank[i].WithinZone(oGame.oShip.iPositionX, oGame.oShip.iPositionY))) {
          oGame.oShip.bRefuelling = true;
          oGame.aFuelTank[i].iFuelLoad -= 12;
          oGame.iFuel += 12;
          iActiveTanks++
        }
      } else {
        oSound.Play("Refuel");
        oGame.aFuelTank.splice(i, 1);
        oGame.oLevel.aFuelTank.splice(i, 1);
        oGame.oShip.bRefuelling = false;
        oGame.UpdateScore(300);
      }
    }
    if (iActiveTanks == 0) {
      oGame.oShip.bRefuelling = false;
    }

    // draw reactor
    oGame.oReactor.Draw();

    // draw ship
    oGame.oShip.ScrollViewport();
    oGame.oShip.Draw();

    // pod interaction
    if (oGame.oShip.bPodConnected != true) {
      if (oGame.oShip.bApplyShield == true) {
        if (Distance(oGame.oShip.iPositionX, oGame.oShip.iPositionY, oGame.oPod.iPositionX, oGame.oPod.iPositionY) < (oGame.oShip.iRodLength - 3)) {
          oGame.oShip.bPodInitiate = true;
        }
        if (oGame.oShip.bPodInitiate == true) {
          oGame.oShip.DrawPodRod();
          if (Distance(oGame.oShip.iPositionX, oGame.oShip.iPositionY, oGame.oPod.iPositionX, oGame.oPod.iPositionY) >= oGame.oShip.iRodLength) {
            oGame.oShip.bPodConnected = true;
            oGame.oShip.bPodInitiate = false;
            oGame.oPod.iVectorY = 3;
          }
        }
      } else {
        oGame.oShip.bPodInitiate = false;
      }
    }

    // draw bullets
    for (var i = (oGame.aBullet.length - 1); i >= 0; i--) {
      oGame.aBullet[i].Draw();
    }

    // draw terrain and doors
    oGame.oArena.DrawStars();
    var bInvisibleTerrain = true;
    if (iPlanetExplosionPosition < (aPlanetExplosionColours.length - 1)) {
        if ((oGame.bInvisibleTerrain == false) || ((oGame.bInvisibleTerrain == true) && (oGame.oShip.bApplyShield == true))) {
            bInvisibleTerrain = false;
        }
    }

    // position and draw doors
    for (var i = 0; i < oGame.aDoor.length; i++) {
        oGame.aDoor[i].UpdatePositionAndDraw(bInvisibleTerrain);
    }

    // draw planet
    oGame.oArena.DrawLandscape(bInvisibleTerrain);
  }
}

function RotateObject(iX, iY, iOrientation, iPositionX, iPositionY) {
  var iRadius = Math.sqrt(Math.pow((-iX), 2) + Math.pow((-iY), 2));
  var iAngle = (Math.atan2(iX, iY) + iOrientation);
  return [ (iPositionX + iRadius * Math.cos(iAngle)), (iPositionY + iRadius * Math.sin(iAngle)) ];
}

function SetPause(sAction, iMilliseconds) {
  clearTimeout(iPauseTimer);
  iPauseTimer = setTimeout(function() { sState = sAction }, iMilliseconds);
}

function ShowMessage(sMessage) {
  // clear viewport
  oCTX.clearRect(0, 0, oGame.oArena.iViewportWidth, oGame.oArena.iViewportHeight);

  // split lines
  var aMessage = sMessage.split("\n");
  iMessageHeight = ((aMessage.length - 0.5) * (TEXT_HEIGHT * LINE_SPACING));
  var iYPos = ((oGame.oArena.iViewportHeight / 2) - (iMessageHeight / 2));

  // display message
  for (var i = 0; i < aMessage.length; i++) {
    TextSentence(aMessage[i], (oGame.oArena.iViewportWidth / 2), iYPos, "center", oCTX);
    iYPos += (TEXT_HEIGHT * LINE_SPACING);
  }
}

function Thrust() {
  if (sState == "InFlight") {
      ReDraw();
  } else {
    switch (sState) {
      case "BlackHole":
        oGame.DrawBlackHole();
        break;
      case "CheckLevelMessage":
          switch (oGame.iVisibleLevel) {
              case 7:
                  sState = "DoNothing";
                  ShowMessage("#00ff00reverse gravity", oCTX);
                  SetPause("StartNewLife", 3000);
                  break;
              case 13:
                  sState = "DoNothing";
                  ShowMessage("#00ff00normal gravity\n\ninvisible planet", oCTX);
                  SetPause("StartNewLife", 3000);
                  break;
              case 19:
                  sState = "DoNothing";
                  ShowMessage("#00ff00reverse gravity\n\ninvisible planet", oCTX);
                  SetPause("StartNewLife", 3000);
                  break;
              default:
                  sState = "StartNewLife";
          }
        break;
      case "GameOver":
        sState = "DoNothing";
        ShowMessage((oGame.iFuel > 0 ? "#00ff00game over\n\n" : "#ff0000out of fuel\n\n#00ff00game over\n\n"), oCTX);
        CheckHighScore();
        break;
      case "HighScoreEdit":
        sState = "DoNothing";
        HighScoreEdit();
        break;
      case "HighScoreTable":
        sState = "DoNothing";
        SetPause("KeySelect", 12000);
        HighScoreTable();
        break;
      case "KeySelect":
        sState = "DoNothing";
        KeySelect();
        break;
      case "MissionComplete":
        $(document).unbind();
        UpdateStatus(" ", "countdown");
        oGame.LoadLevel(oGame.iVisibleLevel + 1);
        SetPause("MissionCompleteMessage", 1200);
        sState = "DoNothing";
        break;
      case "MissionCompleteMessage":
        UpdateStatus(" ", "countdown");
        SetPause("CheckLevelMessage", 3000);
        sState = "DoNothing";

        // create message
        if (oGame.oReactor.iCountdown < 10) {
          var sMessage = (aLevelInfo[oGame.iPreviousLevel - 1].sEndColorTop +
                          "planet destroyed\n\n" + aLevelInfo[oGame.iPreviousLevel - 1].sEndColorMiddle +
                          " mission  " + aLevelInfo[oGame.iPreviousLevel - 1].sEndColorBottom +
                          (oGame.iVisibleLevel - 1).toString() +
                          aLevelInfo[oGame.iPreviousLevel - 1].sEndColorMiddle + "  complete");
        } else {
          var sMessage = (aLevelInfo[oGame.iPreviousLevel - 1].sEndColorMiddle +
                          " mission  " + aLevelInfo[oGame.iPreviousLevel - 1].sEndColorBottom +
                          (oGame.iVisibleLevel - 1).toString() +
                          aLevelInfo[oGame.iPreviousLevel - 1].sEndColorMiddle + "  complete");
        }
        if (iBonusScore > 0) {
          sMessage += (aLevelInfo[oGame.iPreviousLevel - 1].sEndColorBottom + " \n\nbonus " + iBonusScore + "\n\n");
          oGame.UpdateScore(iBonusScore);
          iBonusScore = 0;
        } else {
          sMessage += " \n\n";
        }
        ShowMessage(sMessage, oCTX);
        break;
      case "MissionFailed":
        UpdateStatus(" ", "countdown");
        oGame.LoadLevel(oGame.iVisibleLevel);
        SetPause("MissionFailedMessage", 1200);
        sState = "DoNothing";
        break;
      case "MissionFailedMessage":
        SetPause("CheckLevelMessage", 3000);
        sState = "DoNothing";
        ShowMessage(aLevelInfo[oGame.iPreviousLevel - 1].sEndColorTop + "planet destroyed\n\n" +
                    aLevelInfo[oGame.iPreviousLevel - 1].sEndColorMiddle + "mission  " +
                    aLevelInfo[oGame.iPreviousLevel - 1].sEndColorBottom + (oGame.iVisibleLevel - 1).toString() +
                    aLevelInfo[oGame.iPreviousLevel - 1].sEndColorMiddle + "  failed\n\n" +
                    aLevelInfo[oGame.iPreviousLevel - 1].sEndColorBottom + "no bonus\n\n", oCTX);
        break;
      case "MissionIncomplete":
        SetPause("MissionIncompleteMessage", 1200);
        sState = "DoNothing";
        break;
      case "MissionIncompleteMessage":
        SetPause("StartNewLife", 3000);
        sState = "DoNothing";
        ShowMessage(aLevelInfo[oGame.iVisibleLevel - 1 || 0].sEndColorMiddle + "mission incomplete\n\n", oCTX);
        break;
      case "StartNewGame":
        CreateGame();
        sState = "StartNewLife";
        break;
      case "StartNewLife":
        oGame.StartNewLife();
        break;
    }
  }
}

function Timer(bStart) {
  clearTimeout(iTimer);
  if (bStart == true) {
    iTimer = setInterval(Thrust, 50);
  }
}

function UpdateStatus(iValue, sSection) {
    switch (sSection) {
        case "countdown":
            oCTXCountdown1.clearRect(0, 0, 40, 12);
            oCTXCountdown2.clearRect(0, 0, 40, 12);
            TextSentence("#00ff00" + iValue, 20, 0, "center", oCTXCountdown1);
            TextSentence("#00ff00" + iValue, 20, 0, "center", oCTXCountdown2);
            break;
        case "fuel":
            oCTXFuel.clearRect(0, 0, 150, 12);
            TextSentence("#ffff00" + iValue, 1, 0, "left", oCTXFuel);
            break;
        case "lives":
            oCTXLives.clearRect(0, 0, 90, 12);
            TextSentence("#ffff00" + iValue, 45, 0, "center", oCTXLives);
            break;
        case "score":
            oCTXScore.clearRect(0, 0, 200, 12);
            TextSentence("#ffff00" + iValue, 200, 0, "right", oCTXScore);
            break;
    }
}
