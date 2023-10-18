import { describe, expect, it } from "@jest/globals";
import fetchPlaylistData from "./fetchPlaylistData";
import validateId from "./validateId";

describe("Fetch playlist data", () => {
  it("it has to return an object", () => {
    const id =
      "https://www.youtube.com/playlist?list=PLi06ybkpczJBvFfOhfqDyKMl1Lp2tDkTb";
    const validId = validateId(id);
    return fetchPlaylistData(validId).then((data) => {
      expect(typeof data).toBe("object");
    });
  });

  it("it has to return null", () => {
    const id =
      "https://www.youtube.com/playlist?list=PLi06ybkpczJBvFfOhfqDyKMl1Lp2tb";
    const validId = validateId(id);
    return fetchPlaylistData(validId).then((data) => {
      expect(data).toBe(null);
    });
  });
});
