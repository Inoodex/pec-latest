const BASE = "https://apps.peceduglobal.com/api/public";

async function main() {
  console.log("\n=== 1. GET Settings ===\n");
  const settings = await fetch(`${BASE}/chat/settings`).then(r => r.json());
  console.log(JSON.stringify(settings, null, 2));

  console.log("\n=== 2. POST Init (email: test@student.com) ===\n");
  const init = await fetch(`${BASE}/chat/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@student.com" }),
  }).then(r => r.json());
  console.log(JSON.stringify(init, null, 2));

  const { conversation_id, guest_token } = init?.data || {};
  if (!conversation_id) { console.log("Init failed"); return; }

  console.log("\n=== 3. POST Send Message ===\n");
  const send = await fetch(`${BASE}/chat/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      conversation_id,
      message: "Hello, I need help with study abroad",
      sender_id: guest_token,
      sender_type: "Guest",
    }),
  }).then(r => r.json());
  console.log(JSON.stringify(send, null, 2));

  console.log("\n=== 4. GET History ===\n");
  const history = await fetch(`${BASE}/chat/history?conversation_id=${conversation_id}`).then(r => r.json());
  console.log(JSON.stringify(history, null, 2));

  console.log("\nDone. conversation_id:", conversation_id);
  console.log("guest_token:", guest_token);
}

main().catch(console.error);
