import { Option } from "../../types";
import styles from "./productOptions.module.css";
import React, { type FC, useState } from "react";
import { ColorDisplay } from "./ColorDisplay";

export const ProductOptions: FC<{ options: Option[]; available: boolean }> = ({
  options,
  available,
}) => {
  const [optionsDisplayed, setOptionsDisplayed] = useState<Option>(options[0]);
  const [colorSelected, setColorSelected] = useState(
    Array.isArray(optionsDisplayed.color)
      ? optionsDisplayed.color[0]
      : optionsDisplayed.color
  );

  return (
    <div className={styles.optionsContainer}>
      <div className={styles.colorDisplayContainer}>
        <input
          className={`${styles.input} `}
          name="color"
          hidden
          value={colorSelected}
        />
        {options.map((option, index) => {
          return (
            <React.Fragment key={index}>
              {option &&
                (Array.isArray(option?.color) ? (
                  option.color.map(() => {
                    return (
                      <ColorDisplay
                        option={option}
                        setOptionsDisplayed={setOptionsDisplayed}
                        setColor={setColorSelected}
                        activeColor={colorSelected}
                      />
                    );
                  })
                ) : (
                  <ColorDisplay
                    option={option}
                    setOptionsDisplayed={setOptionsDisplayed}
                    setColor={setColorSelected}
                    activeColor={colorSelected}
                  />
                ))}
            </React.Fragment>
          );
        })}
      </div>
      {optionsDisplayed?.quantity &&
      optionsDisplayed?.quantity !== 0 &&
      available ? (
        <>
          <input hidden name="quantity" value={optionsDisplayed.quantity} />
          <div>Quantity: {optionsDisplayed.quantity}</div>
        </>
      ) : (
        <>
          <input hidden name="quantity" value={optionsDisplayed.quantity} />
          <div>Sold out</div>
        </>
      )}
      {optionsDisplayed?.power && (
        <div>
          Power:
          {
            <select name="power" className={styles.select} required>
              {optionsDisplayed?.power?.map((powerOption) => {
                return (
                  <option key={powerOption} value={powerOption}>
                    {powerOption}
                  </option>
                );
              })}
            </select>
          }
        </div>
      )}
      {optionsDisplayed?.storage && (
        <div>
          storage:
          {
            <select name="storage" className={styles.select} required>
              {optionsDisplayed?.storage?.map((storageOption) => {
                return (
                  <option key={storageOption} value={storageOption}>
                    {storageOption}
                  </option>
                );
              })}
            </select>
          }
        </div>
      )}
    </div>
  );
};
