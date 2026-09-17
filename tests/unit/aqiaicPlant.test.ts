import { afterEach, describe, expect, it, vi } from "vitest";
import { AIAICRequestError, aqiaicPlant } from "../../src/services/aqiaicPlant";

afterEach(() => vi.restoreAllMocks());

describe("AQIAIC Plant client", () => {
  it("requests the verified status endpoint", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ configured: true, mode: "inprocess" }), { status: 200 }),
    );

    await expect(aqiaicPlant.getStatus()).resolves.toMatchObject({ configured: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/aqiaic/plant/status",
      expect.objectContaining({ headers: expect.any(Object), signal: expect.any(AbortSignal) }),
    );
  });

  it("sends multipart image analysis and preserves backend errors", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ detail: "invalid image" }), { status: 400 }),
    );
    const image = new File(["not-an-image"], "leaf.jpg", { type: "image/jpeg" });

    await expect(aqiaicPlant.analyze(image, "tomato", "Maharashtra"))
      .rejects.toMatchObject({ name: "AIAICRequestError", status: 400, message: "invalid image" });
    const request = fetchMock.mock.calls[0]?.[1];
    expect(request?.method).toBe("POST");
    expect(request?.body).toBeInstanceOf(FormData);
    expect((request?.body as FormData).get("image")).toBe(image);
    expect((request?.body as FormData).get("crop")).toBe("tomato");
    expect((request?.body as FormData).get("region")).toBe("Maharashtra");
  });

  it("turns network failures into an honest unavailable error", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));

    await expect(aqiaicPlant.getStatus()).rejects.toEqual(
      expect.objectContaining({
        name: "AIAICRequestError",
        message: expect.stringContaining("currently unavailable"),
      } satisfies Partial<AIAICRequestError>),
    );
  });
});