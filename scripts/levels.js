
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
      "                                                                                s                                              p        ",
      "                      s      ss          sss                 p         pp       p                   ppp                        p       @",
      "pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp",
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
      "pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp",
    ],
  ];
  
  const levelConf = {
    width: 64,
    height: 64,
    p: () => [sprite("platform"), solid(), area(), "platform"],
    s: () => [sprite("spike"), area(), "spike"],
    "@": () => [sprite("portal"), area({ scale: 0.5 }), "portal"],
  };
  