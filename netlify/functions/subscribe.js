exports.handler = async function (event) {
  const headers = {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  };

  const referer = event.headers.referer || event.headers.Referrer || "/newsletter.html";

  function redirect(status) {
    const url = new URL(referer, "https://yamansound.eu");
    url.searchParams.set("newsletter", status);
    return {
      statusCode: 303,
      headers: { Location: url.pathname + url.search + url.hash },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return redirect("error");
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID || "3");

  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: "Missing BREVO_API_KEY environment variable.",
    };
  }

  try {
    const params = new URLSearchParams(event.body || "");
    const email = (params.get("email") || "").trim().toLowerCase();
    const source = (params.get("source") || "YAMAN website").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return redirect("invalid");
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
        attributes: {
          SOURCE: source,
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Brevo error", response.status, text);
      return redirect("error");
    }

    return redirect("success");
  } catch (error) {
    console.error(error);
    return redirect("error");
  }
};
