const LEVELS = [
  [
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                pp          pppppp                                                              ",
    "                                                                rr pp       rrrrrr                                                              ",
    "                                               ss   ss     s       rr                                                                                                ",
    "                                           pppppppppppppppppppp                                                                                                                ",
    "                                     pp                        ppp          ppppppppp                                                                               ",
    "                                pp                                ppppppppppppppppppp     pp     ppp                                                                                   ",
    "                           pp                                                                                                     ",
    "                      pp                    ss     s    s      c                                                                                                       ",
    "                 pp          ppppppppppppppppppppppppppppppppppppppppppppppppppppppppp             ",
    "       pppppppssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss                          @",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "                                                                                                                                        ",
    "                                                                                                                                        ",
    "                                                                    p       p                                                           ",
    "                                                                    r       r                ppp          c                             ",
    "                                                                s       s       s                                                       ",
    "                                                                p       p       p       ppp  sss          s           ss               @",
    "                                                        pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp",
    "                                                                                                                                        ",
    "                                                   ppp                                                                                  ",
    "                                               c                                                                                        ",
    "                             c                ppp                                                                                       ",
    "                                                                                                                                       ",
    "                      s      ss          pppssssssssssssssssss                                                                          ",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                                                                          ",
  ]

];

const levelConf = {
  width: 64,
  height: 64,
  b: () => [sprite("lvl1_platform"), solid(), area(), "block"],
  p: () => [sprite("lvl1_platform"), solid(), area(), "platform"],
  s: () => [sprite("lvl1_spike"), area(), "spike"],
  r: () => [sprite("lvl1_spike", { flipY: true }), area(), "spike"],
  c: () => [sprite("coin", {width:64, height:64}), area(), 'coin'],
  "@": () => [
    sprite("portal", {
      height: height(),
      width: 50,
    }),
    solid(),
    area({ scale: 0.5 }),
    origin("center"),
    "portal",
  ],
};
