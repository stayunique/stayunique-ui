import React from "react";

export type PDFType = {
    file: string;
    width: number;
    height: number;
};

const PDF = ({ file, width, height }: PDFType) => {
    return (
        <object style={{ width: width, height: height }} data={file} type="application/pdf">
            <embed src={file} type="application/pdf" />
        </object>
    );
};

export default PDF;
