import React, { useRef, useEffect } from "react";
import "../style/imagePage.css";
import { connect } from "react-redux";
import {
  changeImageCord,
  changeImageFieldIndex,
  changeTextCord,
  changeTextFieldIndex,
} from "../../service/Actions/FormAction";

const CanvasImagePage = (props) => {
  let canvas = useRef();
  let ctx = null;
  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;
  let boxes = [];
  let allImages = [];
  let image = null;
  let currentDragType = null;

  useEffect(() => {
    if (props.formDetails.images.length !== 0) {
      props.formDetails.images.map((img) => allImages.push(img));
    }

    boxes = [
      {
        x: props.formDetails.formData[0].x,
        y: props.formDetails.formData[0].y,
      },
      {
        x: props.formDetails.formData[1].x,
        y: props.formDetails.formData[1].y,
      },
      {
        x: props.formDetails.formData[2].x,
        y: props.formDetails.formData[2].y,
      },
    ];

    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    ctx = canvasEle.getContext("2d");

    if (props.formDetails.backgroundImage) {
      draw();
    }
  }, [props.formDetails]);

  //drawing starts here
  const draw = () => {
    ctx.clearRect(
      0,
      0,
      canvas.current.clientWidth,
      canvas.current.clientHeight
    );

    image = new Image();
    image.src = props.formDetails.backgroundImage;
    image.onload = function () {
      ctx && ctx.drawImage(image, 0, 0, 700, 475);
      props.formDetails.formData.map((data, index) => drawTexts(data, index));
      props.formDetails.images.map((item, index) => {
        drawImages(item, index);
      });
    };
  };

  const drawImages = (item, index) => {
    let smallImage = new Image();
    smallImage.src = item.image;
    smallImage.onload = function () {
      ctx &&
        ctx.drawImage(
          smallImage,
          allImages[index].x,
          allImages[index].y,
          100,
          100
        );
    };
  };

  const drawTexts = (data, index) => {
    ctx.beginPath();
    ctx.font = `${data.fontSize}px ${data.fontFamily}`;
    ctx.fillStyle = `rgba(${data.fontColor[0]}, ${data.fontColor[1]}, ${data.fontColor[2]}, ${data.fontColor[3]})`;
    ctx.fillText(data.value, boxes[index].x, boxes[index].y);
    ctx.stroke();
  };
  //drawing ends here

  const hitBox = (x, y) => {
    let isTarget = null;

    for (let i = 0; i < props.formDetails.formData.length; i++) {
      let box = props.formDetails.formData[i];
      ctx.font = `${box.fontSize}px ${box.fontFamily}`; // to get exact width of a text according to font size
      if (
        box.value !== "" &&
        x >= boxes[i].x &&
        x <= boxes[i].x + Math.floor(ctx.measureText(box.value).width) &&
        y >= boxes[i].y - box.fontSize &&
        y <= boxes[i].y
      ) {
        //change text index only if changes
        if (props.formDetails.currentFormFieldIndex !== i) {
          props.changeTextFieldIndex(i);
        }
        dragTarget = box;
        isTarget = true;
        currentDragType = "text";
        break;
      }
    }

    for (let j = 0; j < props.formDetails.images.length; j++) {
      let box = props.formDetails.images[j];
      if (
        x >= allImages[j].x &&
        x <= allImages[j].x + 100 &&
        y >= allImages[j].y &&
        y <= allImages[j].y + 100
      ) {
        //change image index only if changes
        if (props.formDetails.currentImageFieldIndex !== j) {
          props.changeImageFieldIndex(j);
        }
        dragTarget = box;
        isTarget = true;
        currentDragType = "image";
        break;
      }
    }

    return isTarget;
  };

  const handleMouseDown = (e) => {
    startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    isDown = hitBox(startX, startY);
  };

  const handleMouseMove = (e) => {
    if (isDown && currentDragType) {
      const mouseX = parseInt(
        e.nativeEvent.offsetX - canvas.current.clientLeft
      );
      const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
      const dx = mouseX - startX;
      const dy = mouseY - startY;
      startX = mouseX;
      startY = mouseY;

      if (currentDragType === "text") {
        boxes[props.formDetails.currentFormFieldIndex].x += dx;
        boxes[props.formDetails.currentFormFieldIndex].y += dy;
      } else if (currentDragType === "image") {
        allImages[props.formDetails.currentImageFieldIndex].x += dx;
        allImages[props.formDetails.currentImageFieldIndex].y += dy;
      }

      if (dx !== 0 || dy !== 0) {
        draw();
      }
    }
  };

  const handleMouseUp = (e) => {
    isDown = false;

    let textIndex = props.formDetails.currentFormFieldIndex;
    let imageIndex = props.formDetails.currentImageFieldIndex;

    if (dragTarget && currentDragType === "text" && textIndex !== null) {
      props.changeTextCord(textIndex, boxes[textIndex].x, boxes[textIndex].y);
    } else if (
      dragTarget &&
      currentDragType === "image" &&
      imageIndex !== null
    ) {
      props.changeImageCord(
        imageIndex,
        allImages[imageIndex].x,
        allImages[imageIndex].y
      );
    }

    textIndex = null;
    imageIndex = null;
    currentDragType = null;
    dragTarget = null;
  };

  const handleMouseOut = (e) => {
    handleMouseUp(e);
  };

  return (
    <canvas
      className="Image-Container"
      ref={canvas}
      id="canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
    ></canvas>
  );
};

const mapStateToProps = (state) => ({
  BG: state.BGReducer,
  formDetails: state.FormReducer,
});

const mapDispatchToProps = (dispatch) => ({
  changeTextFieldIndex: (index) => dispatch(changeTextFieldIndex(index)),
  changeImageFieldIndex: (index) => dispatch(changeImageFieldIndex(index)),
  changeTextCord: (index, x, y) => dispatch(changeTextCord(index, x, y)),
  changeImageCord: (index, x, y) => dispatch(changeImageCord(index, x, y)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasImagePage);
