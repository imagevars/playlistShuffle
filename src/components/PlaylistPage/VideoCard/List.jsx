import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import VideoCard from "./VideoCard";

function List() {
  return (
    <div className="h-full w-full ">
      <AutoSizer>
        {({ height, width }) => <VideoCard height={height} width={width} />}
      </AutoSizer>
    </div>
  );
}

export default List;
