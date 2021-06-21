import React, { Component } from "react";

class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: false,
    };

    this.dragCounter = 0;
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragIn = this.handleDragIn.bind(this);
    this.handleDragOut = this.handleDragOut.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDragStart(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      event.dataTransfer.clearData();
    }
  }
  handleDrag(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleDragIn(event) {
    event.preventDefault();
    event.stopPropagation();

    this.dragCounter++;

    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  }

  handleDragOut(event) {
    event.preventDefault();
    event.stopPropagation();

    this.dragCounter--;

    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  }

  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({ drag: false });

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      this.props.handleDrop(event.dataTransfer.files);
      this.dragCounter = 0;
    }
  }

  componentDidMount() {
    let el = document.body;
    el.addEventListener("dragstart", this.handleDragStart);
    el.addEventListener("dragenter", this.handleDragIn);
    el.addEventListener("dragleave", this.handleDragOut);
    el.addEventListener("dragover", this.handleDrag);
    el.addEventListener("drop", this.handleDrop);
  }

  componentWillUnmount() {
    let el = document.body;
    el.removeEventListener("dragstart", this.handleDragStart);
    el.removeEventListener("dragenter", this.handleDragIn);
    el.removeEventListener("dragleave", this.handleDragOut);
    el.removeEventListener("dragover", this.handleDrag);
    el.removeEventListener("drop", this.handleDrop);
  }

  render() {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          pointerEvents: "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.state.drag && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "inherit",
              color: "#000",
            }}
          >
            Drop file here
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}
export default DragAndDrop;
