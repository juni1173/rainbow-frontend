import { Device } from "@twilio/voice-sdk";

let device: Device | null = null;

export async function initTwilioDevice(leadId: string): Promise<Device> {
  if (device) return device;

  const idToken = sessionStorage.getItem("id_token");

  if (!idToken) {
    throw new Error("No ID token found in sessionStorage.");
  }

  const res = await fetch(
    `https://ajzjuk1jch.execute-api.us-east-2.amazonaws.com/dev/calls/outbound/user/twilio_auth?lead_id=${leadId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch token: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  console.log("Twilio token API response:", data);
  const token = data.token;

  if (!token) {
    throw new Error("Twilio token not found in response.");
  }
  device = new Device(token, {
    codecPreferences: ["opus", "pcmu"],
    fakeLocalDTMF: true,
    enableRingingState: true,
    debug: true,
  } as any); // 👈 Cast to any to avoid TS errors

  console.log("token------", device);

  device.on("ready", () => console.log("✅ Twilio Device Ready"));
  device.on("error", (e) => console.error("❌ Twilio Error:", e));
  // device.on("connect", function (conn) {
  //   console.log("Successfully established call ! ");
  // });
  // device.on("disconnect", function (conn) {
  //   console.log("Successfully ended call ! ");
  // });
  device.on("connect", function (conn) {
    console.log("✅ Successfully connected.");

    conn.on("disconnect", () => {
      console.log("🔚 Connection ended");
    });

    conn.on("cancel", () => {
      console.log("❌ Call was canceled by the callee");
      window.dispatchEvent(new Event("twilio-call-rejected"));
      conn.disconnect();
    });

    conn.on("reject", () => {
      console.log("🚫 Call was rejected");
      window.dispatchEvent(new Event("twilio-call-rejected"));
      conn.disconnect();
    });

    conn.on("error", (err: any) => {
      console.error("⚠️ Connection error:", err);
    });
  });
  device.on("cancel", () => {
    console.log("❌ GLOBAL: Call was canceled by callee");
  });

  device.on("reject", () => {
    console.log("🚫 Global: Call rejected");
    window.dispatchEvent(new Event("twilio-call-rejected"));
  });

  device.on("disconnect", () => {
    console.log("📴 Global: Call disconnected");
    window.dispatchEvent(new Event("twilio-call-ended"));
    window.dispatchEvent(new Event("twilio-call-rejected"));
  });

  device.on("error", (err) => {
    console.error("❗ Twilio Device Error:", err);
    window.dispatchEvent(new Event("twilio-call-error"));
  });
  return device;
}
