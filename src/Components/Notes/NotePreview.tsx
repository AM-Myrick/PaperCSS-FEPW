import React, { useState, useRef, RefObject } from "react";
import { NotePreviewProps, ShowMoreButtonProps } from "../../Models/Props";
import ReactMarkdown from "react-markdown";
import "../../Styles/NotePreview.scss";

const NotePreview: React.FC<NotePreviewProps> = ({
  note: { title, content },
  closeMenu,
  updateNote,
  previewHandler
}) => {
  const sideBarRef: RefObject<HTMLDivElement> = useRef(null);
  const [buttonText, setButtonText] = useState<string>("Show More")
  const [buttonClasses, setButtonClasses] = useState<string>("read-more")
  console.log(sideBarRef)
  
    const buttonClickHandler = () => {
      if (sideBarRef?.current) {
      if (sideBarRef.current.classList.contains("show-overflow")) {
        sideBarRef.current.className = "sidebar-box hide-overflow"
        setButtonText("Show More")
        setButtonClasses("read-more")
      } else {
        sideBarRef.current.className = "sidebar-box show-overflow"
        setButtonText("Show Less")
        setButtonClasses("read-less")
      }
    }
    }

  

  return (
    <section className="new-note" onClick={closeMenu}>
      <h2>Note Preview:</h2>
      <form onSubmit={updateNote}>
        <ReactMarkdown source={title} />
        <div className="sidebar-box hide-overflow" ref={sideBarRef}>
          <ReactMarkdown source={content} />
         { sideBarRef?.current && sideBarRef.current.clientHeight > 500 ? <ShowMoreButton clickHandler={buttonClickHandler} value={buttonText} classes={buttonClasses} /> : null }
        </div>
        <button className="default save" type="submit">
          Save Edits
        </button>
        <button className="default save" type="button" onClick={previewHandler}>
          Hide Preview
        </button>
      </form>
    </section>
  );
};

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({ clickHandler, value, classes }) => {
    return (
        <p onClick={clickHandler} className={classes}>{value}</p>
    )
}

export default NotePreview;
