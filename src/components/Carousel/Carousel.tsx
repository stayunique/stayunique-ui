import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles } from "@material-ui/core/styles";

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
    overflow-x: auto;
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

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    deleteButton: {
        position: "absolute",
        right: theme.spacing(6),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
}));

const DialogTitle = (props: any) => {
    const classes = useStyles();

    const { children, onClose, onDelete, allowsDelete, ...other } = props;

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {allowsDelete && (
                <IconButton aria-label="close" className={classes.deleteButton} onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            )}
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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
`;

export type FileRowType = {
    items: string[];
    selectedItem: number;
    onClick: (index: number) => void;
    height: number;
    width: number;
    embedded: boolean;
    color: "white" | "black";
    align: "center" | "flex-start" | "flex-end";
};

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
            return <VideoPreview video={file} width={width} height={height} />;
        case "pdf":
            return <PDFPreview file={file} width={width} height={height} />;
        default:
            return <ImagePreview image={file} width={width} height={height} />;
    }
};

export type CarouselType = {
    open: boolean;
    items: string[];
    onClose: () => void;
    onDelete?: (index: number) => void;
    allowsDelete?: boolean;
    index?: number;
};

const dimensions = {
    xs: { width: 300, height: 200 },
    sm: { width: 600, height: 300 },
    md: { width: 800, height: 400 },
    lg: { width: 1000, height: 500 },
    xl: { width: 1200, height: 600 }
};

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
