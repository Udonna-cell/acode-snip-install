#!/usr/bin/env node

import { endPoint, removeEndPoint } from "../index.js"

(process.argv.slice(2).toString() == "uninstall")? removeEndPoint() : endPoint();