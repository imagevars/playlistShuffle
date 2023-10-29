export default function validateId(str) {
  if (typeof str !== "string") return null;
  const arrayOfIds = str.split(",");
  const PLMixData = {
    name: "",
    playlists: [],
  };
  const basicRegex = /^(?=.*.{13,})(?=.*(?:PL|OLAK|RD)).*/;
  const PLRegex = /(PL|OLAK|RD)[\w-]+(?=&|$)/;
  const minLength = 13;

  if (arrayOfIds[0] === "play my pl" || arrayOfIds[0] === "Play my pl") {
    return "PLi06ybkpczJDt0Ydo3Umjtv97bDOcCtAZ";
  }
  if (arrayOfIds.length === 1) {
    try {
      const [id] = arrayOfIds[0].replace(/\s/g, "").match(basicRegex);
      if (id.match(PLRegex)) {
        const [PLId] = id.match(PLRegex);
        if (PLId.length >= minLength) {
          return PLId;
        }
        return null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
  if (!arrayOfIds[arrayOfIds.length - 1].includes("name:")) {
    return null;
  }
  if (arrayOfIds.length > 21) {
    // eslint-disable-next-line
    console.log("Only 20 playlist ids allowed");
    return null;
  }
  const last = arrayOfIds.pop();
  const [, plName] = last.split("name:");
  PLMixData.name = plName;
  for (let i = 0; i < arrayOfIds.length; i += 1) {
    if (
      (!arrayOfIds[i].match(basicRegex) || arrayOfIds[i].length < minLength) &&
      !arrayOfIds[i].includes("name:")
    ) {
      return null;
    }

    for (let j = i + 1; j < arrayOfIds.length; j += 1) {
      if (arrayOfIds[i] === arrayOfIds[j]) {
        return null;
      }
    }
    const [id] = arrayOfIds[i].replace(/\s/g, "").match(PLRegex);
    if (id.length < minLength) {
      return null;
    }
    PLMixData.playlists.push(id);
  }
  if (PLMixData.playlists.length === 1) {
    return PLMixData.playlists[0];
  }
  return PLMixData;
}
