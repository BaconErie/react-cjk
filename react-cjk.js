import { useEffect, useState } from 'react';
import styles from './CharacterSVG.module.css';

export function CharacterSVG({character, source, strokesDisplayed, onStrokeComplete, ...otherProps}) {
  const [ strokeData, setStrokeData ] = useState([]);
  const [ displayedSVG, setDisplayedSVG ] = useState([]);

  async function onCharacterChange() {
    let urlToUse = '';

    switch (source) {
      case 'zh-hans':
        urlToUse = 'https://raw.githubusercontent.com/skishore/makemeahanzi/master/graphics.txt';
        break;
      
      case 'zh-hant':
        urlToUse = 'https://raw.githubusercontent.com/parsimonhi/animCJK/master/graphicsZhHant.txt';
        break;
      
      case 'jp':
        urlToUse = 'https://raw.githubusercontent.com/parsimonhi/animCJK/master/graphicsJa.txt';
        break;

      case 'ko':
        urlToUse = 'https://raw.githubusercontent.com/parsimonhi/animCJK/master/graphicsKo.txt';
        break;       
      
      default:
        urlToUse = source;
        break;
    }

    const characterData = await (await fetch(urlToUse, {cache: 'force-cache'})).text();
    const characterDataRows = characterData.split('\n');

    let graphicsJsonArray = [];
    
    for (const rowString of characterDataRows) {
      if (rowString)
        graphicsJsonArray.push(JSON.parse(rowString))
    }

    let newStrokeData;
    for (const json of graphicsJsonArray) {
      if (json.character == character) {
        newStrokeData = json.strokes;
        break;
      }
    }

    setStrokeData(newStrokeData);

    await onStrokesDisplayedChange(newStrokeData);
  }

  useEffect(() => {
    onCharacterChange();
  }, [character]);

  async function onStrokesDisplayedChange(strokeData) {
    let newDisplayedSvg = [];

    for (const [key, value] of Object.entries(strokesDisplayed)) {
      newDisplayedSvg.push(strokeData[key]);
    }
    setDisplayedSVG(newDisplayedSvg);
  }

  useEffect(() => {
    onStrokesDisplayedChange(strokeData);
  }, [strokesDisplayed]);
  
  let pathComponents = [];
  for (let entry of Object.entries(strokesDisplayed)) {
    const strokeId = entry[0];
    const strokeSettings = entry[1];
    const strokeSvgData = displayedSVG[strokeId];

    pathComponents.push(
      <path key={strokeId} d={strokeSvgData} style={strokeSettings.css}/>
    )
  }

  return (<svg viewBox={'0 0 1024 1024'} {...otherProps}>
    <g transform={'scale(1, -1) translate(0, -900)'}>
      {pathComponents}
    </g>
  </svg>)
}