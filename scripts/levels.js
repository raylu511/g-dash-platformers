
const LEVELS = [
    [
      "                                                                                                                                        ",
      "                                                                                                                                        ",
      "                                                                    p       p                                                           ",
      "                                                                    r       r                                                           ",
      "                                                                s       s       s                                                       ",
      "                                                                p       p       p                                                      @",
      "                                                        pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp",
      "                                                                                                                                        ",
      "                                                   ppp                                                                                  ",
      "                                                                                                                                        ",
      "                                              ppp                                                                                       ",
      "                                                                                                                                        ",
      "                      s      ss          pppssssssssssssssssss                                                                          ",
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                                                                          ",
    ],
    [
      "                                                                                                                                        ",
      "                                                                                                                                        ",
      "                                                                                                                                        ",
      "                                                                                                                                        ",
      "                                                                                                                                        ",
      "                                                                                                                                        ",
      "                                                                                                                                        ",
      "                                                                                                                                        ",
      "                                                                                                                                        ",
      "                                                                                                                                        ",
      "                                                                                                                                        ",
      "                                                                                 s                                              p       ",
      "          p            s      ss          sss                 p         pp       p                   ppp                        p      @",
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    ],
  ];
  
  const levelConf = {
    width: 64,
    height: 64,
    b: () => [sprite("lvl1_platform"), solid(), area(), "block"],
    p: () => [sprite("lvl1_platform"), solid(), area(), "platform"],
    s: () => [sprite("lvl1_spike"), area(), "spike"],
    r: () => [sprite("lvl1_spike", {flipY: true}), area(), "spike"],
    "@": () => [sprite("portal", {
      height: height(),
      width: 50
    }),solid(), area({ scale: 0.5 }), origin("center"), "portal"],
  };
  