import React, { useState, useRef, useEffect } from "react";
import Carousel, { FileRow } from "../Carousel/Carousel";
import Uppy from "@uppy/core";
import { DragDrop as UppyDragDrop, StatusBar } from "@uppy/react";
import AwsS3 from "@uppy/aws-s3";
import styled from "styled-components";
import ImageCompressor from "uppy-plugin-image-compressor";
import "@uppy/core/dist/style.css";
import "@uppy/status-bar/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const DragDrop = styled(UppyDragDrop)`
    margin-top: 15px;
    margin-bottom: 15px;
`;

export type UploaderType = {
    /**
     * Array of current files
     */
    values: string[];
    /**
     * On change function
     */
    onChange: (url: string) => void;
    /**
     * On delete function
     */
    onDelete: (index: number) => void;
    /**
     * A function that returns a pre signed URL for uppy to upload to
     */
    createSignedURL: (file: any) => Promise<{ url: string; method: string }>;
};

/** The upload component which uploads file to S3 and displays them using the FileRow component */
function Uploader({ values, onChange, onDelete, createSignedURL }: UploaderType) {
    const [index, setIndex] = useState(0);
    const [carouselOpen, setCarouselOpen] = useState(false);

    const openLightbox = (index: number) => {
        setIndex(index);
        setCarouselOpen(true);
    };

    const closeLightbox = () => {
        setIndex(0);
        setCarouselOpen(false);
    };

    const deleteFile = (index: number) => {
        setIndex(0);
        onDelete(index);
    };

    const change = async (url: string) => {
        onChange(url);
    };

    const uppy = useRef(
        new Uppy({ autoProceed: true })
            .use(ImageCompressor, {
                maxWidth: 1000,
                quality: 0.6
            })
            .use(AwsS3, {
                async getUploadParameters(file: any) {
                    const result = await createSignedURL(file);

                    return {
                        url: result.url,
                        method: result.method
                    };
                }
            })
            .on("upload-success", (file: any, resp: any) => {
                change(resp.uploadURL);
            })
    );

    useEffect(() => {
        return () => uppy.current.close();
    }, []);

    return (
        <>
            <FileRow items={values} selectedItem={index} width={150} height={150} onClick={openLightbox} color="black" align="flex-start" embedded={true} />
            <DragDrop uppy={uppy.current} height={150} />

            <StatusBar uppy={uppy.current} hideUploadButton hideAfterFinish={true} showProgressDetails />
            <Carousel items={values} open={carouselOpen} allowsDelete={true} onDelete={(index: any) => deleteFile(index)} onClose={closeLightbox} index={index} />
        </>
    );
}

export default Uploader;
