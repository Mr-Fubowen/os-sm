#!/usr/bin/env node
import { Command as d } from "commander";
import n from "systeminformation";
import c from "i18n";
import { fileURLToPath as k } from "url";
import { dirname as w, join as b } from "path";
const y = k(import.meta.url), h = w(y), g = new d();
c.configure({
  locales: ["en", "zh"],
  directory: b(h, "locales"),
  defaultLocale: "en",
  objectNotation: !0,
  autoReload: !1,
  updateFiles: !1
});
function l(e, ...t) {
  return e.replace(/\{([0-9]+)\}/g, (a, s) => t.at(parseInt(s)) ?? "");
}
const m = {
  cpu: {
    func: n.cpu,
    options: {
      speed: {
        func: () => n.cpuCurrentSpeed()
      },
      temperature: {
        func: n.cpuTemperature
      },
      cache: {
        func: n.cpuCache
      },
      flags: {
        func: n.cpuFlags
      }
    }
  },
  mem: {
    func: n.mem,
    options: {
      layout: {
        func: n.memLayout
      }
    }
  },
  disk: {
    func: n.disksIO,
    options: {
      layout: {
        func: n.diskLayout
      }
    }
  },
  os: {
    func: n.osInfo
  },
  network: {
    func: n.networkInterfaces,
    options: {
      connections: {
        func: n.networkConnections
      },
      gatewayDefault: {
        func: n.networkGatewayDefault
      },
      interfaceDefault: {
        func: n.networkInterfaceDefault
      },
      stats: {
        func: n.networkStats
      }
    }
  },
  wifi: {
    func: n.wifiInterfaces,
    options: {
      connections: {
        func: n.wifiConnections
      },
      networks: {
        func: n.wifiNetworks
      }
    }
  },
  battery: {
    func: n.battery
  },
  users: {
    func: n.users
  },
  processes: {
    func: n.processes,
    options: {
      load: {
        func: n.processLoad
      }
    }
  },
  graphics: {
    func: n.graphics
  },
  audio: {
    func: n.audio
  },
  printer: {
    func: n.printer
  },
  usb: {
    func: n.usb
  },
  bluetooth: {
    func: n.bluetoothDevices
  },
  docker: {
    func: n.dockerAll,
    options: {
      top: {
        func: n.dockerContainerProcesses
      },
      stats: {
        func: n.dockerContainerStats
      },
      ps: {
        func: n.dockerContainers
      },
      images: {
        func: n.dockerImages
      },
      detail: {
        func: n.dockerInfo
      },
      volume: {
        func: n.dockerVolumes
      }
    }
  },
  vbox: {
    func: n.vboxInfo
  },
  fs: {
    func: n.fsStats,
    options: {
      size: {
        func: n.fsSize
      },
      openFiles: {
        func: n.fsOpenFiles
      }
    }
  },
  bios: {
    func: n.bios
  },
  baseboard: {
    func: n.baseboard
  },
  static: {
    func: n.getStaticData
  }
};
function v() {
  const e = new d();
  e.name("sm").description(c.__("description")).version("1.0.0");
  for (const t in m) {
    const a = [], s = m[t], p = e.command(t).description(c.__(t));
    if (a.push(async (o) => {
      o[t] = await s.func();
    }), s.options)
      for (const o in s.options) {
        const u = s.options[o], r = l("-{0} --{1} <string>", o.at(0), o), i = l("{0}.options.{1}", t, o);
        p.option(r, c.__(i)), a.push(async (f) => {
          f[o] = await u.func();
        });
      }
    p.action(async () => {
      const o = {}, u = a.map((i) => i(o));
      await Promise.all(u);
      let r = JSON.stringify(o, (i, f) => f, 4);
      return console.log(r), r;
    });
  }
  e.allowUnknownOption().allowExcessArguments(), e.parse(process.argv), process.argv.slice(2).length == 0 && e.outputHelp();
}
g.name("sm").option("-l --lang <string>", "Set the language for the application", "en").version("1.0.0").allowUnknownOption().allowExcessArguments().action((e) => {
  c.setLocale(e.lang), v();
});
g.parse(process.argv);
export {
  l as replace
};
