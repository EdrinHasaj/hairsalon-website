// netlify/functions/google-reviews.js
// Uses Places API (New) v1 — no node-fetch needed; Node 18+ has native fetch.

exports.handler = async (event) => {
  try {
    const { placeId, debug } = event.queryStringParameters || {};
    if (!placeId) return { statusCode: 400, body: "Missing placeId" };

    const KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!KEY) return { statusCode: 500, body: "Server missing GOOGLE_MAPS_API_KEY" };

    // v1 endpoint + required field mask
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
    const headers = {
      "X-Goog-Api-Key": KEY,
      "X-Goog-FieldMask": "reviews,googleMapsUri"
    };

    const resp = await fetch(url, { headers });
    const data = await resp.json();

    if (debug) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          envHasKey: !!KEY,
          googleHttp: resp.status,
          hasError: !!data.error,
          errorMessage: data.error?.message || null
        })
      };
    }

    if (!resp.ok || data.error) {
      const msg = `Places v1 error: ${data.error?.message || resp.statusText}`;
      console.error(msg);
      return { statusCode: 502, body: msg };
    }

    // Flatten the v1 review body to a string
    const reviews = (data.reviews || []).map(r => ({
      author_name: r.authorAttribution?.displayName || "Google user",
      profile_photo_url: r.authorAttribution?.photoUri || "",
      rating: r.rating,
      text: (typeof r.text === "string" ? r.text : (r.text?.text || "")),
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=900" },
      body: JSON.stringify({ reviews, url: data.googleMapsUri || null })
    };
  } catch (e) {
    console.error("Function crash:", e);
    return { statusCode: 500, body: "Failed fetching reviews" };
  }
};
