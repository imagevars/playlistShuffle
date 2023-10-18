import { describe, expect, it } from "@jest/globals";
import validateId from "./validateId";

describe("Validate playlist ID", () => {
  it("It should be null", () => {
    const id = "PL132456";
    expect(validateId(id)).toBe(null);
  });

  it("It should return a string", () => {
    expect(
      typeof validateId(
        "https://www.youtube.com/playlist?list=PLi06ybkpczJDt0Ydo3Umjtv97bDOcCtAZ",
      ),
    ).toBe("string");
  });

  it("It should return an object with a name and an array of Id's", () => {
    const mixIds =
      "https://www.youtube.com/playlist?list=PLH9twT5faHZX6hcW5fl-_WtsV2lMWbtjX, https://www.youtube.com/playlist?list=PL_dT1kMRpJEQyewQehX8LWYxve3iktijD, https://www.youtube.com/playlist?list=PLi06ybkpczJBvFfOhfqDyKMl1Lp2tDkTb, name:new playlist MIX with URL";
    expect(validateId(mixIds)).toMatchObject({
      name: "new playlist MIX with URL",
      playlists: [
        "PLH9twT5faHZX6hcW5fl-_WtsV2lMWbtjX",
        "PL_dT1kMRpJEQyewQehX8LWYxve3iktijD",
        "PLi06ybkpczJBvFfOhfqDyKMl1Lp2tDkTb",
      ],
    });
  });

  it("It should return null because the name is misspelled", () => {
    const mixIds =
      "https://www.youtube.com/playlist?list=PLH9twT5faHZX6hcW5fl-_WtsV2lMWbtjX, https://www.youtube.com/playlist?list=PL_dT1kMRpJEQyewQehX8LWYxve3iktijD, https://www.youtube.com/playlist?list=PLi06ybkpczJBvFfOhfqDyKMl1Lp2tDkTb, ame:new playlist MIX with URL";
    expect(validateId(mixIds)).toBe(null);
  });
});
