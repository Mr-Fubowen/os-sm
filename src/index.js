#!/usr/bin/env node

import { Command } from 'commander'
import si from 'systeminformation'
import i18n from 'i18n'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const program = new Command()

i18n.configure({
    locales: ['en', 'zh'],
    directory: join(__dirname, 'locales'),
    defaultLocale: 'en',
    objectNotation: true,
    autoReload: false,
    updateFiles: false
})
export function replace(msg, ...args) {
    return msg.replace(/\{([0-9]+)\}/g, (match, idx) => args.at(parseInt(idx)) ?? '')
}
const commands = {
    cpu: {
        func: si.cpu,
        options: {
            speed: {
                func: () => {
                    return si.cpuCurrentSpeed()
                }
            },
            temperature: {
                func: si.cpuTemperature
            },
            cache: {
                func: si.cpuCache
            },
            flags: {
                func: si.cpuFlags
            }
        }
    },
    mem: {
        func: si.mem,
        options: {
            layout: {
                func: si.memLayout
            }
        }
    },
    disk: {
        func: si.disksIO,
        options: {
            layout: {
                func: si.diskLayout
            }
        }
    },
    os: {
        func: si.osInfo
    },
    network: {
        func: si.networkInterfaces,
        options: {
            connections: {
                func: si.networkConnections
            },
            gatewayDefault: {
                func: si.networkGatewayDefault
            },
            interfaceDefault: {
                func: si.networkInterfaceDefault
            },
            stats: {
                func: si.networkStats
            }
        }
    },
    wifi: {
        func: si.wifiInterfaces,
        options: {
            connections: {
                func: si.wifiConnections
            },
            networks: {
                func: si.wifiNetworks
            }
        }
    },
    battery: {
        func: si.battery
    },
    users: {
        func: si.users
    },
    processes: {
        func: si.processes,
        options: {
            load: {
                func: si.processLoad
            }
        }
    },
    graphics: {
        func: si.graphics
    },
    audio: {
        func: si.audio
    },
    printer: {
        func: si.printer
    },
    usb: {
        func: si.usb
    },
    bluetooth: {
        func: si.bluetoothDevices
    },
    docker: {
        func: si.dockerAll,
        options: {
            processes: {
                func: si.dockerContainerProcesses
            },
            stats: {
                func: si.dockerContainerStats
            },
            containers: {
                func: si.dockerContainers
            },
            images: {
                func: si.dockerImages
            },
            xccc: {
                func: si.dockerInfo
            },
            volumes: {
                func: si.dockerVolumes
            }
        }
    },
    virtualbox: {
        func: si.vboxInfo
    },
    fs: {
        func: si.fsStats,
        options: {
            size: {
                func: si.fsSize
            },
            openFiles: {
                func: si.fsOpenFiles
            }
        }
    },
    bios: {
        func: si.bios
    },
    baseboard: {
        func: si.baseboard
    },
    static: {
        func: si.getStaticData
    }
}
function parse() {
    const command = new Command()
    command.name('sm').description(i18n.__('description')).version('1.0.0')
    for (const key in commands) {
        const actions = []
        const options = commands[key]
        const cmd = command.command(key).description(i18n.__(key))
        actions.push(async stats => {
            stats[key] = await options.func()
        })
        if (options.options) {
            for (const subkey in options.options) {
                const value = options.options[subkey]
                const flags = replace('-{0} --{1} <string>', subkey.at(0), subkey)
                const descr = replace('{0}.options.{1}', key, subkey)
                cmd.option(flags, i18n.__(descr))
                actions.push(async stats => {
                    stats[subkey] = await value.func()
                })
            }
        }
        cmd.action(async () => {
            const stats = {}
            const tasks = actions.map(it => it(stats))
            await Promise.all(tasks)
            console.log(stats)
            return stats
        })
    }
    command.allowUnknownOption().allowExcessArguments()
    command.parse(process.argv)
    if (process.argv.slice(2).length == 0) {
        command.outputHelp()
    }
}
program
    .name('sm')
    .option('-l --lang <string>', 'Set the language for the application', 'en')
    .version('1.0.0')
    .allowUnknownOption()
    .allowExcessArguments()
    .action(opts => {
        i18n.setLocale(opts.lang)
        parse()
    })
program.parse(process.argv)
