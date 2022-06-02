import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import MuiDialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import VideoThumbnail from "./thumbnails/Video";
import ImageThumbnail from "./thumbnails/Image";
import PDFThumbnail from "./thumbnails/PDF";

import VideoPreview from "./previews/Video";
import ImagePreview from "./previews/Image";
import PDFPreview from "./previews/PDF";

import { useWidth } from "./useWidth";

const CurrentItemContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const FileList = styled.div<{ align: "center" | "flex-start" | "flex-end" }>`
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: ${(props: any) => props.align};
    flex-wrap: wrap;
`;

const NoItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    color: white;
`;

const DialogTitle = (props: any) => {
    const { children, onClose, onDelete, allowsDelete, ...other } = props;

    return (
        <MuiDialogTitle sx={{ margin: 0, padding: theme => theme.spacing(2) }} {...other}>
            {allowsDelete && (
                <IconButton
                    aria-label="close"
                    sx={{ position: "absolute", right: theme => theme.spacing(6), top: theme => theme.spacing(1), color: theme => theme.palette.grey[500] }}
                    onClick={onDelete}
                    size="large"
                >
                    <DeleteIcon />
                </IconButton>
            )}
            <IconButton
                aria-label="close"
                sx={{ position: "absolute", right: theme => theme.spacing(1), top: theme => theme.spacing(1), color: theme => theme.palette.grey[500] }}
                onClick={onClose}
                size="large"
            >
                <CloseIcon />
            </IconButton>
        </MuiDialogTitle>
    );
};

export type ThumbnailType = {
    className?: string;
    item: string;
    onClick: () => void;
    height: number;
    embedded: boolean;
    selected: boolean;
    width: number;
    color: "white" | "black";
};

const Thumbnail = ({ className, item, onClick, height }: ThumbnailType) => {
    const extension = item.split(".").pop() || "jpg";
    const alt = item.split("/").pop() || "file";

    switch (extension.toLowerCase()) {
        case "mp4":
        case "mov":
            return <VideoThumbnail alt={alt} onClick={onClick} className={className} height={height} />;
        case "pdf":
            return <PDFThumbnail alt={alt} onClick={onClick} className={className} height={height} />;
        default:
            return <ImageThumbnail item={item} alt={alt} onClick={onClick} className={className} />;
    }
};

const StyledThumbnail = styled(Thumbnail)`
    color: ${(props: any) => props.color};
    width: ${(props: any) => props.width}px;
    height: ${(props: any) => props.height}px;
    opacity: ${(props: any) => (props.selected || props.embedded ? 1 : 0.4)};
    border-radius: 4px;
    object-fit: cover;
`;

export type FileRowType = {
    /**
     * Array of images
     */
    items: string[];
    /**
     * Currently selected index
     */
    selectedItem: number;
    /**
     * On click function
     */
    onClick: (index: number) => void;
    /**
     * Height of thumbnail
     */
    height: number;
    /**
     * Width of thumbnail
     */
    width: number;
    /**
     * Whether the component is embedded in the carousel
     */
    embedded: boolean;
    /**
     * Color of thumbnails
     */
    color: "white" | "black";
    /**
     * Aligment of thumnails in grid
     */
    align: "center" | "flex-start" | "flex-end";
};

/** A component to render a row of files */
export function FileRow({ items, selectedItem, onClick, height, width, color, align, embedded }: FileRowType) {
    return (
        <FileList align={align}>
            {items.map((item: string, index: number) => (
                <StyledThumbnail embedded={embedded} key={index} selected={selectedItem === index} item={item} width={width} height={height} onClick={() => onClick(index)} color={color} />
            ))}
        </FileList>
    );
}

export type CurrentItemType = {
    items: string[];
    index: number;
    width: number;
    height: number;
};

const CurrentItem = ({ items, index, width, height }: CurrentItemType) => {
    const file = items[index];
    const extension = file.split(".").pop() || "jpg";

    switch (extension.toLowerCase()) {
        case "mp4":
        case "mov":
            return <VideoPreview video={file} width={width} height={height} />;
        case "pdf":
            return <PDFPreview file={file} width={width} height={height} />;
        default:
            return <ImagePreview image={file} width={width} height={height} />;
    }
};

export type CarouselType = {
    /**
     * Whether the carousel / dialog is open
     */
    open: boolean;
    /**
     * Array of images
     */
    items: string[];
    /**
     * On close function
     */
    onClose: () => void;
    /**
     * On delete function
     */
    onDelete?: (index: number) => void;
    /**
     * Whether to show the delete button
     */
    allowsDelete?: boolean;
    /**
     * Currently selected index
     */
    index?: number;
};

const dimensions = {
    xs: { width: 300, height: 200 },
    sm: { width: 600, height: 300 },
    md: { width: 800, height: 400 },
    lg: { width: 1000, height: 500 },
    xl: { width: 1200, height: 600 }
};

/** Carousel component for managing files */
function Carousel({ open, items, onClose, onDelete, allowsDelete = false, index = 0 }: CarouselType) {
    const [selectedItem, setSelectedItem] = useState(0);

    const handleChangeImage = (index: number) => {
        setSelectedItem(index);
    };

    useEffect(() => {
        if (items[index]) {
            setSelectedItem(index);
        } else {
            setSelectedItem(0);
        }
    }, [index]);

    const deleteItem = () => {
        if (onDelete) {
            onDelete(selectedItem);
        }
    };

    const pageWidth = useWidth();

    const { width, height } = dimensions[pageWidth];

    return (
        <Dialog
            open={open}
            PaperProps={{
                style: {
                    backgroundColor: "#000000d1",
                    boxShadow: "none"
                }
            }}
            fullScreen={true}
            onClose={onClose}
        >
            <DialogTitle id="customized-dialog-title" onClose={onClose} onDelete={deleteItem} allowsDelete={allowsDelete} />
            <DialogContent>
                {items && items.length > 0 ? (
                    <>
                        <CurrentItemContainer>
                            <CurrentItem items={items} index={selectedItem} width={width} height={height} />
                        </CurrentItemContainer>
                        <FileRow selectedItem={selectedItem} align="center" items={items} width={100} height={100} onClick={handleChangeImage} color="white" embedded={false} />
                    </>
                ) : (
                    <NoItems>no items</NoItems>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default Carousel;
