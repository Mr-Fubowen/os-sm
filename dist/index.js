#!/usr/bin/env node
import { Command as p } from "commander";
import n from "systeminformation";
import s from "i18n";
import { fileURLToPath as g } from "url";
import { dirname as k, join as w } from "path";
const b = g(import.meta.url), h = k(b), l = new p();
s.configure({
  locales: ["en", "zh"],
  directory: w(h, "locales"),
  defaultLocale: "en",
  objectNotation: !0,
  autoReload: !1,
  updateFiles: !1
});
function u(o, ...t) {
  return o.replace(/\{([0-9]+)\}/g, (a, c) => t.at(parseInt(c)) ?? "");
}
const f = {
  cpu: {
    func: n.cpu,
    options: {
      speed: {
        func: n.cpuCurrentSpeed
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
      containerProcesses: {
        func: n.dockerContainerProcesses
      },
      containerStats: {
        func: n.dockerContainerStats
      },
      containers: {
        func: n.dockerContainers
      },
      images: {
        func: n.dockerImages
      },
      info: {
        func: n.dockerInfo
      },
      volumes: {
        func: n.dockerVolumes
      }
    }
  },
  virtualbox: {
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
function y() {
  const o = new p();
  o.name("sm").description(s.__("description")).version("1.0.0");
  for (const t in f) {
    const a = [], c = f[t], i = o.command(t).description(s.__(t));
    if (a.push(c.func), c.children)
      for (const e in c.children) {
        const r = c.children[e], m = u("-{0} --{1} <string>", e.at(0), e), d = u("{0}.options.{1}", t, e);
        i.option(m, s.__(d)), a.push(r.func);
      }
    i.action(async () => {
      const e = {};
      for (const r of a)
        e[t] = await r();
      return console.log(e), e;
    });
  }
  o.allowUnknownOption().allowExcessArguments(), o.parse(process.argv), process.argv.slice(2).length > 0 && o.outputHelp();
}
l.name("sm").option("-l --lang <language>", "Set the language for the application", "en").version("1.0.0").allowUnknownOption().allowExcessArguments().action((o) => {
  s.setLocale(o.lang), y();
});
l.parse(process.argv);
export {
  u as replace
};
