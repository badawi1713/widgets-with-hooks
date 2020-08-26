import React from "react";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [activeAccordion, setActiveAccordion] = React.useState(false);
  const accordionActiveHandler = (index) => {
    setActiveIndex(index);
    setActiveAccordion(!activeAccordion);
  };

  const accordionItems = items.map((item, index) => {
    const active = activeAccordion
      ? index === activeIndex
        ? "active"
        : ""
      : "";
    return (
      <React.Fragment key={index}>
        <div
          onClick={() => accordionActiveHandler(index)}
          className={`${active} title`}
        >
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`${active} content`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });
  return <div className="ui styled accordion">{accordionItems}</div>;
};

export default Accordion;
