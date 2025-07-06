import { DuneClient } from "@duneanalytics/client-sdk";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const slug = request.url.split("/").pop();

  if (!slug) {
    return NextResponse.json(
      { error: "Invalid slug parameter" },
      { status: 400 }
    );
  }

  if (!process.env.DUNE_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const client = new DuneClient(process.env.DUNE_API_KEY);

  try {
    const results = await client.custom.getResults({
      handle: "eulerswap_pulse",
      slug: slug,
    });

    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
