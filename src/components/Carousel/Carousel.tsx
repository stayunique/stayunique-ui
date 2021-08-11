import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import VideoThumbnail from "./thumbnails/Video";
import ImageThumbnail from "./thumbnails/Image";

import VideoPreview from "./previews/Video";
import ImagePreview from "./previews/Image";

const ImageList = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = (props: any) => {
  const classes = useStyles();

  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
};

const Thumbnail = ({ item, selected, width, height, onClick }: any) => {
  const extension = item.split(".").pop();
  const alt = item.split("/").pop();

  switch (extension) {
    case "mp4":
      return (
        <VideoThumbnail
          alt={alt}
          width={width}
          height={height}
          onClick={onClick}
          selected={selected}
        />
      );
    default:
      return (
        <ImageThumbnail
          item={item}
          alt={alt}
          width={width}
          height={height}
          onClick={onClick}
          selected={selected}
        />
      );
  }
};

const CurrentItem = ({ items, index, width, height }: any) => {
  const file = items[index];
  const extension = file.split(".").pop();

  switch (extension) {
    case "mp4":
      return <VideoPreview video={file} width={width} height={height} />;
    default:
      return <ImagePreview image={file} width={width} height={height} />;
  }
};

const CurrentItemContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export type CarouselType = {
  open: boolean;
  items: string[];
  onClose: () => void;
};

function Carousel({ open, items, onClose }: CarouselType) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleChangeImage = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          backgroundColor: "#000000d1",
          boxShadow: "none",
        },
      }}
      fullScreen={true}
      onClose={onClose}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose} />
      <DialogContent>
        <CurrentItemContainer>
          <CurrentItem
            items={items}
            index={selectedImage}
            width={1000}
            height={500}
          />
        </CurrentItemContainer>
        <ImageList>
          {items.map((item: string, index: number) => (
            <Thumbnail
              key={index}
              selected={selectedImage === index}
              item={item}
              width={100}
              height={100}
              onClick={() => handleChangeImage(index)}
            />
          ))}
        </ImageList>
      </DialogContent>
    </Dialog>
  );
}

export default Carousel;
