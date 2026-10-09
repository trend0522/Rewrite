const NOW = new Date().toISOString();
const FUTURE = "2099-12-31T23:59:59.000Z";

let requestedKey = "MOSHI-1111-2222-3333";
let deviceId = "crack-device";

try {
  if ($request.body) {
    const reqBody = JSON.parse($request.body);
    if (reqBody.licenseKey) requestedKey = reqBody.licenseKey;
    if (reqBody.deviceId) deviceId = reqBody.deviceId;
  }
} catch (e) {}

const entitlement = {
  id: "crack-ent",
  productKey: "pro_lifetime",
  status: "ACTIVE",
  type: "lifetime",
  expiresAt: FUTURE,
  isActive: true,
  verifiedAt: NOW
};

const license = {
  id: "crack-lifetime",
  licenseKey: requestedKey,
  key: requestedKey,
  status: "ACTIVE",
  isActive: true,
  productKey: "pro_lifetime",
  expiresAt: FUTURE,
  startsAt: NOW,
  autoRenew: false,
  activationId: "crack-act",
  verifiedAt: NOW,
  deviceId: deviceId,
  entitlement: entitlement
};

const BODIES = {
  me: {
    licensePushFanoutEnabled: true,
    license: license,
    licenses: [license],
    entitlements: [entitlement]
  },
  activate: {
    status: "ACTIVE",
    success: true,
    license: license,
    entitlement: entitlement,
    licenses: [license],
    entitlements: [entitlement]
  },
  devices: {
    devices: [],
    activeDevices: 0
  },
  entitlements: {
    entitlements: [entitlement]
  }
};

const url = $request.url;
const path = url.replace(/^https?:\/\/[^/]+/, "").split("?")[0];

let data = null;
if (path.includes("/devices")) {
  data = BODIES.devices;
} else if (path.includes("/activate")) {
  data = BODIES.activate;
} else if (path.includes("/entitlements")) {
  data = BODIES.entitlements;
} else if (path.includes("/licenses")) {
  data = BODIES.me;
}

if (!data) {
  $done({});
} else {
  $done({
    response: {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify(data)
    }
  });
}
