
const LEVELS = [
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
      "                      s      ss          sss                 lp         pp       p                   ppp                        p      @",
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
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
    "@": () => [sprite("portal"), area({ scale: 0.5 }), "portal"],
  };
  