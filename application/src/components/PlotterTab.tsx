import React, { useState } from "react";

import "./PlotterTab.scss";

import type { formSubmitter } from "../@types/submitter";
import type { options } from "../@types/options";


type PlotterTabProps = {
  submitter: formSubmitter;
  setPlot: React.Dispatch<React.SetStateAction<string>>;
};

const PlotterTab: React.FC<PlotterTabProps> = ({ submitter, setPlot }) => {
  const [dataFileName, setDataFileName] = useState<File>();
  const [options, setOptions] = useState<options>({title: ""});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;
    setDataFileName(fileList[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dataFileName) {
      const formData = new FormData();
      formData.append("file", dataFileName, dataFileName.name);
      formData.append("options", JSON.stringify(options));
      const data = await submitter(formData);
      const img = Buffer.from(data).toString("base64");
      setPlot(img);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type={"file"} accept={".csv"} onChange={handleChange} />
        <button type="submit">Submit plotting request</button>
      </form>
    </div>
  );
};

export default PlotterTab;
