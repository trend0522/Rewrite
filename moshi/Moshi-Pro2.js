const NOW = new Date().toISOString();

const entitlement = {
  id: "crack-ent",
  productKey: "pro_lifetime",
  status: "ACTIVE",
  type: "lifetime",
  expiresAt: null,
  isActive: true,
  verifiedAt: NOW
};

const license = {
  id: "crack-lifetime",
  licenseKey: "MOSHI-PRO0-LIFE-TIME",
  status: "ACTIVE",
  productKey: "pro_lifetime",
  expiresAt: null,
  startsAt: NOW,
  autoRenew: false,
  activationId: "crack-act",
  verifiedAt: NOW,
  entitlement: entitlement
};

const BODIES = {
  me: {
    licensePushFanoutEnabled: true,
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
